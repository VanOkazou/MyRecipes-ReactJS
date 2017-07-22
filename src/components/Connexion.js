// REACT
import React from 'react';

class Connexion extends React.Component {

  goToApp = e => {
    e.preventDefault();

    // Get the pseudo
    const pseudo = this.boxInput.value;

    // Change Url
    this.props.history.push(`/recipes/${pseudo}`);
  }

  render() {
    return (
      <div className="connexionBox">
				<form className="connexion" onSubmit={ e => this.goToApp(e) } >
					<h1>Ma Boîte à Recettes</h1>
					<input
            type="text"
            placeholder="Nom du Chef"
            pattern="[A-Za-z-]{1,}"
            required
            ref={(input) => {this.boxInput = input}}
          />
					<button type="submit">GO</button>
					<p>Pas de caractères spéciaux.</p>
				</form>
			</div>
    )
  }
}

export default Connexion;
