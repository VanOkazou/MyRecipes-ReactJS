// React
import React from 'react';
import PropTypes from 'prop-types';
import AddRecipe from './AddRecipe';
import base from '../base';

class Admin extends React.Component {

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    base.onAuth(user => {
      if(user) {
        this.tryConnexion(null, {user})
      }
    })
  }

  editData = (e,key) => {
    const recipe = this.props.recipes[key];
    const newRecipe = {
      ...recipe,
      [e.target.name]: e.target.value
    };
    this.props.updateRecipe(key, newRecipe);
  };

  renderAdmin = key => {
    const recipe = this.props.recipes[key];
    return (
      <div className="card" key={key}>
				<form
          className="admin-form"
					ref={input => this.recetteForm = input}
					onSubmit={e => this.createRecipe(e)}
				>

					<input
            ref={input => this.nom = input}
            value={recipe.nom}
            type="text"
            name="nom"
            placeholder="Nom de la recette"
            onChange={e=>this.editData(e, key)}
          />

					<input
            ref={input => this.image = input}
            value={recipe.image}
            type="text"
            name="image"
            placeholder="Adresse de l'image"
            onChange={e=>this.editData(e, key)}
          />

					<textarea
            ref={input => this.ingredients = input}
            value={recipe.ingredients}
            name="ingredients"
            rows="3"
            placeholder="Liste des ingrédients séparés par une virgule"
            onChange={e=>this.editData(e, key)}
          ></textarea>

					<textarea
            ref={input => this.instructions = input}
            value={recipe.instructions}
            name="instructions"
            rows="15"
            placeholder="Liste des instructions (une par ligne)"
            onChange={e=>this.editData(e, key)}
          ></textarea>
				</form>

        <button onClick={() => this.props.destroyRecipe(key) }>Delete</button>
			</div>
    )
  }

  connexion = provider => {
    base.authWithOAuthPopup(provider, this.tryConnexion);
  };

  logout = () => {
    base.unauth();
    this.setState({ uid: null });
  }

  tryConnexion = (err, authData) => {
    if(err) {
      console.log(err);
      return;
    }

    // Get name of the box
    const boxRef = base.database().ref(this.props.pseudo);

    // Get data from FIREBASE
    boxRef.once('value', snapshot => {
      const data = snapshot.val() || {};

      // Give the box to ther person if nothin inside
      if(!data.owner) {
        boxRef.set({
          owner: authData.user.uid
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  };

  renderLogin = () => {
    return (
      <div className="login">
				<h2>Please login to create your own recipes !</h2>
				<button className="facebook-button" onClick={() => this.connexion('facebook')} >Login with Facebook</button>
				<button className="twitter-button" onClick={() => this.connexion('twitter')} >Login with Twitter</button>
			</div>
    )
  }

  render() {

    // logout
    const logout = <button onClick={this.logout}>Logout!</button>;

    // Check if owner exists
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Is the owner
    if(this.state.uid !== this.state.owner) {
      return (
        <div className="login">
          {this.renderLogin()}
          <p>Your are not the owner of these recipes!</p>
        </div>
      )
    }

    const adminCards = Object
      .keys(this.props.recipes)
      .map(this.renderAdmin)

    return (
      <div className="cards">
        <AddRecipe addRecipe={ this.props.addRecipe }/>
        { adminCards }
        <footer>
          <button onClick={ this.props.loadRecipesExamples }>Load recipies</button>
          {logout}
        </footer>
      </div>
    )
  }
}

Admin.propTypes = {
  recipes: PropTypes.object.isRequired,
  loadRecipesExamples: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  destroyRecipe: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired
}

export default Admin;
