import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

export function MainLayout({ children }: any) {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r px-5 py-6 flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-bold mb-6 text-indigo-600">
            Smart Career
          </h2>

          <div className="space-y-2">

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-left p-3 rounded-xl bg-indigo-600 text-white"
            >
              Dashboard
            </button>

            <button className="w-full text-left p-3 rounded-xl hover:bg-gray-100">
              Career Path
            </button>

            <button className="w-full text-left p-3 rounded-xl hover:bg-gray-100">
              Coding Tracker
            </button>

            <button className="w-full text-left p-3 rounded-xl hover:bg-gray-100">
              Analytics
            </button>

          </div>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center bg-white px-6 py-4 border-b">

          <h1 className="text-lg font-semibold">Dashboard</h1>

          <div className="flex items-center gap-5">

            <div className="relative">
              <Bell />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full">
                {localStorage.getItem("userName")?.charAt(0)}
              </div>

              <div className="text-sm">
                <p className="font-medium">
                  {localStorage.getItem("userName")}
                </p>
                <p className="text-gray-400 text-xs">Premium</p>
              </div>
            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}