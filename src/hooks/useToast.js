import { useCallback, useState } from "react";

export function useToast() {
  // we are creating state of an empty array here
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    // we are generating new ids here
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return { toasts, addToast };
}
