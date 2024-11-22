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
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white p-2 rounded-lg shadow-lg z-50">
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="px-2 py-1 border rounded"
      />
      <button
        onClick={saveProject}
        className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <FaSave /> Save
      </button>
      <button
        onClick={loadProject}
        className="flex items-center gap-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        <FaFolderOpen /> Load
      </button>
    </div>
  );
}

export default ProjectManager;
