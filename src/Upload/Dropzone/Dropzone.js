import React, { Component } from "react";
import style from "./Dropzone.module.css";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();

    // Binding - may not need with arrow function used below
    // For Upload By Click
    // this.openFileDialog = this.openFileDialog.bind(this);
    // this.onFilesAdded = this.onFilesAdded.bind(this);

    // For Drag and Drop
    // this.onDragOver = this.onDragOver.bind(this);
    // this.onDragLeave = this.onDragLeave.bind(this);
    // this.onDrop = this.onDrop.bind(this);
  }

  // Highlight On Hover
  onDragOver = event => {
    event.preventDefault();
    if (this.props.disabled) return;
    this.setState({ hightlight: true });
  };

  // Remove Highlight On Leave
  onDragLeave = () => {
    this.setState({ hightlight: false });
  };

  // Helper Function - converts File List To Array
  fileListToArray = filelist => {
    const array = [];
    for (var i = 0; i < filelist.length; i++) {
      array.push(filelist.item(i));
    }
    return array;
  };

  // Store Files From Input's Filelist Object
  onFilesAdded = event => {
    if (this.props.disabled) return;
    const files = event.target.files;
    const array = this.fileListToArray(files);
    this.props.onFilesAdded(array);
  };

  // Simulates Input Click For Upload
  openFileDialog = () => {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  };

  // Store Files On Drop
  onDrop = event => {
    event.preventDefault();
    if (this.props.disabled) return;
    const files = event.dataTransfer.files;
    const array = this.fileListToArray(files);
    this.props.onFilesAdded(array);
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
        <img
          className={style.DropzoneIcon}
          alt="upload icon"
          src="./cloud.svg"
        />

        <p className={style.DropzoneText}>
          {this.props.fileName
            ? this.props.fileName
            : "Drag Files Here Or Click To Upload Files"}
        </p>

        <input
          ref={this.fileInputRef}
          className={style.FileInput}
          type="file"
          onChange={this.onFilesAdded}
          // multiple - disabled to only allow one file
        />
      </div>
    );
  }
}

export default Dropzone;
