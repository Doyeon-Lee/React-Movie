import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

class App extends React.Component{
  state = {
    isLoading: true,
    movies: []
  }

  getMovies = async() => {
    //As axios takes some time to be finished, we have to 
    //tell componentDidMount to wait until the task is done
    const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
  }

  componentDidMount(){
    this.getMovies();
  }

  render(){
    const {isLoading} = this.state;
    return <div>{isLoading ? "Loading..." : "We are ready"}</div>
  }
}


export default App;
