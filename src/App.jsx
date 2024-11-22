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
      const draggedElement = {
        id: `${result.draggableId}_${Date.now()}`,
        type: result.draggableId,
        content: "",
        x: 0,
        y: 0,
        width: 200,
        height: 100,
        styles: {},
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
