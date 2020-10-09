import React, {Component} from 'react';
/*import './App.css';*/
import 'react-circular-progressbar/dist/styles.css';
import Navbar from "./components/Navbar";
import MovieDetail from "./components/MovieDetail";
import { BrowserRouter as Router, Switch,
  Route
} from "react-router-dom";

import Main from "./components/Main";
import ActorsProfile from "./components/ActorsProfile";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import axios from "axios";
import SearchResult from "./components/SearchResult";
import Upload from "./components/Upload";
import Movie from "./components/Movie";
import Livetv from "./components/Livetv";
import UserProfile from "./components/UserProfile";
import  Footer from "./components/Footer";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      movies: [],
      image_pre: "https://image.tmdb.org/t/p/w500",

      loggedInStatus: "NOT_LOGGED_IN",
      user: {},

      apiData: {
        key: "04a30d5152c77afe4a81783d17e20316",
        language: "hu-HU",
        region: "HU"
      }
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.languageChange = this.languageChange.bind(this);
    this.getMovies = this.getMovies.bind(this);
  }

  async getMovies(language, region) {
    let newApi = {
      key: this.state.apiData.key,
      language: language,
      region: region
    };

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?` +
        `api_key=${this.state.apiData.key}&` +
        `language=${language}&` +
        `page=1&` +
        `region=${region}`
    );
    const movie = await response.json();
    this.setState({
      movies: movie.results,
      isLoading: false,
      apiData: newApi
    });
  }

  async componentDidMount() {
    await this.getMovies(
        this.state.apiData.language,
        this.state.apiData.region
    );
    await this.checkLoginStatus();
  }

  async checkLoginStatus(){
    //FUCKIN GARBAGE, DON'T DO THIS EVER. SHOULD BE REFACTORED
    if (document.cookie){
      let uname = document.cookie.split("=")[1];
      let all = [];
      let id;
      await axios.get("http://localhost:3000/api/users")
      .then(resp => {
        all = resp.data
      });

      for (let i = 0; i < all.length; i++) {
        if (all[i].name === uname){
          id = all[i].id;
        }
      }

      await axios.get("http://localhost:3000/api/user/"+id)
          .then(resp => {
            this.setState({
              loggedInStatus: "LOGGED_IN",
              user: resp.data
            })
          })
    }
    else{
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      })
    }

    /*if ((Object.keys(Cookies.get(this.state.user.name)).length >= 1) && this.state.loggedInStatus === "NOT_LOGGED_IN"){
      let uname = document.cookie.split("=")[1];
      console.log(uname);
      this.setState({
        loggedInStatus: "LOGGED_IN"
      });
    }
    else if ((Object.keys(Cookies.get(this.state.user.name)).length === 0) && this.state.loggedInStatus === "LOGGED_IN"){
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      });
    }*/
    /*axios.get("http://localhost:3000/api/logged_in", {withCredentials: true})
        .then(response => {
          if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
            this.setState({
              loggedInStatus: "LOGGED_IN",
              user: response.data.user
            })
          }
          else if (!response.data.logged_in & this.state.loggedInStatus === "LOGGED_IN"){
            this.setState({
              loggedInStatus: "NOT_LOGGED_IN",
              user: {}
            })
          }
        });*/
  }

  getId(){
    let path = window.location.href;
    let id = String(path).split("/")[4];
    return id;
  }

  getQuery(){
    let path = window.location.href;
    let query = String(path).split("=")[1];
    return query;
  }

  handleLogin(data){
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  async languageChange(language) {
    this.setState({isLoading: true});
    if (language === "hun") {
      await this.getMovies("hu-HU", "HU");
    }
    else if (language === "eng") {
      await this.getMovies("en-US", "US");
    }
    else if (language === "de") {
      await this.getMovies("de-DE", "DE");
    }
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
              pro={this.state}
              logged_in_status={loggedInStatus}
              languageChange={this.languageChange}
              langTitle={this.state.apiData.region}
          />

          <Router>
            <Switch>
              <Route
                  exact
                  path="/"
                  render={props => (
                      <Main
                          {... props}
                          apiData={this.state.apiData}
                          movies={movies}
                          image_pre={image_pre}
                          logged_in_status={loggedInStatus}
                      />

                  )}>
              </Route>

              <Route exact path="/movie">
                <Movie
                  movies={movies}
                  apiData={this.state.apiData}
                />
              </Route>

              <Route
                  exact
                  path="/signup"
                  render={props => (
                      <Registration
                          {...props}
                          handleLogin={this.handleLogin}
                          loggedInStatus={this.state.loggedInStatus}
                      />
                  )}
              >
              </Route>

              <Route exact path="/livetv">
                <Livetv/>
              </Route>

              <Route
                  exact
                  path="/login"
                  render={props => (
                      <Login
                          {...props}
                          handleLogin={this.handleLogin}
                          loggedInStatus={this.state.loggedInStatus}
                      />
                  )}
              >
              </Route>

              <Route exact path={"/movie/"+this.getId()}>
                <MovieDetail
                    movie_id={this.getId()}
                    logged_in_status={loggedInStatus}
                >
                </MovieDetail>
              </Route>

              <Route exact path={"/upload"}>
                <Upload/>
              </Route>

              <Route exact path={"/person/"+this.getId()}>
                <ActorsProfile
                    person_id={this.getId()}>
                </ActorsProfile>
              </Route>

              <Route exact path={"/search"}>
                <SearchResult
                    query={this.getQuery()}
                >
                </SearchResult>
              </Route>

              <Route exact path={"/u/" + this.state.user.name}>
                <UserProfile
                  user={this.state.user}
                  >
                </UserProfile>
              </Route>

            </Switch>
          </Router>

          <Footer
              user={this.state.user}
              logged_in_status={loggedInStatus}
              language={this.state.apiData.region}
          />

        </div>
    );
  }
}

export default App;
