import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Navbar from "./components/Navbar";

class App extends Component {
  state = {
    isLoading: true,
    movies: [],
    image_pre: "https://image.tmdb.org/t/p/w500",
  };

  async componentDidMount() {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=04a30d5152c77afe4a81783d17e20316&language=hu-HU&page=1&region=HU');
    const movie = await response.json();

    /*const resp = await fetch('/api/users');
    const user = await  resp.json();*/

    /*let movies = [...this.state.movies];
    movies.push(movie);

    this.setState({ movies });*/
    this.setState({movies: movie.results, isLoading: false });
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
          <div id="cards_landscape_wrap-2">
            <div className="container" style={{maxWidth:"1300px", paddingLeft: "40px", paddingRight: "40px", paddingTop: "30px", paddingBottom: "30px"}}>
              <div className="row">
                {movies.map(movie =>
                    <div key={movie.id} className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                      <a href={"/movie/"+movie.id} data-toggle="modal" data-target="#exampleModalCenter">
                        <div className="card-flyer">
                          <div className="text-box">
                            <div className="image-box">
                              <img style={{position: "relative"}} src={image_pre + movie.poster_path} alt="" />
                            </div>
                            <div className="text-container">
                              <h6>{movie.title}</h6>
                              <p>{movie.release_date}</p>
                              <div style={{ width: "15%" , position:"absolute", top: "445px"}}>
                                <CircularProgressbar
                                  value={movie.vote_average}
                                  maxValue={10}
                                  text={`${movie.vote_average * 10}%`}
                                  background={true}
                                  styles={buildStyles({
                                    strokeLinecap: 'round',
                                    textSize: '2em',
                                    pathTransitionDuration: 0.5,
                                    pathColor: '#23c171',
                                    textColor: '#ffffff',
                                    trailColor: '#204629',
                                    backgroundColor: '#0A1D34',
                                  })}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
