import { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import Slider from "rc-slider";
import {
  FaTimes,
  FaFont,
  FaRuler,
  FaPalette,
  FaEdit,
  FaCog,
} from "react-icons/fa";
import "rc-slider/assets/index.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function StyleEditor({ element, onUpdate, onClose }) {
  const [styles, setStyles] = useState(element?.styles || {});
  const [content, setContent] = useState(element?.content || "");

  useEffect(() => {
    if (element) {
      setStyles(element.styles || {});
      setContent(element.content || "");
    }
  }, [element]);

  const handleStyleChange = (property, value) => {
    const updatedStyles = { ...styles, [property]: value };
    setStyles(updatedStyles);
    onUpdate({
      ...element,
      styles: updatedStyles,
    });
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    onUpdate({
      ...element,
      content: newContent,
    });
  };

  useGSAP(() => {
    gsap.from(".style-editor", {
      x: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  const renderInputControls = () => {
    if (["input", "checkbox", "radio"].includes(element.type)) {
      return (
        <div className="border-b pb-4">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
            <FaCog /> Input Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Label Text
              </label>
              <input
                type="text"
                value={element.label || ""}
                onChange={(e) =>
                  onUpdate({ ...element, label: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter label text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {element.type === "input" ? "Placeholder" : "Label Content"}
              </label>
              <input
                type="text"
                value={element.content || ""}
                onChange={(e) =>
                  onUpdate({ ...element, content: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder={
                  element.type === "input" ? "Enter placeholder" : "Enter label"
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Input Style
              </label>
              <select
                value={element.inputStyle || "default"}
                onChange={(e) =>
                  onUpdate({ ...element, inputStyle: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="default">Default</option>
                <option value="outlined">Outlined</option>
                <option value="filled">Filled</option>
              </select>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderContentControls = () => {
    switch (element.type) {
      case "heading":
        return (
          <div className="border-b pb-4">
            <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
              <FaEdit /> Heading Content
            </h3>
            <div>
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-md resize-y"
                placeholder="Enter heading text"
                rows={2}
              />
            </div>
          </div>
        );

      case "paragraph":
        return (
          <div className="border-b pb-4">
            <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
              <FaEdit /> Paragraph Content
            </h3>
            <div>
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-md resize-y"
                placeholder="Enter paragraph text"
                rows={4}
              />
            </div>
          </div>
        );

      case "button":
        return (
          <div className="border-b pb-4">
            <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
              <FaEdit /> Button Text
            </h3>
            <div>
              <input
                type="text"
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter button text"
              />
            </div>
          </div>
        );

      case "image":
        return (
          <div className="border-b pb-4">
            <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
              <FaEdit /> Image Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter image URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={element.alt || ""}
                  onChange={(e) =>
                    onUpdate({ ...element, alt: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter alt text"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="style-editor fixed right-0 top-0 w-full md:w-80 lg:w-64 h-full bg-white shadow-lg p-4 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Style Editor - {element.type}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>

      <div className="space-y-6">
        {renderContentControls()}
        {renderInputControls()}

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
