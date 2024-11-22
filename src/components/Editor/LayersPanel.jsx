import {
  FaLayerGroup,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";

function LayersPanel({ elements, onUpdate }) {
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

  const handleGroupCreate = (selectedIds) => {
    const groupId = `group_${Date.now()}`;
    const groupedElements = elements.map((el) =>
      selectedIds.includes(el.id) ? { ...el, groupId } : el
    );
    onUpdate(groupedElements);
  };

  return (
    <div className="absolute right-0 top-0 w-64 bg-white h-full shadow-lg p-4">
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
              <button onClick={() => handleGroupCreate([element.id])}>
                <FaLayerGroup />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LayersPanel;
