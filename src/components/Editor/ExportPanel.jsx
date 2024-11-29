import { useState } from "react";
import { FaTimes, FaCode, FaFileCode, FaDownload } from "react-icons/fa";

function ExportPanel({ elements, onClose }) {
  const [exportType, setExportType] = useState("html");

  const generateHTML = () => {
    return elements
      .map((element) => {
        const styles = Object.entries(element.styles || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join(";");

        switch (element.type) {
          case "heading":
            return `<h1 style="${styles}">${element.content || "Heading"}</h1>`;
          case "paragraph":
            return `<p style="${styles}">${element.content || "Paragraph"}</p>`;
          case "image":
            return `<img src="${element.src}" alt="${
              element.alt || ""
            }" style="${styles}" />`;
          case "input":
            return `<input type="${element.inputType || "text"}" placeholder="${
              element.placeholder || ""
            }" style="${styles}" />`;
          case "checkbox":
            return `
              <label style="${styles}">
                <input type="checkbox" ${element.checked ? "checked" : ""} />
                <span>${element.content || "Checkbox Label"}</span>
              </label>`;
          case "youtube":
            return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${element.videoId}" 
              frameborder="0" style="${styles}" allowfullscreen></iframe>`;
          case "link":
            return `<a href="${
              element.href
            }" style="${styles}" target="_blank" rel="noopener noreferrer">
              ${element.content || "Click here"}</a>`;
          case "container":
            return `<div style="${styles}">${element.content || ""}</div>`;
          default:
            return "";
        }
      })
      .join("\n");
  };

  const generateCSS = () => {
    return elements
      .map((element) => {
        const styles = Object.entries(element.styles || {})
          .map(([key, value]) => `  ${key}: ${value};`)
          .join("\n");

        return `.element-${element.id} {\n${styles}\n}`;
      })
      .join("\n\n");
  };

  const generateFullHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Design</title>
    <style>
${generateCSS()}
    </style>
</head>
<body>
${generateHTML()}
</body>
</html>`;
  };

  const handleExport = () => {
    const content = exportType === "html" ? generateFullHTML() : generateCSS();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export.${exportType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
          <div className="flex gap-4">
            <button
              onClick={() => setExportType("html")}
              className={`flex-1 flex flex-col items-center gap-2 p-4 border rounded-lg ${
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
              className={`flex-1 flex flex-col items-center gap-2 p-4 border rounded-lg ${
                exportType === "css"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <FaFileCode className="text-2xl text-blue-500" />
              <span className="font-medium">CSS</span>
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
