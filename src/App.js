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

  //helper function
  deleteRecipe(index) {
    // take copy of state to not mutate original
    let recipes = this.state.recipes.slice();

    // delete out just the indexed instance
    recipes.splice(index, 1);

    // display new state
    this.setState({ recipes });
  }

  render() {
    // destructuring to maximize readability below
    const { recipes } = this.state;
    return (
      <div className="App container">
        <PanelGroup accordion>
          {/* display all recipes in parent array */}
          {recipes.map((recipe, index) => (
            <Panel eventKey={index}>
              <Panel.Heading>
                {/* display recipe name */}
                <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                {/* map over ingrs array to display ingr list */}
                <ul>{recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}</ul>
                <ButtonToolbar>
                  {/* delete a recipe */}
                  <Button bsStyle="danger" onClick={event => this.deleteRecipe(index)}>
                    Delete Recipe
                  </Button>
                  {/* edit a recipe */}
                  <Button bsStyle="default">Edit Recipe</Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
          ))}
        </PanelGroup>

        {/* add a recipe */}
        <Button bsStyle="primary">Add Recipe</Button>
      </div>
    );
  }
}

export default App;
