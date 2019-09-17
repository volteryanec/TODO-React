import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Todolist from "./components/Todolist";
import Footer from "./components/Footer";
import Input from "./components/Input";

class App extends Component {
  state = {
    tasksList: [
      { id: "1", text: "synthesize", completed: true },
      { id: "2", text: "override", completed: false },
      { id: "3", text: "index", completed: true },
      { id: "4", text: "compress", completed: false },
      { id: "5", text: "compress", completed: false },
      { id: "6", text: "override", completed: true },
      { id: "7", text: "generate", completed: true }
    ],
    filter: "All"
  };

  componentDidMount() {
    let tasksList =
      JSON.parse(localStorage.getItem("tasksList")) || this.state.tasksList;
    const location = window.location.hash.slice(2);
    let filter = !location ? "all" : location;

    this.setState({ tasksList: tasksList, filter: filter });
  }

  addTodo(text) {
    let tasks = this.state.tasksList;
    let Id = this.getId(tasks);
    let newTasksList = [
      ...tasks,
      {
        id: Id,
        text: text,
        completed: false
      }
    ];

    this.updateTodos(newTasksList);
  }

  getId(array) {
    if (!array.length) return "1";
    let id;
    array.forEach(task => {
      if (task.id >= array.length) id = +task.id + 1;
    });

    return String(id);
  }

  changeOfTaskStatus(e, checked) {
    let li = e.target.parentElement.parentElement;
    let tasks = this.state.tasksList.slice();

    tasks.forEach(task => {
      if (task.id === li.id) task.completed = checked;
    });
    this.updateTodos(tasks);
  }

  deleteCurentTask(taskId) {
    let tasks = this.state.tasksList.filter(task => task.id !== taskId);
    this.updateTodos(tasks);
  }
  ClearCompliteTask() {
    let tasks = this.state.tasksList.filter(task => task.completed === false);
    this.updateTodos(tasks);
  }
  countItemValue() {
    let count = 0;
    this.state.tasksList.forEach(task => {
      if (task.completed === false) count++;
    });

    return count;
  }

  getChangeTaskText(e, val) {
    let tasks = this.state.tasksList;
    tasks.forEach(task => {
      if (task.id === e.target.parentElement.id) task.text = val;
    });

    this.updateTodos(tasks);
  }
  setFilter(filter) {
    this.setState({ filter: filter });
  }
  getToggleAllTasks() {
    let tasks = this.state.tasksList;
    let checked = this.countItemValue() === 0 ? false : true;
    tasks.forEach(task => {
      task.completed = checked;
    });

    this.updateTodos(tasks);
  }

  updateTodos(tasks) {
    this.setState({
      tasksList: tasks
    });
    localStorage.setItem("tasksList", JSON.stringify(tasks));
  }

  render() {
    const tasks = this.state.tasksList;
    const filter = this.state.filter;
    const countItemValue = this.countItemValue.bind(this);

    return (
      <div>
        <section className="todoapp">
          <Header tasks={tasks} addTodo={this.addTodo.bind(this)} />
          <section className="main">
            <Input countItemValue={countItemValue === 0 ? true : false} />
            {!this.state.tasksList.length ? null : (
              <label
                htmlFor="toggle-all"
                onClick={this.getToggleAllTasks.bind(this)}
              />
            )}

            <Todolist
              tasks={tasks}
              changeOfTaskStatus={this.changeOfTaskStatus.bind(this)}
              deleteCurentTask={this.deleteCurentTask.bind(this)}
              getChangeTaskText={this.getChangeTaskText.bind(this)}
              filter={filter}
            />
          </section>
          {!this.state.tasksList.length ? null : (
            <Footer
              tasks={tasks}
              ClearCompliteTask={this.ClearCompliteTask.bind(this)}
              countItemValue={countItemValue}
              filter={filter}
              setFilter={this.setFilter.bind(this)}
            />
          )}
        </section>
      </div>
    );
  }
}
export default App;
