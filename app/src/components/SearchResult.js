import React, {Component} from 'react';

class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            results: []
        }
    }
    async componentDidMount(){
        const response = await fetch('https://api.themoviedb.org/3/search/multi?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU&query='+this.props.query+'&page=1&include_adult=false&region=HU');
        const search_res = await response.json();
        this.setState({results: search_res.results, isLoading: false });
    }
    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>

            </div>
        );
    }
}

export default SearchResult;