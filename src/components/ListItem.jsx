import React, { Component } from "react";

class ListItem extends Component {
  constructor(props) {
    super(props);
    const {
      task: { completed },
      task: { text }
    } = this.props;
    this.state = {
      completed,
      editing: false,
      inputText: text,
      classNameLi: this.getliClassname(completed)
    };
  }
  getliClassname(completed, editing) {
    if (!editing) return completed || editing ? "completed" : "";
    if (editing) return completed ? "completed editing" : "editing";
  }
  onDeleteHandler(e) {
    let taskId = e.target.id;
    this.props.deleteItem(taskId);
  }

  onEditHandler() {
    this.updateState(true);
  }

  handleSubmit(e) {
    let value = this.state.inputText.trim();
    let taskId = e.target.parentElement.id;
    if (value) {
      this.setState({
        inputText: value
      });
      this.updateState(false);
      this.props.getChangeTaskText(e, this.state.inputText);
    } else {
      this.props.deleteItem(taskId);
    }
    return false;
  }
  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.setState({
        inputText: this.props.task.text
      });
      this.updateState(false);
    } else if (e.key === "Enter") {
      this.handleSubmit(e);
    }
  }
  updateState(boolean) {
    this.setState({
      editing: boolean,
      classNameLi: this.getliClassname(this.state.completed, this.state.editing)
    });
  }
  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.task.completed !== nextProps.task.completed) {
      this.setState({ completed: nextProps.task.completed });
    }

    if (this.props.task.text !== nextProps.task.text)
      this.setState({ inputText: nextProps.task.text });
  }
  onCheckedHandler(e) {
    this.props.changeOfTaskStatus(e);
  }
  changeOfTaskStatus(e) {
    let checked = e.target.checked;
    this.setState({ completed: checked });
    this.props.changeOfTaskStatus(e, checked);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.task.completed !== prevState.completed) {
      this.setState(() => {
        return { completed: prevProps.task.completed };
      });
    }
  }
  render() {
    const liClassname = this.getliClassname(
      this.state.completed,
      this.state.editing
    );
    const task = this.props.task;

    return (
      <li key={task.id} className={liClassname} id={task.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={task.completed}
            onChange={this.changeOfTaskStatus.bind(this)}
          />
          <label onDoubleClick={this.onEditHandler.bind(this)}>
            {task.text}
          </label>
          <button
            className="destroy"
            onClick={this.onDeleteHandler.bind(this)}
            id={task.id}
          ></button>
        </div>
        <input
          className="edit"
          value={this.state.inputText}
          onBlur={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          ref={function(input) {
            if (input != null) {
              input.focus();
            }
          }}
        />
      </li>
    );
  }
}
export default ListItem;
