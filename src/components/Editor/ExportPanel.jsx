import { useState } from "react";
import {
  FaTimes,
  FaCode,
  FaFileCode,
  FaDownload,
  FaReact,
} from "react-icons/fa";
import { generateReactComponent } from "../../utils/exportUtils";

function ExportPanel({ elements, onClose }) {
  const [exportType, setExportType] = useState("html");

  const handleExport = () => {
    switch (exportType) {
      case "html":
        const htmlContent = elements
          .map(
            (el) =>
              `<div style="position: absolute; left: ${el.x}px; top: ${
                el.y
              }px; width: ${el.width}px; height: ${el.height}px;">
                ${renderElement(el)}
              </div>`
          )
          .join("\n");
        downloadFile(htmlContent, "export.html", "text/html");
        break;

      case "css":
        const cssContent = elements
          .map(
            (el) =>
              `#element-${el.id} {
                ${Object.entries(el.styles || {})
                  .map(([key, value]) => `${key}: ${value};`)
                  .join("\n  ")}
              }`
          )
          .join("\n\n");
        downloadFile(cssContent, "styles.css", "text/css");
        break;

      case "react":
        const reactComponent = generateReactComponent(elements);
        downloadFile(reactComponent, "ExportedCanvas.jsx", "text/javascript");
        break;

      default:
        break;
    }
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Export Design</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setExportType("html")}
              className={`flex flex-col items-center gap-2 p-4 border rounded-lg ${
                exportType === "html"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <FaCode className="text-2xl text-blue-500" />
              <span className="font-medium">HTML</span>
            </button>

            <button
              onClick={() => setExportType("css")}
              className={`flex flex-col items-center gap-2 p-4 border rounded-lg ${
                exportType === "css"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <FaFileCode className="text-2xl text-blue-500" />
              <span className="font-medium">CSS</span>
            </button>

            <button
              onClick={() => setExportType("react")}
              className={`flex flex-col items-center gap-2 p-4 border rounded-lg ${
                exportType === "react"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <FaReact className="text-2xl text-blue-500" />
              <span className="font-medium">React</span>
            </button>
          </div>

          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaDownload /> Export {exportType.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportPanel;
