"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OverviewChartProps {
  data: { name: string; stock: number }[];
}

export default function OverviewChart({ data }: OverviewChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="stock" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}