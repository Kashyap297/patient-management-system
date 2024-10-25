import { useEffect, useRef, useState } from "react";
import "../../DoctorMeetingConference.scss";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios'; // Axios for making HTTP requests
import { useParams } from 'react-router-dom'; // To get appointment ID from the route

const DoctorMeetingConference = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [roomID, setRoomID] = useState(null); // State for room ID
  const [userName, setUserName] = useState('');
  const sidebarRef = useRef(null);
  const { appointmentId } = useParams(); // Assuming you're passing appointmentId in the URL

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Fetch roomID from the backend using the appointment ID
  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/appointments/${appointmentId}`); // Assuming you have a backend route to get appointment details
      const appointmentData = response.data.data;
      console.log(appointmentData)
      setRoomID(appointmentData.roomID); // Set the room ID from backend
      setUserName(appointmentData.doctorName); // Set the user name (patient name or doctor name)
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  const initZegoCloudMeeting = async (element) => {
    const appID = 1757979495;
    const serverSecret = "04f46682ad34e9005b14d629441180e3";
    const userID = Date.now().toString(); // Generating a unique user ID for each participant

    if (!roomID) {
      console.error("Room ID is not available");
      return;
    }

    // Generate the Zego kit token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      roomID: roomID,
      userID: userID,
      userName: userName,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onUserAvatarSetter:(userList) => {
        userList.forEach(user => {
            user.setUserAvatar("/assets/images/Avatar-2.png");
        });
      },
    });
  };

  useEffect(() => {
    fetchAppointmentDetails(); // Fetch the appointment details when the component loads
  }, [appointmentId]);

  useEffect(() => {
    const videoCallDiv = document.getElementById('video-call-container');
    if (videoCallDiv && roomID) {
      initZegoCloudMeeting(videoCallDiv); // Initialize the meeting once room ID is available
    }
  }, [roomID]);

  return (
    <div className="d-flex">
      <div className="w-85 w-md-100">
        <div className="container-fluid meeting-conference-page py-4">
          <h4 className="meeting-conference-title">
            Patient Meeting Conference
          </h4>

          <div
            id="video-call-container"
            className="video-call-container"
            style={{ width: '100%', height: '100vh', backgroundColor: '#718EBF' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DoctorMeetingConference;
