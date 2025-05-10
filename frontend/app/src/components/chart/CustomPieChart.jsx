import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

function CustomPieChart({ data, label, colors }) {
  return (
    <div className="bg-white rounded-md border border-slate-200 p-4 shadow-sm">
      <h3 className="text-md font-semibold text-gray-700 mb-4">{label}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}
            //   innerRadius={80}
              labelLine={false}
             
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip/>} />
            <Legend content={<CustomLegend/>}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CustomPieChart;
