import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const CustomBarChart = ({ data }) => {
    // console.log(data)
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case 'Low':
        return '#FFCE56';
      case 'Medium':
        return '#36A2EB';
      case 'High':
        return '#FF6384';
      default:
        return '#a9a9a9';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded-lg p-2 shadow-md">
          <p className="text-xs font-semibold text-purple-600">{payload[0].payload.priority}</p>
          <p className="text-sm text-gray-700">Count: {payload[0].payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-md border border-slate-200 p-2 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Task Priority Levels</h3>
      <ResponsiveContainer width="100%" height={270}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis dataKey="priority" tick={{ fontSize: 12, fill: '#555' }} stroke='none'/>

          <YAxis tick={{ fontSize: 12, fill: '#555' }}  stroke='none'/>

          <Tooltip content={CustomTooltip} cursor={{fill:"transparent"}} />
            <Legend/>
          <Bar dataKey="count" nameKey="priority" fill='#FF8042' radius={[10,10,0,0]} activeDot={{r:8,fill:"yellow"}} activeStyle={{fill:"green"}} >
            {data.map((entry, index) => (
              <Cell key={`${index}`} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
