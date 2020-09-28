import React, {Component} from "react";
import '../cards.css';
import './Modal.css';


class ActorsProfile extends Component {
    state = {
        isLoading: true,

        image_pre: "https://image.tmdb.org/t/p/w500",
        person: []
    };

    async componentDidMount() {
        //person details
        const response = await fetch('https://api.themoviedb.org/3/person/'+ this.props.person_id +'?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU');
        const person = await response.json();

        this.setState({person: person,isLoading: false });
    }


    render() {
        const {person, isLoading, image_pre} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <React.Fragment>
                <div id="cards_landscape_wrap-2">
                    <div className="details">
                        <div className="container" style={{maxWidth: "1300px", padding: "30px 40px"}}>
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="card-flyer">
                                        <div className="text-box">
                                            <div className="image-box">
                                                <img src={image_pre + person.profile_path} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-9 MovieDetailsRight">
                                    <div>
                                        <h2 style={{fontWeight:"700"}}>{person.name}</h2>
                                    </div>

                                    <div>

                                    </div>

                                    <div>
                                        <h3>Biography</h3>
                                        <p>
                                            {person.biography}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ActorsProfile;