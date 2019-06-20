import React, { Component } from "react";
import style from "./Upload.module.css";
import Dropzone from "./Dropzone/Dropzone";
import ProgressBar from "./ProgressBar/ProgressBar";
import circleImg from "../../public/circle.svg";

class Upload extends Component {
  state = {
    files: [],
    disableAdding: false,
    uploading: false,
    successfullUploaded: false,
    errorText: null
  };

  // Helper State Update
  safeStateUpdate = updateObj => {
    let safeUpdateObj = {
      ...this.state,
      files: [...this.state.files],
      ...updateObj
    };
    console.log("State Updated: ", safeUpdateObj);
    this.setState(safeUpdateObj);
  };

  // Add New File To State - CB From Dropzone
  onFilesAdded = file => {
    if (!this.state.disableAdding) {
      let updatedFiles = [...this.state.files].concat(file);
      this.safeStateUpdate({ files: updatedFiles, disableAdding: true });
    }
  };

  // Remove Fiels
  clearFiles = () => {
    this.safeStateUpdate({
      files: [],
      successfullUploaded: false,
      disableAdding: false
    });
  };

  // Async File Upload
  uploadFiles = () => {
    this.safeStateUpdate({ uploading: true });
    setTimeout(() => {
      this.safeStateUpdate({ uploading: false });
    }, 3000);

    // Code For Production
    // const promises = [];
    // this.state.files.forEach(file => {
    //   promises.push(this.sendRequest(file));
    // });
    // try {
    //   await Promise.all(promises);
    //   this.safeStateUpdate({
    //     successfullUploaded: true,
    //     uploading: false,
    //     errorText: null
    //   });
    // } catch (error) {
    //   this.safeStateUpdate({
    //     successfullUploaded: false,
    //     uploading: false,
    //     errorText: `Upload Failed: ${error}`
    //   });
    // }
  };

  // Send File To Server
  // sendRequest(file) {
  //   console.log("Uploading File: ", file);
  // }

  render() {
    return (
      <div className={style.uploadWrapper}>
        <div className={style.dropzoneWrapper}>
          <Dropzone
            onFilesAdded={this.onFilesAdded}
            disabled={this.state.disableAdding}
            fileName={null}
          />
        </div>
        <div className={style.filesWrapper}>
          {this.state.files.map(file => {
            return (
              <div key={file.name} className={style.fileRow}>
                <span className={style.fileName}>{file.name}</span>
                {this.state.successfullUploaded ? (
                  <img className={style.checkIcon} alt="done" src={circleImg} />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className={style.progressWrapper}>
          {this.state.uploading ? <ProgressBar startBar={true} /> : null}
        </div>

        {/* Buttons */}
        <div className={style.buttonWrapper}>
          <button
            disabled={this.state.files.length === 0 || this.state.uploading}
            onClick={this.clearFiles}
          >
            Clear
          </button>
          <button
            disabled={this.state.files.length === 0 || this.state.uploading}
            onClick={this.uploadFiles}
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
}

export default Upload;
