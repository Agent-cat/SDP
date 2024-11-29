import { useState, useEffect } from "react";
import {
  FaTimes,
  FaPalette,
  FaFont,
  FaRuler,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaImage,
  FaYoutube,
  FaLink,
} from "react-icons/fa";
import ImageUploader from "./ImageUploader";

function StyleEditor({ element, onUpdate, onClose }) {
  const [localContent, setLocalContent] = useState(element.content || "");
  const [localStyles, setLocalStyles] = useState(element.styles || {});

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    onUpdate({
      ...element,
      content: newContent,
      styles: localStyles,
    });
  };

  const handleStyleChange = (property, value) => {
    const updatedStyles = {
      ...localStyles,
      [property]: value,
    };
    setLocalStyles(updatedStyles);
    onUpdate({
      ...element,
      content: localContent,
      styles: updatedStyles,
    });
  };

  useEffect(() => {
    setLocalContent(element.content || "");
    setLocalStyles(element.styles || {});
  }, [element.id]);

  const renderElementSpecificControls = () => {
    switch (element.type) {
      case "checkbox":
      case "radio":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Label</label>
              <input
                type="text"
                value={localContent}
                onChange={handleContentChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={element.checked || false}
                onChange={(e) =>
                  onUpdate({ ...element, checked: e.target.checked })
                }
              />
              <label className="text-sm text-gray-600">Default Checked</label>
            </div>
          </div>
        );

      case "select":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Options
              </label>
              {element.options?.map((option, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => {
                      const newOptions = [...(element.options || [])];
                      newOptions[index] = { ...option, label: e.target.value };
                      onUpdate({ ...element, options: newOptions });
                    }}
                    className="flex-1 px-3 py-2 border rounded"
                    placeholder="Option label"
                  />
                  <button
                    onClick={() => {
                      const newOptions = element.options?.filter(
                        (_, i) => i !== index
                      );
                      onUpdate({ ...element, options: newOptions });
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newOptions = [
                    ...(element.options || []),
                    { label: "", value: "" },
                  ];
                  onUpdate({ ...element, options: newOptions });
                }}
                className="w-full px-3 py-2 border rounded bg-gray-50 hover:bg-gray-100"
              >
                Add Option
              </button>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <ImageUploader
              currentSrc={element.src}
              onImageSelect={(src) => onUpdate({ ...element, src })}
            />
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Alt Text
              </label>
              <input
                type="text"
                value={element.alt || ""}
                onChange={(e) => onUpdate({ ...element, alt: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter alt text"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Object Fit
              </label>
              <select
                value={localStyles.objectFit || "cover"}
                onChange={(e) => handleStyleChange("objectFit", e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
                <option value="fill">Fill</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        );

      case "youtube":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                YouTube URL
              </label>
              <input
                type="text"
                value={element.videoUrl || ""}
                onChange={(e) => {
                  const videoId = extractYouTubeId(e.target.value);
                  onUpdate({ ...element, videoId, videoUrl: e.target.value });
                }}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter YouTube URL"
              />
            </div>
          </div>
        );

      case "link":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Link URL
              </label>
              <input
                type="text"
                value={element.href || ""}
                onChange={(e) => onUpdate({ ...element, href: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter link URL"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Style Editor</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <FaTimes />
        </button>
      </div>

      <div className="space-y-6">
        {/* Content Section */}
        <section className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Content</h4>
          <textarea
            value={localContent}
            onChange={handleContentChange}
            className="w-full px-3 py-2 border rounded min-h-[60px]"
            placeholder="Enter text"
          />
        </section>

        {/* Typography Section */}
        <section className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Typography</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Font Size
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="8"
                  max="72"
                  value={parseInt(localStyles?.fontSize) || 16}
                  onChange={(e) =>
                    handleStyleChange("fontSize", `${e.target.value}px`)
                  }
                  className="flex-1"
                />
                <input
                  type="number"
                  value={parseInt(localStyles?.fontSize) || 16}
                  onChange={(e) =>
                    handleStyleChange("fontSize", `${e.target.value}px`)
                  }
                  className="w-20 px-2 py-1 border rounded text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Text Alignment
              </label>
              <div className="flex gap-2">
                {[
                  { icon: <FaAlignLeft />, value: "left" },
                  { icon: <FaAlignCenter />, value: "center" },
                  { icon: <FaAlignRight />, value: "right" },
                  { icon: <FaAlignJustify />, value: "justify" },
                ].map(({ icon, value }) => (
                  <button
                    key={value}
                    onClick={() => handleStyleChange("textAlign", value)}
                    className={`flex-1 p-2 rounded ${
                      localStyles?.textAlign === value
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Colors</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={localStyles.color || "#000000"}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="w-10 h-10 p-1 border rounded"
                />
                <input
                  type="text"
                  value={localStyles.color || "#000000"}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={localStyles.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    handleStyleChange("backgroundColor", e.target.value)
                  }
                  className="w-10 h-10 p-1 border rounded"
                />
                <input
                  type="text"
                  value={localStyles.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    handleStyleChange("backgroundColor", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Element Specific Controls */}
        {renderElementSpecificControls()}
      </div>
    </div>
  );
}

export default StyleEditor;
