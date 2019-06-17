import React, { Component } from "react";
import style from "./Dropzone.module.css";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();

    // Binding - may not need with arrow function used below
    // For Upload By Click
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);

    // For Drag and Drop
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog = () => {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  };

  // Converts File List To Array
  fileListToArray = list => {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  // Files Come In File List Object
  onFilesAdded = evt => {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  };

  // Highlight On Hover
  onDragOver = evt => {
    evt.preventDefault();
    if (this.props.disabled) return;
    this.setState({ hightlight: true });
  };

  // Remove Highlight
  onDragLeave = () => {
    this.setState({ hightlight: false });
  };

  // Store Files On Drop
  onDrop = event => {
    event.preventDefault();
    if (this.props.disabled) return;
    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  };

  render() {
    return (
      <div
        className={[
          style.Dropzone,
          this.state.hightlight ? style.Highlight : null
        ].join(" ")}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <img alt="upload" className={style.Icon} src="./cloud.svg" />

        <input
          ref={this.fileInputRef}
          className={style.FileInput}
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />

        <span>Upload Files</span>
      </div>
    );
  }
}

export default Dropzone;
