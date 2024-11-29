import { useState } from "react";
import { templates } from "./templates";
import { FaTimes, FaImage } from "react-icons/fa";

function TemplateGallery({ onSelectTemplate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTemplateSelect = (template) => {
    onSelectTemplate(template.elements);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        <FaImage />
        <span>Templates</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Choose a Template</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg overflow-hidden hover:border-blue-500 cursor-pointer transition-colors"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {template.thumbnail ? (
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    <FaImage size={32} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {template.elements.length} elements
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TemplateGallery;
