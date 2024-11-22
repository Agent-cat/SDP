import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  FaHeading,
  FaImage,
  FaSquare,
  FaParagraph,
  FaRegSquare,
} from "react-icons/fa";
import { MdSmartButton } from "react-icons/md";

const elements = [
  { id: "heading", icon: <FaHeading />, label: "Heading", type: "heading" },
  {
    id: "paragraph",
    icon: <FaParagraph />,
    label: "Paragraph",
    type: "paragraph",
  },
  { id: "image", icon: <FaImage />, label: "Image", type: "image" },
  { id: "button", icon: <MdSmartButton />, label: "Button", type: "button" },
  {
    id: "container",
    icon: <FaRegSquare />,
    label: "Container",
    type: "container",
  },
];

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Elements</h2>
      <Droppable droppableId="sidebar">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {elements.map((element, index) => (
              <Draggable
                key={element.id}
                draggableId={element.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-move"
                  >
                    <span className="mr-2">{element.icon}</span>
                    <span>{element.label}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Sidebar;
