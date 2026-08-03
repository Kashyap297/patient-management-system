const payload = {
  firstName: "Test",
  lastName: "User",
  email: `test.register${Date.now()}@example.com`,
  phoneNumber: String(Math.floor(1000000000 + Math.random() * 9000000000)),
  password: "Password123!",
  age: 30,
  height: 175,
  weight: 70,
  gender: "Male",
  bloodGroup: "O+",
  dateOfBirth: "1994-01-01",
  country: "US",
  state: "NY",
  city: "New York",
  address: "123 Test St"
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
