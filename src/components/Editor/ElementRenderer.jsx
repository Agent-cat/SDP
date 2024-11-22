import ContentEditor from "./ContentEditor";

function ElementRenderer({ element, onUpdate }) {
  const renderElement = () => {
    const commonProps = {
      style: element.styles,
      className:
        element.type === "heading" ? "text-2xl font-bold" : "text-base",
    };

    switch (element.type) {
      case "heading":
      case "paragraph":
        return (
          <ContentEditor
            element={element}
            onUpdate={onUpdate}
            {...commonProps}
          />
        );

      case "image":
        return (
          <img
            src={element.content || "https://via.placeholder.com/150"}
            alt={element.alt || "Image"}
            {...commonProps}
          />
        );

      case "button":
        return (
          <button {...commonProps}>
            <ContentEditor element={element} onUpdate={onUpdate} />
          </button>
        );

      case "container":
        return (
          <div {...commonProps}>
            <ContentEditor element={element} onUpdate={onUpdate} />
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="element-wrapper">{renderElement()}</div>;
}

export default ElementRenderer;
