import React from "react";

// Recibimos como parámetros el nombre y el estado inicial de nuestro item:
function useLocalStorage(itemName, initialValue) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue); // se crea un estado guardago en la variable item, con el set se puede actualizar la funcion

  React.useEffect(() => {
    setTimeout(() => {
      try {
        // Guardamos nuestro item en una constante
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        //(!) revisa si no hay nada en localSrorageItem:
        if (!localStorageItem) {
          //si no hay nada, setea itemName con initialValue (arreglo vacio)
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          //pardedItem = []
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
  });

  const saveItem = (newItem) => {
    try {
      const stringfiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringfiedItem);
      //modifica el estado (newItem(linea 59 o 70)Todos completados o eliminados):
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };
  return { item, saveItem, loading, error };
}

export { useLocalStorage };
