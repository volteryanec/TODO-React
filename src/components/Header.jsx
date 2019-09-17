import React, { Component } from "react";

class Header extends Component {
  state = {
    value: ""
  };

  onChangeHandler = e => {
    this.setState({ value: e.target.value });
  };
  KeyPressHandler = e => {
    if (e.key === "Enter" && this.state.value !== "") {
      this.props.addTodo(this.state.value);
      this.setState({ value: "" });
    }
  };
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyPress={this.KeyPressHandler}
          onChange={this.onChangeHandler}
          value={this.state.value}
        />
      </header>
    );
  }
}
export default Header;
