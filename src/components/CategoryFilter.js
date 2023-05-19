import { useContext } from "react";

import classes from "./CategoryFilter.module.css";
import FilterContext from "../store/filter-context";

import FilterButton from "./UI/FilterButton";

const CategoryFilter = () => {
  const filterCtx = useContext(FilterContext);

  return (
    <div className={classes.filterContainer}>
      <FilterButton category="Smartphones" />
      <FilterButton category="Laptops" />
      <FilterButton category="Sunglasses" />
      <FilterButton category="Lighting" />
      <FilterButton category="Fragrances" />
      <FilterButton category="Automotive" />
      {filterCtx.isSelected && (
        <img
          onClick={filterCtx.resetFilter}
          src="images/reset-icon.svg"
          alt="reset icon"
        />
      )}
    </div>
  );
};

export default CategoryFilter;
