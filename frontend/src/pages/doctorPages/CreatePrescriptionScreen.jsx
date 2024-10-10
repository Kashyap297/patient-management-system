import CreatePrescription from "../../components/CreatePrescription";


const appointmentData = [
  { id: '1', name: 'Jaydon Philips', age: 36, gender: 'Male', appointmentType: 'Onsite', time: '10:10 AM', isNew: true },
  { id: '2', name: 'Charlie Herwitz', age: 25, gender: 'Female', appointmentType: 'Onsite', time: '10:10 AM', isNew: true },
  { id: '3', name: 'Talan Lipshutz', age: 32, gender: 'Male', appointmentType: 'Onsite', time: '10:10 AM', isNew: false },
  { id: '4', name: 'Abram Septimus', age: 45, gender: 'Female', appointmentType: 'Onsite', time: '10:10 AM', isNew: true },
  { id: '5', name: 'Cooper Donin', age: 35, gender: 'Female', appointmentType: 'Onsite', time: '10:10 AM', isNew: true },
  { id: '6', name: 'Lincoln Arcand', age: 25, gender: 'Female', appointmentType: 'Onsite', time: '10:10 AM', isNew: false },
  { id: '7', name: 'Jakob Carder', age: 23, gender: 'Male', appointmentType: 'Onsite', time: '10:10 AM', isNew: true },
  { id: '8', name: 'Wilson Botosh', age: 18, gender: 'Male', appointmentType: 'Onsite', time: '10:10 AM', isNew: false },
  { id: '9', name: 'Cristofer Saris', age: 46, gender: 'Male', appointmentType: 'Onsite', time: '10:10 AM', isNew: false },
  { id: '10', name: 'James Bothman', age: 15, gender: 'Male', appointmentType: 'Onsite', time: '10:10 AM', isNew: true },
  { id: '11', name: 'Ryan Bator', age: 42, gender: 'Female', appointmentType: 'Onsite', time: '10:10 AM', isNew: false },
  { id: '12', name: 'Jakob Saris', age: 27, gender: 'Male', appointmentType: 'Onsite', time: '10:10 AM', isNew: true },
];

const CreatePrescriptionScreen = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Today Appointment</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {appointmentData.map((appointment) => (
          <CreatePrescription
            key={appointment.id}
            id={appointment.id} // Pass the new id field
            name={appointment.name}
            age={appointment.age}
            gender={appointment.gender}
            appointmentType={appointment.appointmentType}
            time={appointment.time}
            isNew={appointment.isNew}
          />
        ))}
      </div>
    </div>
  );
};

export default CreatePrescriptionScreen;
