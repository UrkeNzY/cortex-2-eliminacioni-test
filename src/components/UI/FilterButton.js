import { useContext } from "react";

import classes from "./FilterButton.module.css";

import FilterContext from "../../store/filter-context";

const FilterButton = (props) => {
  const filterCtx = useContext(FilterContext);

  const filterCategory = () => {
    const category = props.category.toLowerCase();
    filterCtx.filterCategory(category);
  };

  return (
    <button onClick={filterCategory} className={classes.filterButton}>
      {props.category}
    </button>
  );
};

export default FilterButton;
