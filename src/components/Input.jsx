import React, { Component } from "react";

class Input extends Component {
  state = {
    checked: this.props.countItemValue
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.checked !== nextProps.countItemValue) {
      this.setState({ checked: nextProps.countItemValue });
    }
  }
  render() {
    return (
      <input
        className="toggle-all"
        type="checkbox"
        checked={this.state.checked}
        onChange={() => {}}
      />
    );
  }
}
export default Input;
