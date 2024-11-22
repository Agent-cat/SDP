import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import EditorCanvas from "./components/Editor/EditorCanvas";
import Sidebar from "./components/Sidebar/Sidebar";
import ProjectManager from "./components/ProjectManager/ProjectManager";
import LayersPanel from "./components/Editor/LayersPanel";
import ExportPanel from "./components/Editor/ExportPanel";
import { DragDropContext } from "@hello-pangea/dnd";
import LayersButton from "./components/Editor/LayersButton";

function App() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showLayers, setShowLayers] = useState(false);

  const handleElementsUpdate = (updatedElements) => {
    setElements(updatedElements);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    if (
      result.source.droppableId === "sidebar" &&
      result.destination.droppableId === "canvas"
    ) {
      const defaultStyles = {
        input: {
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #e2e8f0",
          width: "100%",
        },
        checkbox: {
          width: "16px",
          height: "16px",
        },
        radio: {
          width: "16px",
          height: "16px",
        },
      };

      const draggedElement = {
        id: `${result.draggableId}_${Date.now()}`,
        type: result.draggableId,
        content: "",
        label: `${
          result.draggableId.charAt(0).toUpperCase() +
          result.draggableId.slice(1)
        } Label`,
        x: 0,
        y: 0,
        width: 200,
        height: result.draggableId === "input" ? 80 : 40,
        styles: defaultStyles[result.draggableId] || {},
      };

      const newElements = [...elements, draggedElement];
      handleElementsUpdate(newElements);
    }
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 flex flex-col">
              <div className="flex justify-between items-center p-4 bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <ProjectManager
                    elements={elements}
                    onLoad={handleElementsUpdate}
                  />
                  <LayersButton
                    onClick={() => setShowLayers(!showLayers)}
                    isActive={showLayers}
                  />
                </div>
                <ExportPanel elements={elements} />
              </div>
              <div className="flex-1 relative">
                <EditorCanvas
                  initialElements={elements}
                  onElementsUpdate={handleElementsUpdate}
                  onSelectElement={setSelectedElement}
                />
                <LayersPanel
                  elements={elements}
                  onUpdate={handleElementsUpdate}
                  onSelectElement={setSelectedElement}
                  isVisible={showLayers && !selectedElement}
                />
              </div>
            </main>
          </div>
        </DragDropContext>
      </div>
    </BrowserRouter>
  );
}

export default App;
