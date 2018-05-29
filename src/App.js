import React, { Component } from 'react';
import { Panel, PanelGroup, Button, ButtonToolbar, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './App.css';

class App extends Component {
  state = {
    recipes: [
      { recipeName: 'Cookies', ingredients: ['chocolate chips', 'flour', 'eggs'] },
      { recipeName: 'BBQ Chicken', ingredients: ['chicken', 'bbq sauce', 'crockpot'] },
      { recipeName: 'Healthy Pancakes', ingredients: ['oats', 'egg whites', 'greek yogurt'] }
    ]
  };

  render() {
    const { recipes } = this.state;
    return (
      <div className="App container">
        <PanelGroup accordion>
          {recipes.map((recipe, index) => (
            <Panel eventKey={index}>
              <Panel.Heading>
                <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ul>{recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}</ul>
              </Panel.Body>
            </Panel>
          ))}
        </PanelGroup>
      </div>
    );
  }
}

export default App;
