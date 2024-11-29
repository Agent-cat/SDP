import { useState } from "react";
import {
  FaSave,
  FaFolderOpen,
  FaDownload,
  FaLayerGroup,
  FaImage,
} from "react-icons/fa";
import ProjectManager from "../ProjectManager/ProjectManager";
import TemplateGallery from "../Templates/TemplateGallery";
import ExportPanel from "../Editor/ExportPanel";

function Navbar({ elements, onElementsUpdate, showLayers, setShowLayers }) {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleTemplateSelect = (templateElements) => {
    console.log("Selected template elements:", templateElements); // Debug log
    onElementsUpdate(templateElements);
  };

  return (
    <div className="flex justify-between items-center px-6 py-3">
      <div className="flex items-center gap-4">
        <ProjectManager elements={elements} onLoad={onElementsUpdate} />
        <TemplateGallery
          onSelectTemplate={handleTemplateSelect}
          elements={elements}
        />
        <button
          onClick={() => setShowLayers(!showLayers)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            showLayers
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FaLayerGroup />
          <span>Layers</span>
        </button>
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <FaDownload />
          <span>Export</span>
        </button>
      </div>
      {showExportModal && (
        <ExportPanel
          elements={elements}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}

export default Navbar;
