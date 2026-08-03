const payload = {
  email: "admin@example.com",
  password: "AdminPassword123!"
};

fetch("http://localhost:8000/api/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})
.then(response => response.json().then(data => ({ status: response.status, data })))
.then(result => console.log("Response:", JSON.stringify(result, null, 2)))
.catch(err => console.error("Error:", err));
