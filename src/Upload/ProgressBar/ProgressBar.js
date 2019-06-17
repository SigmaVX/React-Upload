import React, { Component } from "react";
import style from "./ProgressBar.module.css";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={style.ProgressBar}>
        <div
          className={style.Progress}
          style={{ width: this.props.progress + "%" }}
        />
      </div>
    );
  }
}

export default ProgressBar;
