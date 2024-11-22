import { useState } from "react";
import EditorCanvas from "./components/Editor/EditorCanvas";
import Sidebar from "./components/Sidebar/Sidebar";
import ProjectManager from "./components/ProjectManager/ProjectManager";
import LayersPanel from "./components/Editor/LayersPanel";
import ExportPanel from "./components/Editor/ExportPanel";
import { DragDropContext } from "@hello-pangea/dnd";

function App() {
  const [elements, setElements] = useState([]);

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
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-gray-100">
        <ProjectManager elements={elements} onLoad={handleElementsUpdate} />
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <EditorCanvas
              initialElements={elements}
              onElementsUpdate={handleElementsUpdate}
            />
            <LayersPanel elements={elements} onUpdate={handleElementsUpdate} />
          </div>
        </main>
        <ExportPanel elements={elements} />
      </div>
    </DragDropContext>
  );
}

export default App;
