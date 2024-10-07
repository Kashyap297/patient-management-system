import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const PatientsAge = () => {
  const data = [
    { name: '0-2 Years', value: 8, color: '#F65D79' },
    { name: '3-12 Years', value: 12, color: '#506EF2' },
    { name: '13-19 Years', value: 20, color: '#51D2A6' },
    { name: '20-39 Years', value: 18, color: '#F6A52D' },
    { name: '40-59 Years', value: 8, color: '#FACF2E' },
    { name: '60 And Above', value: 34, color: '#9253E1' },
  ];

  const totalPatients = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className='p-4 bg-white rounded-lg shadow-md w-fit'>
        <h2 className="text-lg font-semibold mb-4">Patients Age</h2>
    <div className=" justify-between flex">
      
      <div className="relative flex justify-center items-center">
        {/* Donut Chart */}
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        {/* Total Patients */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="text-center">
            <p className="text-gray-500">Total Patients</p>
            <p className="text-4xl font-bold text-blue-500">{totalPatients}</p>
          </div>
        </div>
      </div>

      {/* Age Group Legend */}
      <div className="mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex justify-between items-center my-1">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></span>
              <p>{entry.name}</p>
            </div>
            <p className="text-gray-500">{`${entry.value}%`}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default PatientsAge;
