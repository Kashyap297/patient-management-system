const payload = {
  firstName: "Rohan",
  lastName: "Patel",
  email: "rohan.patel@gmail.com",
  phoneNumber: "9876543210",
  password: "Password123!",
  age: 25,
  height: 170,
  weight: 68,
  gender: "Male",
  bloodGroup: "B+",
  dateOfBirth: "1999-06-15",
  country: "India",
  state: "Gujarat",
  city: "Ahmedabad",
  address: "Navrangpura, Ahmedabad"
};

fetch("http://localhost:8000/api/users/register-patient", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})
.then(response => response.json().then(data => ({ status: response.status, data })))
.then(result => console.log("Response:", JSON.stringify(result, null, 2)))
.catch(err => console.error("Error:", err));
