import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { CreateTodoButton } from "./CreateTodoButton";

const defaultTodos = [
  { text: "Cortar cebolla", completed: true },
  { text: "Tomar el cursso de intro a React", completed: true },
  { text: "Llorar con la llorona", completed: false },
  { text: "Dormir", completed: false },
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos); // se crea un estado guardago en la variable todos, con el set se puede actualizar la funcion
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
    setTodos(newTodos); //actualiza el estado para reenderizar
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    {
      newTodos.splice(todoIndex, 1); //este metodo agarra la funcion o posicion y elimina la cantidad que se le diga
    }
    setTodos(newTodos);
  };

  return (
    <React.Fragment>
      <TodoCounter total={totalTodos} completed={completedTodos} />

      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton />
    </React.Fragment>
  );
}
export default App;
