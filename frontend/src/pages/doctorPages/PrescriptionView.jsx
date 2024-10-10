import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import medical from "../../assets/images/medical-certificate.png";
import prescription from "../../assets/images/prescription.png";
import patientImage from "../../assets/images/patient-image.png";

const PrescriptionView = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Dummy patient data
  const patient = {
    name: 'Marcus Philips',
    number: '99130 44537',
    doctorName: 'Dr. Marcus Philips',
    age: '20 Years',
    issue: 'Feeling tired',
    gender: 'Male',
    appointmentType: 'Online',
    address: 'B-408 Swastik society, Mota Varacha, Rajkot',
    lastAppointmentDate: '2 Jan, 2022',
    lastAppointmentTime: '4:30 PM',
  };

  const Alldocuments = [
    { createdDate: '2 Jan, 2022', imageUrl: medical, title: 'Medical Certificate 1' },
    { createdDate: '5 Feb, 2022', imageUrl: prescription, title: 'Medical Certificate 2' },
    { createdDate: '15 Mar, 2022', imageUrl: medical, title: 'Medical Certificate 3' },
    { createdDate: '30 Apr, 2022', imageUrl: prescription, title: 'Medical Certificate 4' },
  ];

  const Prescriptions = [
    { createdDate: '2 Jan, 2022', imageUrl: prescription, title: 'Medical Certificate 1' },
    { createdDate: '5 Feb, 2022', imageUrl: prescription, title: 'Medical Certificate 2' },
    { createdDate: '15 Mar, 2022', imageUrl: prescription, title: 'Medical Certificate 3' },
    { createdDate: '30 Apr, 2022', imageUrl: prescription, title: 'Medical Certificate 4' },
  ];

  const Descriptions = [
    {
      createdDate: '2 Jan, 2022',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
    },
    {
      createdDate: '5 Feb, 2022',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      createdDate: '15 Mar, 2022',
      description:
        'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum.',
    },
    {
      createdDate: '30 Apr, 2022',
      description:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
    },
  ];

  return (
    <div className="p-8 bg-white min-h-screen shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <img
          src={patientImage}
          alt={patient.name}
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">Patient Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>Patient Name: {patient.name}</div>
            <div>Patient Number: {patient.number}</div>
            <div>Doctor Name: {patient.doctorName}</div>
            <div>Patient Age: {patient.age}</div>
            <div>Patient Issue: {patient.issue}</div>
            <div>Patient Gender: {patient.gender}</div>
            <div>Appointment Type: {patient.appointmentType}</div>
            <div>Patient Address: {patient.address}</div>
            <div>Last Appointment Date: {patient.lastAppointmentDate}</div>
            <div>Last Appointment Time: {patient.lastAppointmentTime}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList className="flex border-b-2 mb-4">
          <Tab
            className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
              }`}
          >
            All Documents
          </Tab>
          <Tab
            className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
              }`}
          >
            All Prescriptions
          </Tab>
          <Tab
            className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 2 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
              }`}
          >
            Description
          </Tab>
        </TabList>

        {/* All Documents */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Alldocuments.map((document, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <h3 className="text-gray-600">Created Date</h3>
                <p className="text-sm text-gray-500">{document.createdDate}</p>
                <img src={document.imageUrl} alt={document.title} />
              </div>
            ))}
          </div>
        </TabPanel>

        {/* All Prescriptions */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Prescriptions.map((document, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <h3 className="text-gray-600">Created Date</h3>
                <p className="text-sm text-gray-500">{document.createdDate}</p>
                <img src={document.imageUrl} alt={document.title} />
              </div>
            ))}
          </div>
        </TabPanel>

        {/* Description Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Descriptions.map((desc, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <h3 className="text-gray-600">Description Date</h3>
                <p className="text-sm text-gray-500">{desc.createdDate}</p>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>{desc.description}</li>
                </ul>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PrescriptionView;
