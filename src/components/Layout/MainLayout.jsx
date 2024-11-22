import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function MainLayout({ sidebar, navbar, content }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-72" : "w-0"
        } transition-all duration-300 bg-white shadow-lg overflow-hidden border-r`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Builder</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="p-4">{sidebar}</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <div className="bg-white shadow-sm z-10 border-b">{navbar}</div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-8 relative">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg min-h-[calc(100vh-10rem)]">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
