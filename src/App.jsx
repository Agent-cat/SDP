import { BrowserRouter } from "react-router-dom";
import { useElements } from "./hooks/useElements";
import { useCallback, useState } from "react";
import EditorCanvas from "./components/Editor/EditorCanvas";
import Sidebar from "./components/Sidebar/Sidebar";
import MainLayout from "./components/Layout/MainLayout";
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
  const [deviceWidth, setDeviceWidth] = useState("100%");

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const { source, destination, draggableId } = result;

      if (
        source.droppableId === "sidebar" &&
        destination.droppableId === "canvas"
      ) {
        const newElement = {
          id: `${draggableId}_${destination.x || 0}_${destination.y || 0}`,
          type: draggableId,
          content: "",
          x: destination.x || 0,
          y: destination.y || 0,
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
              selectedElement={selectedElement}
              onDeleteElement={removeElement}
              onDeviceChange={setDeviceWidth}
            />
          }
          content={
            <EditorCanvas
              elements={elements}
              onElementsUpdate={updateElement}
              onSelectElement={setSelectedElement}
              deviceWidth={deviceWidth}
            />
          }
        />
        {selectedElement && (
          <StyleEditor
            element={selectedElement}
            onUpdate={(updates) => updateElement(selectedElement.id, updates)}
            onClose={() => setSelectedElement(null)}
          />
        )}
      </DragDropContext>
    </BrowserRouter>
  );
}

export default App;
