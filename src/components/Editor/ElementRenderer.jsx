import React from "react";

function ElementRenderer({ element }) {
  const { type, content, styles = {} } = element;

  const elementStyles = {
    ...styles,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: styles.padding || "8px",
    borderRadius: styles.borderRadius || "0px",
    backgroundColor: styles.backgroundColor || "#ffffff",
    color: styles.color || "#000000",
    fontSize: styles.fontSize ? `${styles.fontSize}px` : "16px",
    border: styles.borderWidth
      ? `${styles.borderWidth}px solid ${styles.borderColor}`
      : "none",
  };

  switch (type) {
    case "text":
      return <div style={elementStyles}>{content || "Text"}</div>;
    case "button":
      return <button style={elementStyles}>{content || "Button"}</button>;
    case "input":
      return (
        <input
          type="text"
          style={elementStyles}
          placeholder={content || "Input"}
        />
      );
    case "image":
      return (
        <div style={elementStyles}>
          {content ? (
            <img
              src={content}
              alt="element"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            "Image"
          )}
        </div>
      );
    default:
      return <div style={elementStyles}>{content || type}</div>;
  }
}

export default ElementRenderer;
