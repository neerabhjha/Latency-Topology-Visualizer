'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function LatencyChart({ data }:{ data: {t:number, ms:number}[] }){
  return (
    <div className="h-64 w-full border rounded-xl p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" tickFormatter={(t)=> new Date(t as number).toLocaleTimeString()} />
          <YAxis unit=" ms" />
          <Tooltip labelFormatter={(t)=> new Date(Number(t)).toLocaleString()} />
          <Line type="monotone" dataKey="ms" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
