import React, { Component } from 'react';
import store from "./store.js";
import { setupWeb3 } from "./reducers/web3Connect";

import Navigation from './components/navigation.js'
import CreateContractForm from './components/createContractForm.js'

import "./App.css";

class App extends Component {

  componentDidMount = async () => {
    try {
        store.dispatch(setupWeb3())
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {

    return (
      <div className="App">
        <Navigation></Navigation>
        <header className="App-header">
          <h1>Donation Matching</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut labore et dolore magna aliqua.</p>
          <p>Condimentum lacinia quis vel eros donec ac odio.  <br/>Enim lobortis scelerisque fermentum dui faucibus in ornare. </p>
        </header>
        <section className="App-section">
          <CreateContractForm></CreateContractForm>
        </section>
      </div>
    );
  }
}

export default App
