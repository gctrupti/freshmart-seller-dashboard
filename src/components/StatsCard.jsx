import React from "react";

export default function StatsCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">

      <div className="bg-green-100 p-3 rounded-lg">
        <Icon className="text-green-600" size={22} />
      </div>

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}