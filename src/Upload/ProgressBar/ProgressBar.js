import React from "react";
import style from "./ProgressBar.module.css";

const ProgressBar = props => {
  return (
    <div className={style.progressBar}>
      <div className={style.progress} />
    </div>
  );
};

export default ProgressBar;
