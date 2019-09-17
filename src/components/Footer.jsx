import React from "react";
import Filters from "./Filters";

const Footer = props => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.countItemValue()}</strong>
        <span> </span>
        <span>item</span>
        <span> left</span>
      </span>
      <Filters filter={props.filter} setFilter={props.setFilter} />
      {props.tasks.length - props.countItemValue() > 0 ? (
        <button className="clear-completed" onClick={props.ClearCompliteTask}>
          Clear completed
        </button>
      ) : null}
    </footer>
  );
};
export default Footer;
