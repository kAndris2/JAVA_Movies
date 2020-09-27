import React, {Component} from 'react';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query:""
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    //API search https://api.themoviedb.org/3/search/multi?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU&query='+this.state.query+'&page=1&include_adult=false&region=HU
    render() {
        const img_url = this.props.bacdrop;
        const search_bg_img = "linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65, 0) 100%), url('//image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)"+ img_url +"')";
        return (
            <div className="container" id="search-container" style={{backgroundImage: search_bg_img}}>
                <div className="column-wrapper">
                    <div className="content-wrapper">
                        <div className="title">
                            <h2>Welcome.</h2>
                            <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
                        </div>
                        <div className="search">
                            <form id="inner_search_form" action="/search" method="get" acceptCharset="utf-8">
                                <label style={{width:"100%"}}>
                                    <input dir="auto" id="inner_search_v4" onChange={this.handleSearch} name="query" type="text" tabIndex="1"
                                           autoCorrect="off" autofill="off" autoComplete="off" spellCheck="false"
                                           placeholder="Search for a movie, tv show, person......" value={this.state.query}/>
                                </label>
                                <input id="submit_btn" type="submit" value="Search"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;