import React, { Component } from "react";
import style from "./Dropzone.module.css";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();
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
    let fileName = (
      <div>
        <span className={style.FileName}>{this.props.fileName}</span>
        <span>
          <img
            className={style.checkIcon}
            alt="done"
            src="./circle.svg"
            style={{ opacity: this.props.successfullUpload ? "1" : "0.5" }}
          />
        </span>
      </div>
    );

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
            ? fileName
            : "Drag Files Here Or Click To Upload A File"}
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
