import { Group } from "@mui/icons-material";

const PatientCountDepartment = () => {
  // Sample data
  const departments = [
    { name: "Cardiology", count: 105 },
    { name: "Endocrinologist", count: 254 },
    { name: "Gastroenterologist", count: 657 },
    { name: "Anesthesiologist", count: 2 },
    { name: "Pediatrician", count: 784 },
    { name: "Ophthalmologist", count: 254 },
    { name: "Orthopedic", count: 321 },
    { name: "Dermatologist", count: 567 },
    { name: "Neurologist", count: 189 },
    { name: "Oncologist", count: 421 },
    { name: "Urologist", count: 935 },
    { name: "Nephrologist", count: 117 },
    { name: "Pulmonologist", count: 654 },
    { name: "Rheumatologist", count: 270 },
    { name: "Gynecologist", count: 819 },
    { name: "Otolaryngologist", count: 463 },
    { name: "Pathologist", count: 198 },
    { name: "Radiologist", count: 742 },
    { name: "Psychiatrist", count: 351 },
    { name: "General Surgeon", count: 627 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-h-[400px]">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold mb-4">
          Patients Count Department
        </h2>
        <div className="flex justify-between text-sm font-semibold text-gray-500">
          <p>Department Name</p>
          <p>Patient Count</p>
        </div>
      </div>

      {/* Scrollable Data */}
      <div className="overflow-y-auto max-h-[250px]">
        <table className="min-w-full">
          <tbody>
            {departments.map((dept, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 text-left">{dept.name}</td>
                <td className="p-3 text-right flex justify-end items-center gap-2">
                  <Group className="text-green-500" />
                  <span className="font-semibold text-green-500">
                    {dept.count}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientCountDepartment;
