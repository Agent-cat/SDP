import { useState, useEffect } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Rnd } from "react-rnd";
import { FaUndo, FaRedo } from "react-icons/fa";
import ElementRenderer from "./ElementRenderer";
import StyleEditor from "./StyleEditor";
import useHistory from "../../hooks/useHistory";

function EditorCanvas({ initialElements, onElementsUpdate, onSelectElement }) {
  const {
    state: elements,
    push: pushHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory(initialElements || []);

  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    if (initialElements) {
      pushHistory(initialElements);
    }
  }, [initialElements]);

  const handleElementUpdate = (updatedElements) => {
    pushHistory(updatedElements);
    onElementsUpdate(updatedElements);
  };

  const handleStyleUpdate = (updates) => {
    const updatedElements = elements.map((el) =>
      el.id === selectedElement.id
        ? {
            ...el,
            ...(updates.styles && { styles: updates.styles }),
            ...(updates.content && { content: updates.content }),
          }
        : el
    );
    handleElementUpdate(updatedElements);
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={() => handleElementUpdate(undo())}
          disabled={!canUndo}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
        >
          <FaUndo />
        </button>
        <button
          onClick={() => handleElementUpdate(redo())}
          disabled={!canRedo}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
        >
          <FaRedo />
        </button>
      </div>

      <Droppable droppableId="canvas">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-full p-4"
          >
            {elements.map((element) => (
              <Rnd
                key={element.id}
                default={{
                  x: element.x || 0,
                  y: element.y || 0,
                  width: element.width || 200,
                  height: element.height || 100,
                }}
                onDragStop={(e, d) => {
                  const updatedElements = elements.map((el) =>
                    el.id === element.id ? { ...el, x: d.x, y: d.y } : el
                  );
                  handleElementUpdate(updatedElements);
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  const updatedElements = elements.map((el) =>
                    el.id === element.id
                      ? {
                          ...el,
                          width: ref.style.width,
                          height: ref.style.height,
                          x: position.x,
                          y: position.y,
                        }
                      : el
                  );
                  handleElementUpdate(updatedElements);
                }}
                onClick={() => setSelectedElement(element)}
              >
                <ElementRenderer
                  element={element}
                  onUpdate={(updatedElement) => {
                    const updatedElements = elements.map((el) =>
                      el.id === element.id ? { ...el, ...updatedElement } : el
                    );
                    handleElementUpdate(updatedElements);
                  }}
                />
              </Rnd>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {selectedElement && (
        <StyleEditor
          element={selectedElement}
          onUpdate={handleStyleUpdate}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </div>
  );
}

export default EditorCanvas;
