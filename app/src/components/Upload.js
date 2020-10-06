import React, {Component} from 'react';
import axios from 'axios';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            error:''
        }
    }
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        if (this.state.selectedFile.size >= 5000000){
            this.setState({error:'File too large'});

        }
        else {
            this.setState({error:''})
            let formData = new FormData();
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );

            //console.log(this.state.selectedFile);

            axios.post("/api/dominant_color", formData).then(resp => {
                console.log(resp);
            });
        }
    };
    bytesToSize(bytes) {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    }

    fileData = () => {

        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>File Size: {this.bytesToSize(this.state.selectedFile.size)}</p>
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
                {this.state.error}
                {this.fileData()}
            </div>
        );
    }
}

export default Upload;