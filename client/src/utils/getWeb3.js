import Web3 from "web3";
import Portis from '@portis/web3';

const searchParams = new URLSearchParams(window.location.search)
const portis_network = searchParams.get('portis_network')
const PORTIS_APP = '98a39edb-e9d0-4b58-96b6-89227c762f7a'
const PORTIS_NETWORK = portis_network || 'mainnet'

console.log('portis network', PORTIS_NETWORK)


const makeWeb3 = (provider) => new Web3(provider, null, {
  transactionConfirmationBlocks: 1
})


const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = makeWeb3(window.ethereum)
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
        await portis.provider.enable()
        const web3 = makeWeb3(portis.provider)

        resolve(web3);
      }
  });

export default getWeb3;
