import React, {Component} from "react";
import styles from "../static/css/ProfileSettings.module.css";
import SettingsHeader from "./SettingsHeader";
import {Dropdown as Drp} from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';

class ProfileSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: undefined,
            inName: undefined,
            inDesc: undefined,
            inLang: undefined,
            inRegion: undefined,
            loading: false,
            selectedFile: null,
            error:''
        }

        this.handleSave = this.handleSave.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.currentLanguage = this.currentLanguage.bind(this);
        this.setRegion = this.setRegion.bind(this);
        this.currentRegion = this.currentRegion.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
    }

    updateUser(newData) {
        this.props.user.name = this.props.user.name !== newData.name ? newData.name : this.props.user.name;
        this.props.user.color = this.props.user.color !== newData.color ? newData.color : this.props.user.color;
        this.props.user.description = this.props.user.description !== newData.description ? newData.description : this.props.user.description;
        this.props.user.language = this.props.user.language !== newData.language ? newData.language : this.props.user.language;
        this.props.user.region = this.props.user.region !== newData.region ? newData.region : this.props.user.region;
        //
        this.props.updateUser(this.props.user);
    }

    handleSave() {
        this.setState({loading: true});

        const data = {
            name: this.state.inName == undefined ? this.props.user.name : this.state.inName,
            color: this.state.clicked == undefined ? this.props.user.color : this.state.clicked,
            description: this.state.inDesc == undefined ? this.props.user.description : this.state.inDesc,
            language: this.state.inLang == undefined ? this.props.user.language : this.state.inLang,
            region: this.state.inRegion == undefined ? this.props.user.region : this.state.inRegion
        };

        const Toast = Swal.mixin({
            toast: true,
            position: 'center-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        axios.put("http://localhost:3000/api/basic_settings/" +
            `${this.props.user.id}/` +
            `${data.name}/` +
            `${data.color}/` +
            `${data.description}/` +
            `${data.language}/` +
            `${data.region}`)
            .then(res => {
                this.updateUser(data);
                this.setState({loading: false});
                if (res.statusText === "OK"){
                    Toast.fire({
                        icon: 'success',
                        title: 'Added to watchlist successfully'
                    })
                }
                else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong 🤷‍♂️'
                    })
                }
            });
    }

    handleClick(color) {
        this.props.user.color = color;
        this.setState({clicked:color})
    }

    isSelected(color) {
        return this.props.user.color === color ? "selected" : "";
    }

    currentLanguage() {
        switch (this.props.user.language) {
            case "hu-HU": return `magyar (${this.props.user.language})`;
            case "en-US": return `angol (${this.props.user.language})`;
            case "de-DE": return `német (${this.props.user.language})`;
        }
    }

    newLanguage(language) {
        this.props.user.language = language;
        this.setState({inLang: language})
    }

    setLanguage() {
        return (
            <Drp>
                <Drp.Toggle
                    variant="success"
                    id="dropdown-basic"
                    style={{
                        marginLeft:"1rem",
                        marginRight:"1rem",
                        fontWeight:"bold",
                        color:"white",
                        fontSize:"1rem",
                        border: "1px solid #fff",
                        borderRadius: "3px",
                        backgroundColor:"transparent",
                        padding:"1px 4px"
                    }}>
                    Language: {this.currentLanguage()}
                </Drp.Toggle>

                <Drp.Menu>
                    {this.props.user.language !== "hu-HU" ? <Drp.Item onClick={this.newLanguage.bind(this, "hu-HU")} href="#">magyar (hu-HU)</Drp.Item> : ""}
                    {this.props.user.language !== "en-US" ? <Drp.Item onClick={this.newLanguage.bind(this, "en-US")} href="#">angol (en-US)</Drp.Item> : ""}
                    {this.props.user.language !== "de-DE" ? <Drp.Item onClick={this.newLanguage.bind(this, "de-DE")} href="#">német (de-DE)</Drp.Item> : ""}
                </Drp.Menu>
            </Drp>
        );
    }

    setRegion() {
        return (
            <Drp>
                <Drp.Toggle
                    variant="success"
                    id="dropdown-basic"
                    style={{
                        marginLeft:"1rem",
                        marginRight:"1rem",
                        fontWeight:"bold",
                        color:"white",
                        fontSize:"1rem",
                        border: "1px solid #fff",
                        borderRadius: "3px",
                        backgroundColor:"transparent",
                        padding:"1px 4px"
                    }}>
                    Region: {this.currentRegion()}
                </Drp.Toggle>

                <Drp.Menu>
                    {this.props.user.region !== "HU" ? <Drp.Item onClick={this.newRegion.bind(this, "HU")} href="#">Magyarország</Drp.Item> : ""}
                    {this.props.user.region !== "US" ? <Drp.Item onClick={this.newRegion.bind(this, "US")} href="#">Egyesült Államok</Drp.Item> : ""}
                    {this.props.user.region !== "DE" ? <Drp.Item onClick={this.newRegion.bind(this, "DE")} href="#">Németország</Drp.Item> : ""}
                </Drp.Menu>
            </Drp>
        );
    }

    currentRegion() {
        switch (this.props.user.region) {
            case "HU": return "Magyarország";
            case "US": return "United States";
            case "DE": return "Germany";
        }
    }

    newRegion(region) {
        this.props.user.region = region;
        this.setState({inRegion: region})
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

            axios.post(`http://localhost:3000/api/upload_image/${this.props.user.id}`, formData)
                .then(resp => {
                console.log(resp);
            });
        }
    };

    render() {
        const colors = ["blue", "light_blue", "teal", "green", "purple", "silver", "orange", "yellow", "red", "pink"];

        if (this.state.loading === false) {
            return (
                <>
                    <SettingsHeader user={this.props.user}></SettingsHeader>

                    <div className={"inner_block pad_top"}>
                        <div className={"inner_content"}>
                            <div className={"content"}>
                                <div className={"column_wrapper"}>
                                    <section className={"content"}>
                                        <div className={"column_content"}>
                                            <h2>Profile</h2>
                                            <div>
                                                <input type="file" onChange={this.onFileChange} name="file"/>
                                                <input type={"button"}
                                                       className={`${styles["k-button"]} 
                                                                    ${styles["k-primary"]} 
                                                                    ${styles["rounded"]} 
                                                                    ${styles["background_color"]}
                                                                    ${styles["border_color"]}
                                                                    ${styles[this.props.user.color]}`}
                                                       value={"Upload!"}
                                                       onClick={this.onFileUpload}/>
                                            </div>
                                            <form className={styles["k-form"]}>
                                                <fieldset>
                                                    <label className={styles["k-form-field"]}>
                                                        <span>Dominant color:</span>
                                                        <div className={styles["accent_colors"]}>
                                                            {colors.map(color =>
                                                                <div className={`${styles["color"]} 
                                                                                ${styles["background_color"]} 
                                                                                ${styles[color]}
                                                                                ${styles[this.isSelected(color)]}
                                                                               `}
                                                                     data-color={color}
                                                                     onClick={this.handleClick.bind(this, color)}
                                                                >
                                                                </div>
                                                            )}
                                                        </div>
                                                    </label>
                                                    <div>
                                                        <label className={styles["k-form-field"]}>
                                                            <span>Name:</span><br/>
                                                            <input id={"name"}
                                                                   className={`${styles["k-textbox"]} ${styles["name"]}`}
                                                                   type={"text"} name={"name"}
                                                                   autoComplete={"off"}
                                                                   placeholder={this.props.user.name}
                                                                   onChange={(event) => {
                                                                       this.setState({inName: event.target.value})
                                                                   }}
                                                            />
                                                        </label>
                                                    </div>
                                                    <label className={styles["k-form-field"]}>
                                                        <span>Description:</span><br/>
                                                        <textarea id={"description"}
                                                                  className={styles["k-textbox"]}
                                                                  name={"description"}
                                                                  style={{
                                                                      overflow: "hidden",
                                                                      overflowWrap: "break-word",
                                                                      width: "800px",
                                                                      height: "86px"
                                                                  }}
                                                                  onChange={(event) => {
                                                                      this.setState({inDesc: event.target.value})
                                                                  }}
                                                        >
                                                       </textarea>
                                                    </label>
                                                    {this.setLanguage()}
                                                    {this.setRegion()}
                                                </fieldset>
                                                <input type={"button"}
                                                       className={`${styles["k-button"]} 
                                                                    ${styles["k-primary"]} 
                                                                    ${styles["rounded"]} 
                                                                    ${styles["background_color"]}
                                                                    ${styles["border_color"]}
                                                                    ${styles[this.props.user.color]}`}
                                                       value={"Save"}
                                                       onClick={this.handleSave}/>
                                            </form>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
        else {
            return (
                <h1>Loading...</h1>
            );
        }
    }
}

export default ProfileSettings;