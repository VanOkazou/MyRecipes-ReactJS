// React
import React from 'react';

// COMPONENTS
import Header from './Header';
import Admin from './Admin';
import Card from './Card';

// DATA : recipes
import recipes from '../recipes';

// FIREBASE
import base from '../base';

class App extends React.Component {

	state = {
		recipes: {}
	};

	componentWillMount() {
		this.ref = base.syncState( `${this.props.match.params.pseudo}/recettes`, {
				context: this,
				state: 'recipes'
			} );
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	loadRecipesExamples = () => {
		this.setState({ recipes });
	};

	addRecipe = (recipe) => {
		const recipes = {...this.state.recettes};
		const timestamp = Date.now();
		recipes[`recipe-${timestamp}`] = recipe;
		this.setState({ recipes });
	}

	updateRecipe = (key, newRecipe) => {
		const recipes = {...this.state.recettes};
		recipes[key] = newRecipe;
		this.setState({recipes});
	}

	destroyRecipe = (key) => {
		const recipes = {...this.state.recettes};
		recipes[key] = null;
		this.setState({recipes});
	}

	render() {

		let cards = Object
		.keys(this.state.recipes)
		.map(key => <Card key={key} details={ this.state.recipes[key] } />)

		return (
			<div className="box">
				<Header pseudo={ this.props.match.params.pseudo } />

				<div className="cards">
					{ cards }
				</div>

				<Admin
					recipes={ this.state.recipes }
					loadRecipesExamples={ this.loadRecipesExamples }
					addRecipe={ this.addRecipe }
					updateRecipe={ this.updateRecipe }
					destroyRecipe={ this.destroyRecipe }
					pseudo={this.props.match.params.pseudo}
				/>
			</div>
		)
	}
}


export default App;
