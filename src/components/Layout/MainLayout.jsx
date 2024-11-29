import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";

function MainLayout({ sidebar, navbar, content, styleEditor }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Top Navigation Bar */}
      <div
        className={`h-14 border-b ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } px-4`}
      >
        <div className="h-full flex items-center justify-between">
          {/* Logo and Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <span
              className={`font-bold text-xl ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Form Builder
            </span>
          </div>

          {/* Navbar Content */}
          <div className="flex-1 ml-8">{navbar}</div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 flex flex-col border-r ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {sidebar}
        </div>

        {/* Center Canvas */}
        <div
          className={`flex-1 overflow-auto ${
            isDarkMode ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          <div className="h-full p-6">
            <div
              className={`h-full rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              {content}
            </div>
          </div>
        </div>

        {/* Right Style Editor Panel */}
        {styleEditor && (
          <div
            className={`w-80 border-l ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            {styleEditor}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
