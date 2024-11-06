import { useEffect } from "react";

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        handler(event);
      };
      document.addEventListener("click", listener);
      return () => {
        document.removeEventListener("click", listener);
      };
    },
   
    [ref, handler]
  );
}

export default useOnClickOutside;