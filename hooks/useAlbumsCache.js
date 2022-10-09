import { getFromLocal, saveToLocal } from "../lib/web-storage";

import { useState } from "react";
import useUpdateEffect from "./useUpdateEffect";

function useAlbumsCache() {
  const [data, setData] = useState(() => {
    const savedData = getFromLocal("albums");
    if (isDataValid(savedData)) {
      return savedData;
    } else {
      return { list: [], index: 0 };
    }
  });

  useUpdateEffect(() => {
    saveToLocal("albums", data);
  }, [data]);

  function isDataValid(data) {
    if (!data || typeof data !== "object") return;

    const { list, index } = data;

    const hasList = list && Array.isArray(list);
    const hasIndex = index && Number.isInteger(index);

    return hasList && hasIndex && index < list.length;
  }

  function setAlbums(list, index) {
    console.log("Max Index:", list.length);
    console.log("Index:", index);
    setData({ list, index });
  }

  return [data.list, data.index, setAlbums];
}

export default useAlbumsCache;
