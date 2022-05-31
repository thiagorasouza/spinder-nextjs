import { getFromLocal, saveToLocal } from "../lib/web-storage";

import { useState } from "react";
import useUpdateEffect from "./useUpdateEffect";

function useCache(key, initialValue, isDataValid = (x) => true) {
  const [data, setData] = useState(() => {
    const savedData = getFromLocal(key);
    // console.log(`Saved ${key}`, savedData);
    return savedData && isDataValid(savedData) ? savedData : initialValue;
  });

  useUpdateEffect(() => {
    saveToLocal(key, data);
  }, [data]);

  return [data, setData];
}

export default useCache;
