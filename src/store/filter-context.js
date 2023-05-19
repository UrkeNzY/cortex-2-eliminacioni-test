import { createContext, useState } from "react";

const FilterContext = createContext({
  filteredValue: "",
  isSelected: "false",
  filterCategory: () => {},
  resetFilter: () => {},
});

export const FilterContextProvider = (props) => {
  const [filterValue, setFilterValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const filterCategoryHandler = (value) => {
    setFilterValue(value);
    setIsSelected(true);
  };

  const resetFilterHandler = () => {
    setFilterValue("");
    setIsSelected(false);
  };

  return (
    <FilterContext.Provider
      value={{
        filteredValue: filterValue,
        isSelected,
        filterCategory: filterCategoryHandler,
        resetFilter: resetFilterHandler,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
