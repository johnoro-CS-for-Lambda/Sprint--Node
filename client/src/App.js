import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import { Icon } from 'react-fa';

const URL = 'http://localhost:8000/api/projects';

class App extends Component {
  state = { projects: [], actions: [] };

  componentDidMount() {
    axios.get(URL)
      .then(({ data }) => this.setState({ projects: data }))
      .catch(err => console.error(err));
  }

  getProjectActions = id => {
    axios.get(`${URL}/${id}/actions`)
      .then(({ data }) => {
        this.setState({ actions: data, id: this.state.projects.find(project => project.id === id).id})
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Express Projects</h1>
        </header>
        <Route exact path="/" render={() => {
          return (
            <div className="projects">
              {this.state.projects.map(project => {
                const { id, name, description, completed } = project;
                return (
                  <div className="project" key={id}>
                    <h3>{name}</h3>
                    <span>Status: {completed 
                      ? <span>Completed <Icon name="check" /></span> 
                      : <span>Not completed <Icon name="times" /></span>}
                    </span>
                    <p>{description}</p>
                    <Link 
                      to={`/${id}`} 
                      onClick={() => this.getProjectActions(id)}
                    >
                      More details >
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        }} />
          
        <Route exact path="/:id" render={() => {
          return (
            <div>
              {this.state.projects
                .filter(project => project.id === this.state.id)
                .map(project => {
                  const { id, name, description, completed } = project;
                  return (
                    <div className="project" key={id}>
                      <h2>{name}</h2>
                      <span>Status: {completed 
                        ? <span>Completed <Icon name="check" /></span> 
                        : <span>Not completed <Icon name="times" /></span>}
                      </span>
                      <p>{description}</p>
                    </div>
                  );
                })
              }
              <div className="actions">
                <h3>Actions:</h3>
                {this.state.actions.map(action => {
                  const { id, description, notes, completed } = action;
                  return (
                    <div className="action" key={id}>
                      <h4>{description}</h4>
                      <p>{notes}</p>
                      <span>Status: {completed 
                        ? <span>Completed <Icon name="check" /></span> 
                        : <span>Not completed <Icon name="times" /></span>}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }} />
      </div>
    );
  }
}

export default App;
