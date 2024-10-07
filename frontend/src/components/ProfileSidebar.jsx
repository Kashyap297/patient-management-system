import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Person, Lock, Gavel, PrivacyTip } from "@mui/icons-material";
import admin from "../assets/images/admin-image.png";

const ProfileSidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-64 bg-white h-full rounded-l-3xl border-r border-gray-200 flex flex-col p-6">
      <div className="text-center mb-6">
        <img
          src={admin}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h2 className="text-xl font-semibold mt-2">Lincoln Philips</h2>
      </div>

      {/* Sidebar Menu */}
      <List>
        <ListItem
          button
          selected={activeSection === "Profile"}
          onClick={() => setActiveSection("Profile")}
        >
          <ListItemIcon>
            <Person
              color={activeSection === "Profile" ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem
          button
          selected={activeSection === "Change Password"}
          onClick={() => setActiveSection("Change Password")}
        >
          <ListItemIcon>
            <Lock
              color={
                activeSection === "Change Password" ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>

        <ListItem
          button
          selected={activeSection === "Terms & Condition"}
          onClick={() => setActiveSection("Terms & Condition")}
        >
          <ListItemIcon>
            <Gavel
              color={
                activeSection === "Terms & Condition" ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Terms & Condition" />
        </ListItem>

        <ListItem
          button
          selected={activeSection === "Privacy Policy"}
          onClick={() => setActiveSection("Privacy Policy")}
        >
          <ListItemIcon>
            <PrivacyTip
              color={activeSection === "Privacy Policy" ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Privacy Policy" />
        </ListItem>
      </List>
    </div>
  );
};

export default ProfileSidebar;
