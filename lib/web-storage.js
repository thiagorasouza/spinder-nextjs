export function saveToLocal(key, obj) {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(obj));
}

export function getFromLocal(key) {
  if (typeof window === "undefined") return;

  const value = localStorage.getItem(key);

  const noData = ["undefined", "null", "[]", "{}", ""];

  if (noData.includes(value)) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

export function isCached(key) {
  return localStorage.getItem(key) !== null;
}
