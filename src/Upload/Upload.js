import React, { Component } from "react";
import style from "./Upload.module.css";
import Dropzone from "./Dropzone/Dropzone";
import ProgressBar from "./ProgressBar/ProgressBar";
import circleImg from "../../public/circle.svg";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      errorText: null
    };

    // this.onFilesAdded = this.onFilesAdded.bind(this);
    // this.uploadFiles = this.uploadFiles.bind(this);
    // this.sendRequest = this.sendRequest.bind(this);
    // this.renderActions = this.renderActions.bind(this);
  }

  safeStateUpdate = updateObj => {
    let safeUpdateObj = {
      ...this.state,
      files: [...this.state.files],
      uploadProgress: { ...this.state.uploadProgress },
      ...updateObj
    };
    console.log("State Updated: ", safeUpdateObj);
    this.setState(safeUpdateObj);
  };

  // Add New File To State
  onFilesAdded = file => {
    let updatedFiles = [...this.state.files].concat(file);
    this.safeStateUpdate({ files: updatedFiles });
  };

  // Remove Fiels
  clearFiles = () => {
    this.safeStateUpdate({
      files: [],
      successfullUploaded: false
    });
  };

  // Show Progress On Uploading or Successfull Upload
  renderProgress = file => {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className={style.progressWrapper}>
          <ProgressBar
            progress={uploadProgress ? uploadProgress.percentage : 0}
          />
          <img
            className={style.checkIcon}
            alt="done"
            src={circleImg}
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  };

  // Async File Upload
  uploadFiles = () => {
    this.safeStateUpdate({ uploadProgress: {}, uploading: true });
    setTimeout(() => {
      this.safeStateUpdate({ uploading: false });
    }, 3000);

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
  sendRequest(file) {
    console.log("Uploading File: ", file);
    // return new Promise((resolve, reject) => {
    //   const req = new XMLHttpRequest();
    //   req.upload.addEventListener("progress", event => {
    //     if (event.lengthComputable) {
    //       const copy = { ...this.state.uploadProgress };
    //       copy[file.name] = {
    //         state: "pending",
    //         percentage: (event.loaded / event.total) * 100
    //       };
    //       this.setState({ uploadProgress: copy });
    //     }
    //   });

    //   req.upload.addEventListener("load", event => {
    //     const copy = { ...this.state.uploadProgress };
    //     copy[file.name] = { state: "done", percentage: 100 };
    //     this.setState({ uploadProgress: copy });
    //     resolve(req.response);
    //   });

    //   req.upload.addEventListener("error", event => {
    //     const copy = { ...this.state.uploadProgress };
    //     copy[file.name] = { state: "error", percentage: 0 };
    //     this.setState({ uploadProgress: copy });
    //     reject(req.response);
    //   });

    //   const formData = new FormData();
    //   formData.append("file", file, file.name);

    //   req.open("POST", "http://localhost:8000/upload");
    //   req.send(formData);
    // });
  }

  render() {
    return (
      <div className={style.uploadWrapper}>
        <div className={style.dropzoneWrapper}>
          <Dropzone
            onFilesAdded={this.onFilesAdded}
            disabled={
              this.state.uploading ||
              this.state.successfullUploaded ||
              this.state.files.length > 1
            }
          />
        </div>
        <div className={style.filesWrapper}>
          {this.state.files.map(file => {
            return (
              <div key={file.name} className={style.fileRow}>
                <span className={style.fileName}>{file.name}</span>
                {/* {this.renderProgress(file)} */}
              </div>
            );
          })}
        </div>
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
