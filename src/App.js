import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import Movie from "./Movie";

class App extends React.Component{
  state = {
    isLoading: true,
    movies: []
  }

  getMovies = async() => {
    //As axios takes some time to be finished, we have to 
    //tell componentDidMount to wait until the task is done
    const {
      data: {
        data : {movies}
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    
    //It is movies: movies, but, JS is smart and can understand the following
    this.setState({movies, isLoading: false});
  }

  componentDidMount(){
    this.getMovies();

  }

  render(){
    const {isLoading, movies} = this.state;
    return (
      <section class="container">
        {isLoading ? (
          <div class="loader">
            <span class="loader__text">Loading...</span>
          </div>
        ) : (
          <div class="movies">
            {movies.map(movie => (
              <Movie 
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
              />
            ))}
          </div>
        )} 
      </section>   
    );
  }
}


export default App;
