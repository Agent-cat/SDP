import { useState } from "react";
import {
  FaDownload,
  FaLayerGroup,
  FaTrash,
  FaMobile,
  FaTabletAlt,
  FaDesktop,
} from "react-icons/fa";
import TemplateGallery from "../Templates/TemplateGallery";
import ExportPanel from "../Editor/ExportPanel";

function Navbar({
  elements,
  onElementsUpdate,
  showLayers,
  setShowLayers,
  selectedElement,
  onDeleteElement,
  onDeviceChange,
}) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleTemplateSelect = (template) => {
    if (template && template.elements) {
      onElementsUpdate(template.elements);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedElement) {
      onDeleteElement(selectedElement.id);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1 flex items-center justify-center space-x-4">
        <TemplateGallery
          onSelectTemplate={handleTemplateSelect}
          elements={elements}
        />

        <div className="flex gap-2 bg-white rounded-lg p-1">
          <button
            onClick={() => onDeviceChange("375px")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Mobile View"
          >
            <FaMobile />
          </button>
          <button
            onClick={() => onDeviceChange("768px")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Tablet View"
          >
            <FaTabletAlt />
          </button>
          <button
            onClick={() => onDeviceChange("100%")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Desktop View"
          >
            <FaDesktop />
          </button>
        </div>

        <button
          onClick={() => setShowLayers(!showLayers)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            showLayers
              ? "bg-blue-100 text-blue-700"
              : "bg-blue-50 hover:bg-blue-100"
          }`}
        >
          <FaLayerGroup />
          <span>Layers</span>
        </button>

        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          <FaDownload />
          <span>Export</span>
        </button>

        {selectedElement && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        )}
      </div>

      <div className="flex items-center pr-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <img
              src="https://via.placeholder.com/32"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-gray-700 font-medium">John Doe</span>
        </div>
      </div>

      {showExportModal && (
        <ExportPanel
          elements={elements}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {showDeleteConfirm && selectedElement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">
              Delete {selectedElement.type}
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this{" "}
              {selectedElement.type.toLowerCase()}
              {selectedElement.content && (
                <span className="block mt-2 p-2 bg-gray-50 rounded border text-sm">
                  "{selectedElement.content.substring(0, 50)}
                  {selectedElement.content.length > 50 ? "..." : ""}"
                </span>
              )}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
