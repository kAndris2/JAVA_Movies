import React, {Component} from "react";
import styles from "../static/css/ProfileSettings.module.css";
import SettingsHeader from "./SettingsHeader";
import {Dropdown as Drp} from "react-bootstrap";

class ProfileSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: null,
            inName: undefined,
            inDesc: undefined,
            inLang: undefined,
            inRegion: undefined
        }

        this.handleSave = this.handleSave.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
    }

    handleSave(response) {
        console.log(response);
    }

    handleClick(color) {
        this.props.user.color = color;
        this.setState({clicked:color})
    }

    isSelected(color) {
        return this.props.user.color === color ? "selected" : "";
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
                    Language:{this.props.langTitle}
                </Drp.Toggle>

                <Drp.Menu>
                    <Drp.Item onClick={this.languageHungarian} href="#">magyar (hu-HU)</Drp.Item>
                    <Drp.Item onClick={this.languageEnglish} href="#">angol (en-US)</Drp.Item>
                    <Drp.Item onClick={this.languageDeutsch} href="#">német (de-DE)</Drp.Item>
                </Drp.Menu>
            </Drp>
        );
    }

    render() {
        const colors = ["blue", "light_blue", "teal", "green", "purple", "silver", "orange", "yellow", "red", "pink"];

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
                                                              onChange={(event) => {this.setState({inName:event.target.value})}}
                                                       />
                                                   </label>
                                               </div>
                                               <label className={styles["k-form-field"]}>
                                                   <span>Description:</span><br/>
                                                   <textarea id={"description"}
                                                             className={styles["k-textbox"]}
                                                             name={"description"}
                                                             style={{overflow:"hidden", overflowWrap:"break-word", width:"800px", height:"86px"}}
                                                             onChange={(event) => {this.setState({inDesc:event.target.value})}}
                                                   >
                                                   </textarea>
                                               </label>
                                               {this.setLanguage()}
                                           </fieldset>
                                           <input type={"submit"}
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
}

export default ProfileSettings;