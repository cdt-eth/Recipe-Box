import React, { Component } from 'react';
import { Panel, PanelGroup, Button, ButtonToolbar, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './App.css';

class App extends Component {
  state = {
    recipes: [
      { recipeName: 'Cookies', ingredients: ['chocolate chips', 'flour', 'eggs'] },
      { recipeName: 'BBQ Chicken', ingredients: ['chicken', 'bbq sauce', 'crockpot'] },
      { recipeName: 'Healthy Pancakes', ingredients: ['oats', 'egg whites', 'greek yogurt'] }
    ],
    showAdd: false,
    newestRecipe: { recipeName: '', ingredients: [] }
  };

  // _______________Helper Functions_______________

  // Delete a Recipe
  deleteRecipe(index) {
    // take copy of state to not mutate original
    let recipes = this.state.recipes.slice();
    // delete out just the indexed instance
    recipes.splice(index, 1);
    // display new state
    this.setState({ recipes });
  }

  // Update newestRecipe
  updateNewRecipe(recipeName, ingredients) {
    this.setState({
      newestRecipe: {
        recipeName: recipeName,
        ingredients: ingredients
      }
    });
  }

  // Saves a new recipe to recipes
  saveNewRecipe() {
    // take copy of state to not mutate original
    let recipes = this.state.recipes.slice();
    // add newestRecipe to end of recipe list
    recipes.push({
      recipeName: this.state.newestRecipe.recipeName,
      ingredients: this.state.newestRecipe.ingredients
    });
    // display new state
    this.setState({ recipes });
    // resets form values
    this.setState({ newestRecipe: { recipeName: '', ingredients: [] } });
    // close popup
    this.close();
  }

  // Opens a Popup
  open = state => {
    this.setState({ [state]: true });
  };

  // Closes a Popup
  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false });
    }
  };

  render() {
    // destructuring to maximize readability below
    const { recipes, newestRecipe } = this.state;

    return (
      <div className="App container">
        {/* show when theres at least 1 recipe */}
        {recipes.length > 0 && (
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
        )}

        <Modal show={this.state.showAdd} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipie</Modal.Title>
            <Modal.Body>
              {/* Enter Recipie Name */}
              <FormGroup controlId="formBasicText">
                <ControlLabel>
                  {' '}
                  Recipe Name{' '}
                  <FormControl
                    type="text"
                    value={newestRecipe.recipeName}
                    placeholder="Enter recipe name"
                    onChange={event => this.updateNewRecipe(event.target.value, newestRecipe.ingredients)}
                  />
                </ControlLabel>
              </FormGroup>

              {/* Enter Ingredients */}
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>
                  {' '}
                  Ingredients{' '}
                  <FormControl
                    type="textarea"
                    value={newestRecipe.ingredients}
                    placeholder="Enter Ingredients (Separate By Commas)"
                    onChange={event => this.updateNewRecipe(newestRecipe.recipeName, event.target.value.split(','))}
                  />
                </ControlLabel>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={event => this.saveNewRecipe()}>
                Save
              </Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>

        {/* add a recipe */}
        <Button bsStyle="primary" onClick={event => this.open('showAdd')}>
          Add Recipe
        </Button>
      </div>
    );
  }
}

export default App;
