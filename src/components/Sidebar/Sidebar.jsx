import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  FaHeading,
  FaImage,
  FaParagraph,
  FaRegSquare,
  FaList,
  FaLink,
  FaYoutube,
  FaTable,
  FaColumns,
  FaMapMarker,
  FaCode,
  FaQuoteLeft,
} from "react-icons/fa";
import {
  MdSmartButton,
  MdInput,
  MdCheckBox,
  MdRadioButtonChecked,
} from "react-icons/md";

const elementCategories = [
  {
    title: "Basic",
    items: [
      { id: "heading", icon: <FaHeading />, label: "Heading", type: "heading" },
      {
        id: "paragraph",
        icon: <FaParagraph />,
        label: "Paragraph",
        type: "paragraph",
      },
      {
        id: "button",
        icon: <MdSmartButton />,
        label: "Button",
        type: "button",
      },
      { id: "image", icon: <FaImage />, label: "Image", type: "image" },
      { id: "link", icon: <FaLink />, label: "Link", type: "link" },
    ],
  },
  {
    title: "Form",
    items: [
      { id: "input", icon: <MdInput />, label: "Input", type: "input" },
      {
        id: "checkbox",
        icon: <MdCheckBox />,
        label: "Checkbox",
        type: "checkbox",
      },
      {
        id: "radio",
        icon: <MdRadioButtonChecked />,
        label: "Radio",
        type: "radio",
      },
    ],
  },
  {
    title: "Layout",
    items: [
      {
        id: "container",
        icon: <FaRegSquare />,
        label: "Container",
        type: "container",
      },
      { id: "columns", icon: <FaColumns />, label: "Columns", type: "columns" },
      { id: "table", icon: <FaTable />, label: "Table", type: "table" },
    ],
  },
  {
    title: "Media",
    items: [
      { id: "video", icon: <FaYoutube />, label: "Video", type: "video" },
      { id: "map", icon: <FaMapMarker />, label: "Map", type: "map" },
      { id: "code", icon: <FaCode />, label: "Code", type: "code" },
      { id: "quote", icon: <FaQuoteLeft />, label: "Quote", type: "quote" },
    ],
  },
];

function Sidebar() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4">
        <h2 className="text-lg font-semibold mb-4">Elements</h2>
        <Droppable droppableId="sidebar">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {elementCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="text-md font-semibold mb-2">
                    {category.title}
                  </h3>
                  {category.items.map((element, index) => (
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
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-move transition-colors"
                        >
                          <span className="mr-3 text-lg">{element.icon}</span>
                          <span className="font-medium">{element.label}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default Sidebar;
