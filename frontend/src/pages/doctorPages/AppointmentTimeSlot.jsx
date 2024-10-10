import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const AppointmentTimeSlot = () => {
  const [events, setEvents] = useState([
    {
      title: 'Skin Treatment',
      start: new Date(2022, 5, 18, 15, 0), // 3:00 PM on June 18th, 2022
      end: new Date(2022, 5, 18, 16, 0),   // 4:00 PM
      resource: 'Dr. Andrew',
    },
    {
      title: 'Hair Treatment',
      start: new Date(2022, 5, 18, 19, 0), // 7:00 PM
      end: new Date(2022, 5, 18, 20, 0),   // 8:00 PM
      resource: 'Dr. Andrew',
    },
    {
      title: 'Brain Tumor',
      start: new Date(2022, 5, 23, 18, 0), // 6:00 PM on June 23rd, 2022
      end: new Date(2022, 5, 23, 19, 0),   // 7:00 PM
      resource: 'Dr. Andrew',
    },
  ]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h3 className="text-lg font-semibold mb-4">Appointment Time Slot</h3>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={['week', 'day']}
        defaultView="week"
        popup
        eventPropGetter={(event) => {
          const backgroundColor = event.resource === 'Dr. Andrew' ? '#3174ad' : '#3a87ad';
          return { style: { backgroundColor } };
        }}
      />
    </div>
  );
};

export default AppointmentTimeSlot;
