import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";


class JokeList extends React.Component {
  static defaultProps = {numJokesToGet:4}
  constructor(props){
    super(props);
    this.numJokesToGet = props.numJokesToGet;
    this.state = {jokes: []};
    this.vote = this.vote.bind(this);
    this.generateNewJokes = this.generateNewJokes.bind(this);
  }

  async componentDidMount(){
      if (this.state.jokes.length !== 0) return;
      let j = [...this.state.jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });

          let { status, ...jokeObj } = res.data;
  
          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setState({"jokes":j});
      } catch (e) {
        console.log(e)
      }
    }
  
  async componentDidUpdate(prevProps, prevState){
              
    if (this.state.jokes.length < prevState.jokes.length){
      // then the jokes have been cleared, and we want to generate new ones
      let j = [...this.state.jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { status, ...jokeObj } = res.data;
  
          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setState({"jokes":j});
      } catch (e) {
        console.log(e);
      }
    }
    return 
  }

  vote(id, delta){
    this.setState({
      "jokes":this.state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    });
  }

  generateNewJokes(){
    this.setState({"jokes":[]}); // should result in running componentDidUpdate();
  }

  render(){
    if (this.state.jokes.length) {
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
    
      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>
    
          {sortedJokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
    }
  
    return null;

  }
}



export default JokeList;
