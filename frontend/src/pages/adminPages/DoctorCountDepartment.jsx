
import { Group } from '@mui/icons-material';

const DoctorCountDepartment = () => {
    const doctorData = [
        { name: 'Cardiology', count: 8 },
        { name: 'Endocrinologist', count: 22 },
        { name: 'Gastroenterologist', count: 15 },
        { name: 'Anesthesiologist', count: 11 },
        { name: 'Pediatrician', count: 10 },
        { name: 'Ophthalmologist', count: 8 },
        { name: 'Orthopedic', count: 12 },
        { name: 'Dermatologist', count: 9 },
        { name: 'Neurologist', count: 18 },
        { name: 'Oncologist', count: 14 },
        { name: 'Urologist', count: 7 },
        { name: 'Nephrologist', count: 13 },
        { name: 'Pulmonologist', count: 16 },
        { name: 'Rheumatologist', count: 6 },
        { name: 'Gynecologist', count: 20 },
    ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-h-[400px]">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold mb-4">Doctor Count Department</h2>
        <div className="flex justify-between text-sm font-semibold text-gray-500">
          <p>Department Name</p>
          <p>Doctor Count</p>
        </div>
      </div>

      {/* Scrollable Data */}
      <div className="overflow-y-auto max-h-[250px]">
        <table className="min-w-full">
          <tbody>
            {doctorData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 text-left">{item.name}</td>
                <td className="p-3 text-right flex justify-end items-center gap-2">
                  <Group className="text-blue-500" />
                  <span className="font-semibold text-blue-500">{item.count}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorCountDepartment;
