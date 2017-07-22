// React
import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {

  render() {

    const ingredients = this.props.details.ingredients
      .split(',')
      .map((item, key) => <li key={ key }>{ item }</li>);

    const instructions = this.props.details.instructions
      .split('\n')
      .map((item, key) => <li key={ key }>{ item }</li>);

    return (
      <div className="card">
        <div className="image">
          <img src={ this.props.details.image } alt={ this.props.details.nom } />
        </div>
        <div className="recette">
          <h2>{ this.props.details.nom }</h2>
          <ul className="liste-ingredients">
            { ingredients }
          </ul>
          <ol className="liste-instructions">
            { instructions }
          </ol>
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  details: PropTypes.object.isRequired
}

export default Card;
