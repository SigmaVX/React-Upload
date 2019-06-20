import React from "react";
import style from "./ProgressBar.module.css";

const ProgressBar = props => {
  return (
    <div className={style.ProgressBar}>
      <div
        className={style.Progress}
        style={{ width: this.props.progress + "%" }}
      />
    </div>
  );
};

export default ProgressBar;
