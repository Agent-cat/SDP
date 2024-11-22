import { useState } from "react";
import { FaUpload } from "react-icons/fa";

function ElementRenderer({ element, onUpdate }) {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  const renderElement = () => {
    switch (element.type) {
      case "heading":
        return (
          <h1 style={element.styles} className="text-2xl font-bold">
            {element.content || "Heading Text"}
          </h1>
        );

      case "paragraph":
        return (
          <p style={element.styles}>
            {element.content || "Paragraph text goes here"}
          </p>
        );

      case "button":
        return (
          <button
            style={element.styles}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {element.content || "Button"}
          </button>
        );

      case "image":
        return element.content ? (
          <img
            src={element.content}
            alt="Uploaded content"
            style={element.styles}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-4"
            onClick={() => setShowUploadDialog(true)}
          >
            <FaUpload className="text-3xl mb-2 text-gray-400" />
            <span className="text-gray-500">Click to upload image</span>
          </div>
        );

      case "video":
        return element.content ? (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(
              element.content
            )}`}
            style={element.styles}
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-4"
            onClick={() => setShowLinkDialog(true)}
          >
            <span className="text-gray-500">Enter YouTube URL</span>
          </div>
        );

      case "map":
        return element.content ? (
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
              element.content
            )}`}
            style={element.styles}
            className="w-full h-full border-0"
            allowFullScreen
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-4"
            onClick={() => setShowLinkDialog(true)}
          >
            <span className="text-gray-500">Enter location</span>
          </div>
        );

      case "input":
        return (
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                {element.label || "Input Label"}
              </span>
            </label>
            <input
              type="text"
              placeholder={element.content || "Enter text..."}
              style={element.styles}
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      case "checkbox":
        return (
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-4">
                {element.content || "Checkbox label"}
              </span>
              <input
                type="checkbox"
                style={element.styles}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
        );

      case "radio":
        return (
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-4">
                {element.content || "Radio label"}
              </span>
              <input
                type="radio"
                name={`radio_${element.id}`}
                style={element.styles}
                className="radio radio-primary"
              />
            </label>
          </div>
        );

      case "list":
        return (
          <ul style={element.styles} className="list-disc pl-5">
            {(element.content || "Item 1\nItem 2\nItem 3")
              .split("\n")
              .map((item, index) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        );

      case "quote":
        return (
          <blockquote
            style={element.styles}
            className="border-l-4 border-gray-300 pl-4 italic"
          >
            {element.content || "Enter quote text"}
          </blockquote>
        );

      case "code":
        return (
          <pre
            style={element.styles}
            className="bg-gray-100 p-4 rounded font-mono text-sm overflow-auto"
          >
            <code>{element.content || "// Enter code here"}</code>
          </pre>
        );

      case "table":
        return (
          <table style={element.styles} className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Header 1</th>
                <th className="border p-2">Header 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Cell 1</td>
                <td className="border p-2">Cell 2</td>
              </tr>
            </tbody>
          </table>
        );

      case "columns":
        return (
          <div style={element.styles} className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded">Column 1</div>
            <div className="border p-4 rounded">Column 2</div>
          </div>
        );

      case "container":
        return (
          <div
            style={element.styles}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px]"
          >
            {element.content || "Container"}
          </div>
        );

      case "link":
        return (
          <a
            href={element.content || "#"}
            style={element.styles}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {element.content || "Enter link URL"}
          </a>
        );

      default:
        return <div>Unsupported element type</div>;
    }
  };

  return (
    <div className="w-full h-full">
      {renderElement()}
      {showUploadDialog && (
        <ImageUploadDialog
          onUpload={(url) => {
            onUpdate({ ...element, content: url });
            setShowUploadDialog(false);
          }}
          onClose={() => setShowUploadDialog(false)}
        />
      )}
      {showLinkDialog && (
        <LinkDialog
          onSubmit={(link) => {
            onUpdate({ ...element, content: link });
            setShowLinkDialog(false);
          }}
          onClose={() => setShowLinkDialog(false)}
          type={element.type}
        />
      )}
    </div>
  );
}

function ImageUploadDialog({ onUpload, onClose }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function LinkDialog({ onSubmit, onClose, type }) {
  const [link, setLink] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder={type === "video" ? "YouTube URL" : "Location"}
          className="px-3 py-2 border rounded"
        />
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => onSubmit(link)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default ElementRenderer;
