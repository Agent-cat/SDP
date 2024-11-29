import { memo, useCallback, useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Rnd } from "react-rnd";
import ElementRenderer from "./ElementRenderer";

const EditorCanvas = memo(({ elements, onElementsUpdate, onSelectElement }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStop = useCallback(
    (id, position) => {
      const updatedElements = elements.map((el) =>
        el.id === id ? { ...el, x: position.x, y: position.y } : el
      );
      onElementsUpdate(updatedElements);
    },
    [elements, onElementsUpdate]
  );

  const handleResize = useCallback(
    (id, size) => {
      const updatedElements = elements.map((el) =>
        el.id === id ? { ...el, width: size.width, height: size.height } : el
      );
      onElementsUpdate(updatedElements);
    },
    [elements, onElementsUpdate]
  );

  const handleElementUpdate = useCallback(
    (updatedElement) => {
      const updatedElements = elements.map((el) =>
        el.id === updatedElement.id ? { ...el, ...updatedElement } : el
      );
      onElementsUpdate(updatedElements);
    },
    [elements, onElementsUpdate]
  );

  return (
    <Droppable droppableId="canvas">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`relative w-full h-full min-h-screen p-8 transition-colors ${
            snapshot.isDraggingOver ? "bg-blue-50" : "bg-gray-50"
          }`}
        >
          {elements.map((element) => (
            <Rnd
              key={element.id}
              default={{
                x: element.x,
                y: element.y,
                width: element.width,
                height: element.height,
              }}
              minWidth={100}
              minHeight={40}
              bounds="parent"
              onDragStop={(e, d) => handleDragStop(element.id, d)}
              onResize={(e, direction, ref, delta, position) =>
                handleResize(element.id, {
                  width: ref.offsetWidth,
                  height: ref.offsetHeight,
                })
              }
              onClick={() => onSelectElement(element)}
              className={`${element.locked ? "pointer-events-none" : ""} ${
                element.hidden ? "opacity-50" : ""
              }`}
            >
              <ElementRenderer
                element={element}
                onUpdate={handleElementUpdate}
              />
            </Rnd>
          ))}
          {provided.placeholder}

          {/* Drop indicator */}
          {snapshot.isDraggingOver && (
            <div className="absolute inset-0 border-2 border-blue-400 border-dashed pointer-events-none" />
          )}
        </div>
      )}
    </Droppable>
  );
});

export default EditorCanvas;
