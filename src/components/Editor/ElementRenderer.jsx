import { memo } from "react";
import { FaUpload, FaImage, FaYoutube, FaLink } from "react-icons/fa";

const ElementRenderer = memo(({ element, onUpdate }) => {
  const renderElement = () => {
    const styles = {
      width: "100%",
      height: "100%",
      ...element.styles,
    };

    switch (element.type) {
      case "heading":
        return <div style={styles}>{element.content || "Heading"}</div>;
      case "paragraph":
        return <div style={styles}>{element.content || "Paragraph"}</div>;
      case "input":
        return (
          <input
            type={element.inputType || "text"}
            placeholder={element.placeholder || "Enter text..."}
            style={styles}
            className="w-full outline-none border rounded"
            readOnly
          />
        );
      case "image":
        return (
          <div style={styles} className="relative group">
            {element.src ? (
              <img
                src={element.src}
                alt={element.alt || "Image"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: element.styles?.objectFit || "cover",
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
                <span className="text-gray-500">Add image URL in settings</span>
              </div>
            )}
          </div>
        );
      case "youtube":
        return (
          <div style={styles}>
            {element.videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${element.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
                <span className="text-gray-500">
                  Add YouTube URL in settings
                </span>
              </div>
            )}
          </div>
        );
      case "link":
        return (
          <a
            href={element.href}
            target="_blank"
            rel="noopener noreferrer"
            style={styles}
          >
            {element.content || "Click here"}
          </a>
        );
      case "container":
        return (
          <div style={styles} className="border border-dashed border-gray-300">
            {element.content || "Container"}
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="relative">{renderElement()}</div>;
});

export default ElementRenderer;
