import React, { useState, useEffect } from 'react';
import moment from 'moment'; // Moment.js for date manipulation

const TimeSlotTable = ({ doctorDetails }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('day')); // Starting date of the current week

  const [timeSlots, setTimeSlots] = useState([]);

  // Calculate the 7 days in the current week (starting from the currentWeekStart)
  const getWeekDays = (start) => {
    return Array.from({ length: 7 }, (_, i) => moment(start).add(i, 'days').format('ddd D'));
  };

  const days = getWeekDays(currentWeekStart); // Get current week days

  // Handle next and previous buttons to change the week
  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => moment(prev).add(7, 'days')); // Move 7 days forward
  };

  const handlePreviousWeek = () => {
    if (moment(currentWeekStart).isAfter(moment(), 'day')) {
      setCurrentWeekStart((prev) => moment(prev).subtract(7, 'days')); // Move 7 days back
    }
  };

  // Helper function to convert time string to minutes
  const timeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // Generate time slots dynamically based on the doctor's working hours and break time
  useEffect(() => {
    if (doctorDetails && doctorDetails.doctorDetails && doctorDetails.doctorDetails.workingHours) {
      const { workingHours } = doctorDetails.doctorDetails;
      const { workingTime, checkupTime, breakTime } = workingHours;

      if (workingTime && checkupTime && breakTime) {
        const startTime = timeToMinutes(workingTime.split(" - ")[0]); // Start time
        const endTime = timeToMinutes(workingTime.split(" - ")[1]); // End time
        const checkupEnd = timeToMinutes(checkupTime.split(" - ")[1]); // End of checkup time
        const breakStart = timeToMinutes(breakTime); // Break start time
        const breakEnd = breakStart + 60; // Assuming 1 hour for break

        const slots = [];
        for (let time = startTime; time < endTime; time += 60) {
          let slotStatus = 'No Schedule'; // Default status

          // Handle break time
          if (time >= breakStart && time < breakEnd) {
            slotStatus = 'Lunch Break';
          }
          // Handle checkup availability
          else if (time < checkupEnd) {
            slotStatus = 'Available';
          }

          const slotTime = `${Math.floor(time / 60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")} ${time < 720 ? 'AM' : 'PM'}`;
          slots.push({ time: slotTime, status: slotStatus });
        }

        setTimeSlots(slots);
      }
    }
  }, [doctorDetails]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {/* Previous Week Button */}
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={handlePreviousWeek}
          disabled={moment(currentWeekStart).isSameOrBefore(moment(), 'day')}
        >
          &lt;
        </button>

        {/* Display the current week range */}
        <h1 className="text-xl font-bold">
          {moment(currentWeekStart).format('DD MMMM, YYYY')} - {moment(currentWeekStart).add(6, 'days').format('DD MMMM, YYYY')}
        </h1>

        {/* Next Week Button */}
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={handleNextWeek}>
          &gt;
        </button>
      </div>

      {/* Table to display the time slots */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Time</th>
            {days.map((day) => (
              <th key={day} className="border px-4 py-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.length === 0 ? (
            <tr>
              <td className="border px-4 py-2 text-center" colSpan={days.length + 1}>
                No Slots Available
              </td>
            </tr>
          ) : (
            timeSlots.map((slot) => (
              <tr key={slot.time}>
                <td className="border px-4 py-2">{slot.time}</td>
                {days.map((day) => (
                  <td key={day} className="border px-4 py-2 text-center">
                    {slot.status === 'Available' ? (
                      <span className="text-green-500">Available</span>
                    ) : slot.status === 'Lunch Break' ? (
                      <span className="text-yellow-500">Lunch Break</span>
                    ) : (
                      <span className="text-gray-400">{slot.status}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSlotTable;
