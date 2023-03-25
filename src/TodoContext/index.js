import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  //todos es lo que hay en 'TODOS_V1'
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

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

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
