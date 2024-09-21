//React Imports
import React from 'react';

//BarChart Import i.e. Rechart
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function BarChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Activities</h2>
      <ResponsiveContainer width={'80%'} height={300}>
        <BarChart data={budgetList} margin={{top:7}} >
          <XAxis dataKey='name'/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='totalSpent' stackId="a" fill='rgb(239 68 68)'/>
          <Bar dataKey="amount" stackId="a" fill='rgb(34 197 94)'/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard;