import { useState, useEffect, useRef } from "react";

function ContentEditor({ element, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(element.content);
  const editorRef = useRef(null);

  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (content !== element.content) {
      onUpdate({ ...element, content });
    }
  };

  if (!isEditing) {
    return (
      <div onDoubleClick={handleDoubleClick}>
        {element.content || "Double click to edit"}
      </div>
    );
  }

  return (
    <textarea
      ref={editorRef}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      onBlur={handleBlur}
      className="w-full h-full p-2 border border-blue-500 rounded"
      autoFocus
    />
  );
}

export default ContentEditor;
