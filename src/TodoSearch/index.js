import React from "react";
import "./TodoSearch.css";

function TodoSearch({ searchValue, setSearchValue }) {
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
