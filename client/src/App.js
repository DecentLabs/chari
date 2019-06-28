import React, { Component } from 'react';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';
import DeployButton from './components/DeployButton';


import './App.css';

// import Navigation from './components/navigation.js'
// import CreateContractForm from './components/createContractForm.js'

const DURATION = 7 * 24 * 60 * 60

class App extends Component {
    state = {
        storageValue: 0,
        web3: null,
        accounts: null,
        contract: null,
        recipient: '0x76E7a0aEc3E43211395bBBB6Fa059bD6750F83c3',
        expDate: Math.floor(Date.now() / 1000) + DURATION,
        donation: '0.01'
    };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();

      this.setState({ web3, accounts, networkId });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
          {/*<Navigation></Navigation>*/}
          {/*<header className="App-header">*/}
          {/*    <h1>Donation Matching</h1>*/}
          {/*    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut labore et dolore magna aliqua.</p>*/}
          {/*    <p>Condimentum lacinia quis vel eros donec ac odio.  <br/>Enim lobortis scelerisque fermentum dui faucibus in ornare. </p>*/}
          {/*</header>*/}

          {/*<section className="App-section">*/}
          {/*    <CreateContractForm></CreateContractForm>*/}
          {/*
          {/*</section>*/}
          <DeployButton
              web3={this.state.web3}
              account={this.state.accounts[0]}
              recipient={this.state.recipient}
              expiration={this.state.expDate}
              donation={this.state.donation}
          />
      </div>
    );
  }
}

export default App;
