import { useState } from "react";
import { FaDownload } from "react-icons/fa";

function ExportPanel({ elements }) {
  const [exportType, setExportType] = useState("html");

  const generateHTML = () => {
    let html = "<!DOCTYPE html>\n<html>\n<head>\n";
    html += '<meta charset="UTF-8">\n';
    html += "<style>\n" + generateCSS() + "</style>\n";
    html += "</head>\n<body>\n";

    elements.forEach((element) => {
      if (!element.hidden) {
        const styles = Object.entries(element.styles || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join(";");

        switch (element.type) {
          case "heading":
            html += `<h2 style="${styles}">${element.content}</h2>\n`;
            break;
          case "paragraph":
            html += `<p style="${styles}">${element.content}</p>\n`;
            break;
          case "image":
            html += `<img src="${element.content}" alt="${element.alt}" style="${styles}">\n`;
            break;
          case "button":
            html += `<button style="${styles}">${element.content}</button>\n`;
            break;
          case "container":
            html += `<div style="${styles}">${element.content}</div>\n`;
            break;
        }
      }
    });

    html += "</body>\n</html>";
    return html;
  };

  const generateCSS = () => {
    let css = "";
    elements.forEach((element) => {
      if (!element.hidden && element.styles) {
        css += `.${element.id} {\n`;
        Object.entries(element.styles).forEach(([key, value]) => {
          css += `  ${key}: ${value};\n`;
        });
        css += "}\n\n";
      }
    });
    return css;
  };

  const handleExport = () => {
    const content = exportType === "html" ? generateHTML() : generateCSS();
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
    <div className="flex items-center gap-2">
      <select
        value={exportType}
        onChange={(e) => setExportType(e.target.value)}
        className="px-2 py-1 border rounded"
      >
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <FaDownload /> Export
      </button>
    </div>
  );
}

export default ExportPanel;
