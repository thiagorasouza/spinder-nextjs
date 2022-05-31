import { useEffect, useRef } from "react";

function useUpdateEffect(callback, watchlist) {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      callback();
    }
  }, watchlist);
}

export default useUpdateEffect;
