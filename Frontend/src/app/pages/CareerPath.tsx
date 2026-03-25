import React, { useEffect, useState } from "react";
import { getCareers, selectCareer } from "../../api/api";

export function CareerPath() {
  const [careers, setCareers] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    getCareers().then((res) => setCareers(res || []));
  }, []);

  const handleSelect = async (title: string) => {
    setSelected(title);
    localStorage.setItem("career", title);
    await selectCareer(title);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Explore Career Paths</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((c: any) => (
          <div key={c.id} className="p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-indigo-600">{c.title}</h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{c.description}</p>

            <div className="space-y-2 mb-6 text-sm">
              <p className="flex justify-between">
                <span className="text-gray-500">💰 Est. Salary:</span>
                <span className="font-semibold">{c.salary}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">🔥 Market Demand:</span>
                <span className="font-semibold text-green-600">{c.demand}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">💼 Jobs Available:</span>
                <span className="font-semibold text-indigo-600">{c.jobsCount}</span>
              </p>
            </div>

            <button
              onClick={() => handleSelect(c.title)}
              className={`w-full py-2.5 rounded-xl font-medium transition-colors ${
                selected === c.title
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border"
              }`}
            >
              {selected === c.title ? "Selected Path" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}