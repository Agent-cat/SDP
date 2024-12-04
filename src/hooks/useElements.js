import { useState, useCallback } from "react";

export function useElements(initialElements = []) {
  const [elements, setElements] = useState(initialElements);
  const [selectedElement, setSelectedElement] = useState(null);

  const updateElement = useCallback((elementId, updates) => {
    setElements((prevElements) => {
      const newElements = prevElements.map((el) =>
        el.id === elementId ? { ...el, ...updates } : el
      );
      return newElements;
    });

    // Update selected element if it's the one being modified
    setSelectedElement((prev) =>
      prev?.id === elementId ? { ...prev, ...updates } : prev
    );
  }, []);

  const addElement = useCallback((element) => {
    setElements((prev) => [...prev, element]);
  }, []);

  const removeElement = useCallback((elementId) => {
    setElements((prev) => prev.filter((el) => el.id !== elementId));
  }, []);

  return {
    elements,
    selectedElement,
    setSelectedElement,
    updateElement,
    addElement,
    removeElement,
  };
}
