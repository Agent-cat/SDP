import { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import Slider from "rc-slider";
import { FaTimes, FaFont, FaRuler, FaPalette, FaEdit } from "react-icons/fa";
import "rc-slider/assets/index.css";

function StyleEditor({ element, onUpdate, onClose }) {
  const [styles, setStyles] = useState({
    color: "#000000",
    backgroundColor: "#ffffff",
    fontSize: 16,
    padding: 0,
    margin: 0,
    borderRadius: 0,
    opacity: 100,
    border: "none",
    borderColor: "#000000",
    borderWidth: 0,
  });
  const [content, setContent] = useState(element?.content || "");

  useEffect(() => {
    if (element) {
      setStyles((prev) => ({
        ...prev,
        ...element.styles,
      }));
      setContent(element.content || "");
    }
  }, [element]);

  const handleStyleChange = (property, value) => {
    const updatedStyles = { ...styles, [property]: value };
    setStyles(updatedStyles);
    onUpdate({ styles: updatedStyles });
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    onUpdate({ content: newContent });
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-lg p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Style Editor - {element.type}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>

      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
            <FaEdit /> Content
          </h3>
          <div>
            <label className="block text-sm font-medium mb-2">
              Text Content
            </label>
            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md resize-y"
              rows={3}
            />
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
            <FaPalette /> Colors
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Text Color
              </label>
              <SketchPicker
                color={styles.color}
                onChange={(color) => handleStyleChange("color", color.hex)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Background
              </label>
              <SketchPicker
                color={styles.backgroundColor}
                onChange={(color) =>
                  handleStyleChange("backgroundColor", color.hex)
                }
              />
            </div>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
            <FaFont /> Font
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Font Size
              </label>
              <Slider
                min={8}
                max={72}
                value={styles.fontSize}
                onChange={(value) => handleStyleChange("fontSize", value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Padding</label>
              <Slider
                min={0}
                max={100}
                value={styles.padding}
                onChange={(value) => handleStyleChange("padding", value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Margin</label>
              <Slider
                min={0}
                max={100}
                value={styles.margin}
                onChange={(value) => handleStyleChange("margin", value)}
              />
            </div>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
            <FaRuler /> Border
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Border Radius
              </label>
              <Slider
                min={0}
                max={50}
                value={styles.borderRadius}
                onChange={(value) => handleStyleChange("borderRadius", value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Border Width
              </label>
              <Slider
                min={0}
                max={10}
                value={styles.borderWidth}
                onChange={(value) => handleStyleChange("borderWidth", value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Border Color
              </label>
              <SketchPicker
                color={styles.borderColor}
                onChange={(color) =>
                  handleStyleChange("borderColor", color.hex)
                }
              />
            </div>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
            <FaPalette /> Background
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Opacity</label>
              <Slider
                min={0}
                max={100}
                value={styles.opacity}
                onChange={(value) => handleStyleChange("opacity", value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StyleEditor;
