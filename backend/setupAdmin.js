const payloadHospital = {
  name: "City Central Hospital",
  address: "456 Main St",
  country: "US",
  state: "NY",
  city: "New York",
  zipCode: "10001"
};

const createAdminPayload = (hospitalId) => ({
  firstName: "Super",
  lastName: "Admin",
  email: "admin@example.com", // <-- SET YOUR ADMIN EMAIL HERE
  phoneNumber: "1234567890",
  password: "AdminPassword123!", // <-- SET YOUR ADMIN PASSWORD HERE
  country: "US",
  state: "NY",
  city: "New York",
  hospital: hospitalId
});

async function run() {
  console.log("1) Creating a Hospital...");
  let hospitalId;

  try {
    const resHospital = await fetch("http://localhost:8000/api/hospitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadHospital)
    });
    const hospitalData = await resHospital.json();
    
    if (resHospital.status === 201) {
      console.log("-> Hospital created successfully!");
      hospitalId = hospitalData.hospital._id;
    } else if (resHospital.status === 400 && hospitalData.message === "Hospital already exists") {
      console.log("-> Hospital already exists. Fetching existing hospital...");
      const resAll = await fetch("http://localhost:8000/api/hospitals");
      const allHospitals = await resAll.json();
      const existing = allHospitals.data.find(h => h.name === payloadHospital.name && h.city === payloadHospital.city);
      hospitalId = existing._id;
    } else {
      console.error("-> Failed to handle hospital:", hospitalData);
      return;
    }

    console.log("\n2) Creating Admin user...");
    const resAdmin = await fetch("http://localhost:8000/api/users/register-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createAdminPayload(hospitalId))
    });
    
    const adminData = await resAdmin.json();
    if (resAdmin.status === 201) {
      console.log("-> Admin user created successfully!");
      console.log(adminData);
    } else {
      console.error("-> Failed to create Admin:", adminData);
    }

  } catch (err) {
    console.error("Error connecting to the API:", err);
  }
}

run();
