import React from "react";
import ListItem from "./ListItem";
const Todolist = props => {
  const filter = props.filter;
  const tasks = props.tasks;
  return (
    <ul className="todo-list">
      {tasks.map(task => {
        if ((filter === "Active") & task.completed) return false;
        if ((filter === "Completed") & !task.completed) return false;

        return (
          <ListItem
            task={task}
            key={task.id}
            changeOfTaskStatus={props.changeOfTaskStatus}
            deleteItem={props.deleteCurentTask}
            getChangeTaskText={props.getChangeTaskText}
          />
        );
      })}
    </ul>
  );
};

export default Todolist;
