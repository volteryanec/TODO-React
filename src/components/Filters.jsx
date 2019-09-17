import React from "react";

const Filters = props => {
  const filter = props.filter;
  const setFilter = props.setFilter;
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={() => {
            setFilter("All");
          }}
          className={filter === "All" ? "selected" : ""}
        >
          All
        </a>
      </li>
      <span> </span>
      <li>
        <a
          href="#/active"
          onClick={() => setFilter("Active")}
          className={filter === "Active" ? "selected" : ""}
        >
          Active
        </a>
      </li>
      <span> </span>
      <li>
        <a
          href="#/completed"
          onClick={() => setFilter("Completed")}
          className={filter === "Completed" ? "selected" : ""}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
export default Filters;
