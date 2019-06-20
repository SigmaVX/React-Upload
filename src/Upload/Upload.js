import React, { Component } from "react";
import style from "./Upload.module.css";
import Dropzone from "./Dropzone/Dropzone";
import ProgressBar from "./ProgressBar/ProgressBar";

class Upload extends Component {
  state = {
    files: [],
    disableAdding: false,
    uploading: false,
    successfullUpload: false,
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
      successfullUpload: false,
      disableAdding: false
    });
  };

  // Async File Upload
  uploadFiles = () => {
    this.safeStateUpdate({ uploading: true });
    setTimeout(() => {
      this.safeStateUpdate({ uploading: false, successfullUpload: true });
    }, 3000);

    // Code For Production
    // const promises = [];
    // this.state.files.forEach(file => {
    //   promises.push(this.sendRequest(file));
    // });
    // try {
    //   await Promise.all(promises);
    //   this.safeStateUpdate({
    //     successfullUpload: true,
    //     uploading: false,
    //     errorText: null
    //   });
    // } catch (error) {
    //   this.safeStateUpdate({
    //     successfullUpload: false,
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
            successfullUpload={this.state.successfullUpload}
            className={style.dropZone}
            fileName={
              this.state.files.length > 0 ? this.state.files[0].name : null
            }
          />
        </div>

        <div className={style.progressWrapper}>
          {this.state.uploading ? (
            <ProgressBar startBar={this.state.uploading} />
          ) : (
            <div />
          )}
        </div>

        {/* Buttons */}
        <div className={style.buttonWrapper}>
          <button
            disabled={
              this.state.files.length === 0 ||
              this.state.uploading ||
              this.state.successfullUpload
            }
            onClick={this.uploadFiles}
          >
            Upload
          </button>
          <button
            disabled={
              this.state.files.length === 0 ||
              this.state.uploading ||
              this.state.successfullUpload
            }
            onClick={this.clearFiles}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}

export default Upload;
