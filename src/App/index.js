import React from "react";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   { text: "Cortar cebolla", completed: true },
//   { text: "Tomar el cursso de intro a React", completed: true },
//   { text: "Llorar con la llorona", completed: false },
//   { text: "Dormir", completed: false },
// ];

// Recibimos como parámetros el nombre y el estado inicial de nuestro item:
function useLocalStorage(itemName, initialValue) {
  // Guardamos nuestro item en una constante
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  //(!) revisa si no hay nada en localSrorageItem:
  if (!localStorageItem) {
    //si no hay nada, setea itemName con initialValue (arreglo vacio linea 37)
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    //pardedItem = []
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItem); // se crea un estado guardago en la variable item, con el set se puede actualizar la funcion

  const saveItem = (newItem) => {
    const stringfiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringfiedItem);
    //modifica el estado (newItem(linea 59 o 70)Todos completados o eliminados):
    setItem(newItem);
  };
  return [item, saveItem];
}

function App() {
  const [todos, saveTodos] = useLocalStorage("TODOS_V1", []);

  const [searchValue, setSearchValue] = React.useState("");

  const completedTodos = todos.filter((todo) => !!todo.completed).length; //filtrar si cada todo tiene la propiedad todo.completed como true
  const totalTodos = todos.length;

  //se filtran los todos para que aparezcan o no, dependiendo lo que escriban en el componente TodoSearch:
  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      //se llama a cada todo, y por cada uno se convierte el texto en minuscula para analizarlo
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText); // se filtra cual de los todos incluye el texto escrito en el input de busqueda
    });
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text); // por cada todo analizado ver si es igual a text (se recibe en la funcion)
    const newTodos = [...todos]; //crea nueva lista de todos
    newTodos[todoIndex] = {
      text: todos[todoIndex].text,
      completed: true, //marcar el todo que cumple con lo anterior con la propiedad true
    };
    //todos[todoIndex].completed = true; (forma corta de lo anterior)
    saveTodos(newTodos); //actualiza el estado para reenderizar
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    {
      newTodos.splice(todoIndex, 1); //este metodo agarra la funcion o posicion y elimina la cantidad que se le diga
    }
    saveTodos(newTodos);
  };

  // hook para ejecutar el codigo que este por dentro justo antes de reenderizar el componente
  // React.useEffect(() =>  {

  // }, [])

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}
export default App;
