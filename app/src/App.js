import React, {Component} from 'react';
import './App.css';
import 'react-circular-progressbar/dist/styles.css';
import Navbar from "./components/Navbar";
import MovieDetail from "./components/MovieDetail";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Main from "./components/Main";

class App extends Component {
  state = {
    isLoading: true,
    movies: [],
    image_pre: "https://image.tmdb.org/t/p/w500",
  };

  async componentDidMount() {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU&page=1&region=HU');
    const movie = await response.json();
    this.setState({movies: movie.results, isLoading: false });
  }

  getId(){
    let path = window.location.href;
    let id = String(path).split("/")[4];
    return id;
  }

  render() {
    const {movies, isLoading, image_pre} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
//popular :https://api.themoviedb.org/3/movie/popular?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU&page=1&region=HU
//details :https://api.themoviedb.org/3/movie/337401?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU
    return (
        <div className="App">
          <Navbar></Navbar>
          <Router>
            <Switch>
              <Route exact path="/">
                <Main
                    movies={movies}
                    image_pre={image_pre}>
                </Main>
              </Route>

              <Route exact path={"/movie/"+this.getId()}>
                <MovieDetail
                    movie_id={this.getId()}>
                </MovieDetail>
              </Route>

            </Switch>
          </Router>

        </div>
    );
  }
}

export default App;
