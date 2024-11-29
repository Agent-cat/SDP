import { BrowserRouter } from "react-router-dom";
import { useElements } from "./hooks/useElements";
import { useCallback, useState } from "react";
import EditorCanvas from "./components/Editor/EditorCanvas";
import Sidebar from "./components/Sidebar/Sidebar";
import MainLayout from "./components/Layout/MainLayout";
import LayersPanel from "./components/Editor/LayersPanel";
import ExportPanel from "./components/Editor/ExportPanel";
import { DragDropContext } from "@hello-pangea/dnd";
import Navbar from "./components/Navbar/Navbar";
import StyleEditor from "./components/Editor/StyleEditor";

function App() {
  const {
    elements,
    selectedElement,
    setSelectedElement,
    updateElement,
    addElement,
    removeElement,
  } = useElements([]);

  const [showLayers, setShowLayers] = useState(false);

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const { source, destination, draggableId } = result;

      // Handle dropping from sidebar to canvas
      if (
        source.droppableId === "sidebar" &&
        destination.droppableId === "canvas"
      ) {
        const dropPoint = {
          x: destination.x || 0,
          y: destination.y || 0,
        };

        const newElement = {
          id: `${draggableId}_${Date.now()}`,
          type: draggableId,
          content: "",
          x: dropPoint.x,
          y: dropPoint.y,
          width: 200,
          height: 40,
          styles: {},
          locked: false,
          hidden: false,
        };

        addElement(newElement);
      }
    },
    [addElement]
  );

  const handleElementUpdate = (elementId, updates) => {
    updateElement(elementId, {
      ...updates,
      id: elementId,
      x:
        updates.x !== undefined
          ? updates.x
          : elements.find((el) => el.id === elementId)?.x,
      y:
        updates.y !== undefined
          ? updates.y
          : elements.find((el) => el.id === elementId)?.y,
      width:
        updates.width !== undefined
          ? updates.width
          : elements.find((el) => el.id === elementId)?.width,
      height:
        updates.height !== undefined
          ? updates.height
          : elements.find((el) => el.id === elementId)?.height,
    });
  };

  return (
    <BrowserRouter>
      <DragDropContext onDragEnd={handleDragEnd}>
        <MainLayout
          sidebar={<Sidebar />}
          navbar={
            <Navbar
              elements={elements}
              onElementsUpdate={updateElement}
              showLayers={showLayers}
              setShowLayers={setShowLayers}
            />
          }
          content={
            <EditorCanvas
              elements={elements}
              onElementsUpdate={updateElement}
              onSelectElement={setSelectedElement}
            />
          }
        />
        {selectedElement && (
          <StyleEditor
            element={selectedElement}
            onUpdate={(updates) =>
              handleElementUpdate(selectedElement.id, updates)
            }
            onClose={() => setSelectedElement(null)}
          />
        )}
      </DragDropContext>
    </BrowserRouter>
  );
}

export default App;
