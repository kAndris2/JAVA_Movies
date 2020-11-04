import React, {Component} from "react";
import styles from "../static/css/ProfileSettings.module.css";

class ProfileSettings extends Component {
    constructor(props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(response) {
        console.log(response);
    }

    render() {
        const colors = ["blue", "light_blue", "teal", "green", "purple", "silver", "orange", "yellow", "red", "pink"];

        return (
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
                                                       <div className={`${styles["color"]} ${styles["background_color"]} ${styles[color]}`} data-color={color}>
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
                                                   />
                                               </label>
                                           </div>
                                           <label className={styles["k-form-field"]}>
                                               <span>Description:</span><br/>
                                               <textarea id={"description"}
                                                         className={styles["k-textbox"]}
                                                         name={"description"}
                                                         style={{overflow:"hidden", overflowWrap:"break-word", width:"800px", height:"86px"}}
                                               >
                                               </textarea>
                                           </label>
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
        );
    }
}

export default ProfileSettings;