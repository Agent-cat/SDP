import { useState } from "react";
import { FaPlus, FaRegCopy } from "react-icons/fa";

const templates = [
  {
    id: "contact-form",
    name: "Contact Form",
    thumbnail: "/templates/contact-form.png",
    elements: [
      {
        id: "heading_1",
        type: "heading",
        content: "Contact Us",
        x: 0,
        y: 0,
        width: 200,
        height: 50,
        styles: { fontSize: 24, marginBottom: 20 },
      },
      {
        id: "input_name",
        type: "input",
        label: "Name",
        content: "Enter your name",
        x: 0,
        y: 60,
        width: 200,
        height: 40,
        styles: { padding: 8, borderRadius: 4, border: "1px solid #e2e8f0" },
      },
      {
        id: "input_email",
        type: "input",
        label: "Email",
        content: "Enter your email",
        x: 0,
        y: 110,
        width: 200,
        height: 40,
        styles: { padding: 8, borderRadius: 4, border: "1px solid #e2e8f0" },
      },
      {
        id: "button_submit",
        type: "button",
        content: "Submit",
        x: 0,
        y: 160,
        width: 100,
        height: 40,
        styles: {
          backgroundColor: "#3b82f6",
          color: "white",
          borderRadius: 4,
          padding: "8px 16px",
        },
      },
    ],
  },
  {
    id: "hero-section",
    name: "Hero Section",
    thumbnail: "/templates/hero.png",
    elements: [
      {
        id: "heading_hero",
        type: "heading",
        content: "Welcome to Our Website",
        x: 0,
        y: 0,
        width: 400,
        height: 60,
        styles: { fontSize: 32, fontWeight: "bold" },
      },
      {
        id: "paragraph_hero",
        type: "paragraph",
        content: "Discover amazing features and services.",
        x: 0,
        y: 70,
        width: 300,
        height: 40,
        styles: { color: "#666666" },
      },
      {
        id: "button_cta",
        type: "button",
        content: "Get Started",
        x: 0,
        y: 120,
        width: 120,
        height: 40,
        styles: {
          backgroundColor: "#3b82f6",
          color: "white",
          borderRadius: 4,
          padding: "8px 16px",
        },
      },
    ],
  },
];

function TemplateGallery({ onSelectTemplate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow hover:bg-gray-50"
      >
        <FaPlus /> Templates
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Choose a Template</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <button
                      onClick={() => {
                        onSelectTemplate(template.elements);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 w-full justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <FaRegCopy /> Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TemplateGallery;
