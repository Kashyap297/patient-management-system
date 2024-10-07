import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data from API
  const fetchUserData = async () => {
    try {
      // const userData = await fetch("/api/user");
      // const data = await userData.json();
      const data = {
        firstName: "Lincoln",
        lastName: "Philips",
        email: "lincon@gmail.com",
        phoneNumber: "99130 53222",
        hospitalName: "Silver Park Medical Center",
        gender: "Male",
        city: "Ahmedabad",
        state: "Gujarat",
        country: "India",
        role: "admin",
      };
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
