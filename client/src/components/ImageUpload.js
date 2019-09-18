import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";

const CLOUDINARY_UPLOAD_PRESET = "ynp2xuge";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/db5vqjnev/image/upload";

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: ""
    };
  }
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <form>
        <div className="file-upload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            accept="image/*"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    <div>
                      <p>Upload new photo</p>
                      <p>All photos should be:</p>
                      <ul>
                        <li>360px wide by 360px</li>
                        <li>PNG, JPG formats</li>
                      </ul>
                    </div>
                  }
                </div>
              );
            }}
          </Dropzone>
        </div>
        <div>
          {this.state.uploadedFileCloudinaryUrl === "" ? null : (
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img
                src={this.state.uploadedFileCloudinaryUrl}
                style={{ width: "100px", height: "auto" }}
              />
            </div>
          )}
        </div>
      </form>
    );
  }
}

export default ImageUpload;
