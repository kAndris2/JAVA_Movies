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
import ActorsProfile from "./components/ActorsProfile";
import Registration from "./components/auth/Registration";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      movies: [],
      image_pre: "https://image.tmdb.org/t/p/w500",

      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

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

  handleSuccessfulAuth(data){
    this.props.history.push("/");
  }

  render() {
    const {movies, isLoading, image_pre, loggedInStatus} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
//popular :https://api.themoviedb.org/3/movie/popular?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU&page=1&region=HU
//details :https://api.themoviedb.org/3/movie/337401?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU
    return (
        <div className="App">
          <Navbar
              logged_in_status={loggedInStatus}
          />

          <Router>
            <Switch>
              <Route exact path="/">
                <Main
                    movies={movies}
                    image_pre={image_pre}
                    logged_in_status={loggedInStatus}
                >
                </Main>
              </Route>

              <Route exact path={"/register"}>
                <Registration
                    handleSuccessfulAuth={this.handleSuccessfulAuth}
                />
              </Route>

              <Route exact path={"/movie/"+this.getId()}>
                <MovieDetail
                    movie_id={this.getId()}
                    logged_in_status={loggedInStatus}
                >
                </MovieDetail>
              </Route>

              <Route exact path={"/person/"+this.getId()}>
                <ActorsProfile
                    person_id={this.getId()}>
                </ActorsProfile>
              </Route>
            </Switch>
          </Router>

        </div>
    );
  }
}

export default App;
