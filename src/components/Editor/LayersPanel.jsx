import {
  FaLayerGroup,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaLockOpen,
  FaPencilAlt,
} from "react-icons/fa";

function LayersPanel({ elements, onUpdate, onSelectElement, isVisible }) {
  if (!isVisible) return null;

  const handleVisibilityToggle = (id) => {
    onUpdate(
      elements.map((el) => (el.id === id ? { ...el, hidden: !el.hidden } : el))
    );
  };

  const handleLockToggle = (id) => {
    onUpdate(
      elements.map((el) => (el.id === id ? { ...el, locked: !el.locked } : el))
    );
  };

  return (
    <div className="fixed right-0 top-0 w-full md:w-80 lg:w-64 h-full bg-white shadow-lg p-4 overflow-y-auto z-40">
      <h3 className="text-lg font-bold mb-4">Layers</h3>
      <div className="space-y-2">
        {elements.map((element) => (
          <div
            key={element.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100"
          >
            <span>{element.type}</span>
            <div className="flex gap-2">
              <button onClick={() => handleVisibilityToggle(element.id)}>
                {element.hidden ? <FaEyeSlash /> : <FaEye />}
              </button>
              <button onClick={() => handleLockToggle(element.id)}>
                {element.locked ? <FaLock /> : <FaLockOpen />}
              </button>
              <button onClick={() => onSelectElement(element)}>
                <FaPencilAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LayersPanel;
