import { useState, useEffect, useRef } from "react";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";

function ContentEditor({ element, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(element.content);
  const editorRef = useRef(null);

  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (content !== element.content) {
      onUpdate({ ...element, content });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setContent(element.content);
  };

  if (!isEditing) {
    return (
      <div className="group relative p-4 rounded-lg border border-gray-200 hover:border-gray-300 bg-white">
        <div className="min-h-[2rem] whitespace-pre-wrap">
          {element.content || "Click edit to add content"}
        </div>
        <button
          onClick={handleEdit}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FaPencilAlt className="text-gray-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <textarea
        ref={editorRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-[100px] p-4 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Enter content here..."
        autoFocus
      />
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleSave}
          className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
        >
          <FaCheck />
        </button>
        <button
          onClick={handleCancel}
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

export default ContentEditor;
