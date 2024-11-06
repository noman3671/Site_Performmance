 export const setItemInStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromStorage = (key) => {
  const storedItem = localStorage.getItem(key);
  return storedItem ? JSON.parse(storedItem) : null;
};


export const removeItemFromStorage = (key) => {
  localStorage.removeItem(key);
};