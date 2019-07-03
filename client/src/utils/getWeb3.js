import Web3 from "web3";
import Portis from '@portis/web3';

const PORTIS_APP = 'e6abccd4-951c-42b8-9ca1-57108cc64f7d'
const PORTIS_NETWORK = 'rinkeby'

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to portis
      else {
        const portis = new Portis(PORTIS_APP, PORTIS_NETWORK)
        portis.provider.enable()
        const web3 = new Web3(portis.provider);

        resolve(web3);
      }
  });

export default getWeb3;
