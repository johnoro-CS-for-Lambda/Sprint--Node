import React, { Component } from 'react';
import axios from 'axios';
import { Icon } from 'react-fa';

const URL = 'http://localhost:8000/api/projects';

class App extends Component {
  state = { projects: [], actions: [] };

  componentDidMount() {
    axios.get(URL)
      .then(({ data }) => this.setState({ projects: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Express Projects</h1>
        </header>
        <div className="projects">
          {this.state.projects.map(project => {
            const { id, name, description, completed } = project;
            return (
              <div className="project" key={id}>
                <h3>{name}</h3>
                <span>Status: {completed ? 
                  <span>Completed <Icon name="check" /></span> : 
                  <span>Not completed <Icon name="times" /></span>}</span>
                <p>{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
