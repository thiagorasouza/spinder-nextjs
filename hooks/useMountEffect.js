import { useEffect } from "react";

function useMountEffect(callback) {
  useEffect(() => {
    callback();
  }, []);
}

export default useMountEffect;
