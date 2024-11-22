import { useState } from "react";
import { FaSave, FaFolderOpen } from "react-icons/fa";

function ProjectManager({ elements, onLoad }) {
  const [projectName, setProjectName] = useState("Untitled Project");

  const saveProject = () => {
    const project = {
      name: projectName,
      elements,
      lastModified: new Date().toISOString(),
    };

    localStorage.setItem(`project_${Date.now()}`, JSON.stringify(project));
  };

  const loadProject = () => {
    const projects = Object.entries(localStorage)
      .filter(([key]) => key.startsWith("project_"))
      .map(([key, value]) => JSON.parse(value));

    if (projects.length === 0) {
      alert("No saved projects found");
      return;
    }

    // For simplicity, load the most recent project
    const mostRecent = projects.sort(
      (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
    )[0];

    setProjectName(mostRecent.name);
    onLoad(mostRecent.elements);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Project Name"
      />
      <button
        onClick={saveProject}
        className="flex items-center gap-2 px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        <FaSave /> Save
      </button>
      <button
        onClick={loadProject}
        className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        <FaFolderOpen /> Load
      </button>
    </div>
  );
}

export default ProjectManager;
