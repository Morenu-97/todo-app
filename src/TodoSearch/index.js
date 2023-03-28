import React from "react";
import { TodoContext } from "../TodoContext";
import "./TodoSearch.css";

function TodoSearch() {
  const { searchValue, setSearchValue } = React.useContext(TodoContext);
  const onSearchValueChange = (event) => {
    console.log(event.target.value); // muestra los valores buscados
    setSearchValue(event.target.value);
  };

  return (
    <input
      className="TodoSearch"
      placeholder="Cebolla"
      value={searchValue} // el valor del input es igual al valor guardado en el estado
      onChange={onSearchValueChange} //metodo//propiedad
    />
  );
}

export { TodoSearch };
