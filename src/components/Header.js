// REACT
import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {

  convertPseudo = pseudo => {
    return /[aeiouy]/i.test(pseudo[0]) ? `d'${ pseudo }` : `de ${ pseudo }`;
  }

  render() {
    return (
      <header>
        <h1>La boite à recette { this.convertPseudo(this.props.pseudo) }</h1>
      </header>
    )
  }
}

Header.propTypes = {
  pseudo: PropTypes.string.isRequired
}

export default Header;
