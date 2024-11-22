import { useState, useEffect } from "react";
import { FaTimes, FaPalette, FaFont, FaRuler } from "react-icons/fa";

function StylePanel({ element, onUpdate, onClose }) {
  const [styles, setStyles] = useState(element?.styles || {});

  const updateStyles = (newStyles) => {
    const updatedStyles = { ...styles, ...newStyles };
    setStyles(updatedStyles);
    onUpdate(updatedStyles);
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-64 bg-white shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Style Editor</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>

      <div className="space-y-4">
        {/* Typography */}
        <div className="border-b pb-4">
          <h4 className="flex items-center gap-2 mb-2">
            <FaFont /> Typography
          </h4>
          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Font Size</label>
              <input
                type="number"
                value={parseInt(styles.fontSize) || 16}
                onChange={(e) =>
                  updateStyles({ fontSize: `${e.target.value}px` })
                }
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Color</label>
              <input
                type="color"
                value={styles.color || "#000000"}
                onChange={(e) => updateStyles({ color: e.target.value })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="border-b pb-4">
          <h4 className="flex items-center gap-2 mb-2">
            <FaRuler /> Spacing
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm mb-1">Padding</label>
              <input
                type="number"
                value={parseInt(styles.padding) || 0}
                onChange={(e) =>
                  updateStyles({ padding: `${e.target.value}px` })
                }
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Margin</label>
              <input
                type="number"
                value={parseInt(styles.margin) || 0}
                onChange={(e) =>
                  updateStyles({ margin: `${e.target.value}px` })
                }
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StylePanel;
