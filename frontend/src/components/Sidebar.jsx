import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
} from "@mui/material";
import {
  CalendarToday,
  Chat,
  Payment,
  Logout,
  Group,
  PhoneInTalk,
  ExpandMore,
  ExpandLess,
  BarChart,
  LocalHospital,
  PostAdd,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.png"; // Assuming you have a logo path here
// import { useUser } from "../../context/user";
import { createFilterOptions } from "@mui/material/Autocomplete";
const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [openBilling, setOpenBilling] = useState(false);
  // const { setUser } = useUser();

  // Define tab options for each role
  const tabs = {
    admin: [
      { label: "Dashboard", icon: <CalendarToday />, path: "dashboard" },
      {
        label: "Doctor Management",
        icon: <Group />,
        path: "doctor-management",
      },
      {
        label: "Patient Management",
        icon: <Group />,
        path: "patient-management",
      },
      {
        label: "Billing And Payments",
        icon: <Payment />,
        path: null, // This is to allow the dropdown to open without navigation
        subMenu: [
          { label: "Monitor Billing", path: "monitor-billing" },
          { label: "Insurance Claims", path: "insurance-claims" },
          { label: "Payment Process", path: "payment-process" },
        ],
      },
      {
        label: "Reporting And Analytics",
        icon: <BarChart />,
        path: "analytics",
      },
    ],
    doctor: [
      {
        label: "Appointment Management",
        icon: <CalendarToday />,
        path: "appointment-management",
      },
      {
        label: "Patient Record Access",
        icon: <PostAdd />,
        path: "patient-record-access",
      },
      {
        label: "Prescription Tools",
        icon: <LocalHospital />,
        path: null,
        subMenu: [
          { label: "Create", path: "prescription-tools/create" },
          { label: "Manage", path: "prescription-tools/manage" },
        ],
      },
      {
        label: "Teleconsultation Module",
        icon: <PhoneInTalk />,
        path: "teleconsultation",
      },
      { label: "Chat", icon: <Chat />, path: "doctor-chat" },
    ],
  };

  const handleLogout = () => {
    // setUser(null);
    localStorage.clear(); // Clear any authentication tokens
    navigate("/"); // Redirect to login page
  };

  const handleToggleBilling = () => {
    setOpenBilling(!openBilling);
  };

  // Check if the current path matches the tab path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between">
      {/* Logo Section */}
      <div className="p-6">
        <img src={logo} alt="Hospital Logo" />
      </div>

      {/* Menu Section */}
      <div className="flex-1">
        <List>
          {tabs[role].map((tab, index) =>
            tab.subMenu ? (
              <div key={index}>
                <ListItem
                  button
                  onClick={handleToggleBilling}
                  className={isActive(tab.path) ? "bg-blue-100" : ""}
                >
                  <ListItemIcon>{tab.icon}</ListItemIcon>
                  <ListItemText primary={tab.label} />
                  {openBilling ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openBilling} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {tab.subMenu.map((subTab, subIndex) => (
                      <ListItem
                        button
                        key={subIndex}
                        onClick={() => navigate(subTab.path)}
                        className={`pl-12 ${
                          isActive(subTab.path) ? "bg-blue-100" : ""
                        }`}
                      >
                        <ListItemText primary={subTab.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            ) : (
              <ListItem
                button
                key={index}
                onClick={() => navigate(tab.path)}
                className={isActive(tab.path) ? "bg-blue-100" : ""}
              >
                <ListItemIcon>{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.label} />
              </ListItem>
            )
          )}
        </List>
      </div>

      {/* Logout Button */}
      <div className="p-6">
        <Button
          onClick={handleLogout}
          className="!text-red-500 hover:!bg-red-200 !w-full"
        >
          <Logout />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
