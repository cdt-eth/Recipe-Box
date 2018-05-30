import React, { Component, Fragment } from 'react';
import { Panel, PanelGroup, Button, ButtonToolbar, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './App.css';

class App extends Component {
  // _______________State_______________
  state = {
    recipes: [],
    showAdd: false,
    showEdit: false,
    currentIndex: 0,
    newestRecipe: { recipeName: '', ingredients: [] }
  };

  // _______________Helper Functions_______________

  // Delete a Recipe
  deleteRecipe(index) {
    // take copy of state to not mutate original
    let recipes = this.state.recipes.slice();
    // delete out just the indexed instance
    recipes.splice(index, 1);
    // async call that sets the state of recipes to what's in local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));
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
    // async call that sets the state of recipes to what's in local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));
    // display new state
    this.setState({ recipes });
    // resets form values
    this.setState({ newestRecipe: { recipeName: '', ingredients: [] } });
    // close popup
    this.close();
  }

  // Updates recipeName of a recipe
  updateRecipeName(recipeName, currentIndex) {
    // take copy of state to not mutate original
    let recipes = this.state.recipes.slice();
    // target exact recipe data
    recipes[currentIndex] = { recipeName: recipeName, ingredients: recipes[currentIndex].ingredients };
    // async call that sets the state of recipes to what's in local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));
    // display new state
    this.setState({ recipes });
  }

  // Updates ingredients of a recipe
  updateIngredients(ingredients, currentIndex) {
    // take copy of state to not mutate original
    let recipes = this.state.recipes.slice();
    // target exact ingredient data
    recipes[currentIndex] = { recipeName: recipes[currentIndex].recipeName, ingredients: ingredients };
    // async call that sets the state of recipes to what's in local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));
    // display new state
    this.setState({ recipes });
  }

  // Opens a Popup
  open = (state, currentIndex) => {
    this.setState({ [state]: true });
    this.setState({ currentIndex });
  };

  // Closes a Popup
  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false });
    }
    if (this.state.showEdit) {
      this.setState({ showEdit: false });
    }
  };

  // _______________Local Storage_______________
  componentDidMount() {
    // get what's in local storage and if nothing is there its an empty array
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    // display new state
    this.setState({ recipes });
  }

  // _______________UI_______________

  render() {
    // destructuring to maximize readability below
    const { recipes, newestRecipe, currentIndex } = this.state;

    return (
      <div className="App container">
        <div className="top-title">
          <h1 className="main-title"> My Recipe Box </h1>
          {/* <img src={require('./images/recipe-book.png')} className="bookIcon" /> */}

          {/* add a recipe */}
          <Button bsStyle="primary" className="addBtn" onClick={event => this.open('showAdd', currentIndex)}>
            +
          </Button>
        </div>

        {/* show when theres at least 1 recipe */}
        {recipes.length > 0 && (
          <Fragment>
            <PanelGroup accordion>
              {/* display all recipes in parent array */}
              {recipes.map((recipe, index) => (
                <Panel eventKey={index} className="center-block">
                  <Panel.Heading>
                    {/* display recipe name */}
                    <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    {/* map over ingrs array to display ingr list */}
                    <ul>{recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}</ul>
                    <ButtonToolbar>
                      {/* edit a recipe */}
                      <Button bsStyle="default" onClick={event => this.open('showEdit', index)}>
                        edit
                      </Button>

                      {/* delete a recipe */}
                      <Button bsStyle="danger" onClick={event => this.deleteRecipe(index)}>
                        delete
                      </Button>
                    </ButtonToolbar>
                  </Panel.Body>
                </Panel>
              ))}
            </PanelGroup>

            {/* Popup window to edit a recipe  */}
            <Modal show={this.state.showEdit} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Recipe</Modal.Title>

                <Modal.Body>
                  {/* Enter Recipe Name */}
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>
                      {' '}
                      Recipe Name{' '}
                      <FormControl
                        type="text"
                        value={recipes[currentIndex].recipeName}
                        placeholder="Enter text"
                        onChange={event => this.updateRecipeName(event.target.value, currentIndex)}
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
                        value={recipes[currentIndex].ingredients}
                        placeholder="Enter Ingredients (Separate By Commas)"
                        onChange={event => this.updateIngredients(event.target.value.split(','), currentIndex)}
                      />
                    </ControlLabel>
                  </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                  <Button bsStyle="primary" onClick={event => this.saveNewRecipe()}>
                    Save New Edit
                  </Button>
                </Modal.Footer>
              </Modal.Header>
            </Modal>
          </Fragment>
        )}

        {/* Popup window to add new recipe */}
        <Modal show={this.state.showAdd} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipie</Modal.Title>

            <Modal.Body>
              {/* Enter Recipe Name */}
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
      </div>
    );
  }
}

export default App;
