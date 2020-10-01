import React, {Component} from 'react';
import axios from 'axios';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null
        }
    }
    onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
        // Create an object of formData
        let formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);
        // Request made to the backend api
        // Send formData object
        axios.post("/api/upload_image/28", formData).then(resp => {
            console.log(resp);
        });
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };
    render() {
        return (
            <div>
                <form method="POST" action="/api/upload_image/28" className="md-form">
                    <div className="file-field">
                        <div className="btn btn-primary btn-sm float-left">
                            <span>Choose file</span>
                            <input type="file" name="file"/>
                        </div>

                    </div>
                    <button type="submit">Send</button>
                </form>

                <h1>
                    Upload
                </h1>
                <h3>
                   Upload an image
                </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} name="file"/>
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default Upload;