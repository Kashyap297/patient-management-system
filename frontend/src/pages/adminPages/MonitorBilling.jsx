import BillCard from "../../components/BillCard";

const MonitorBilling = () => {
  const bills = [
    {
      id: 5654,
      date: "2 Jan, 2022",
      patientName: "Hlie Schleifer",
      phoneNumber: "85759 58421",
    },
    // Add more dummy bills as needed
    {
      id: 5654,
      date: "2 Jan, 2022",
      patientName: "Haylie Schleifer",
      phoneNumber: "85759 58421",
    },
    {
      id: 5654,
      date: "2 Jan, 2022",
      patientName: "Haylie Schleifer",
      phoneNumber: "85759 58421",
    },
    {
      id: 5654,
      date: "2 Jan, 2022",
      patientName: "Haylie Schleifer",
      phoneNumber: "85759 58421",
    },
    {
      id: 5654,
      date: "2 Jan, 2022",
      patientName: "Haylie Schleifer",
      phoneNumber: "85759 58421",
    },
    {
      id: 5654,
      date: "2 Jan, 2022",
      patientName: "Haylie Schleifer",
      phoneNumber: "85759 58421",
    },
    {
      id: 5654,
      date: "2 Jan, 2022",
      patientName: "Haylie Schleifer",
      phoneNumber: "85759 58421",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">
        Pending Bills ({bills.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bills.map((bill, index) => (
          <BillCard key={index} bill={bill} />
        ))}
      </div>
    </div>
  );
};

export default MonitorBilling;
