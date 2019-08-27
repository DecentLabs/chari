import Web3 from "web3";
import Portis from '@portis/web3';
import {PORTIS_APP, NETWORKS} from 'shared/constants.js'
import Fundraiser from 'shared/abis/Fundraiser.json'

const searchParams = new URLSearchParams(window.location.search)
const portis_network = searchParams.get('portis_network')
const PORTIS_NETWORK = portis_network || 'mainnet'

console.log('portis network', PORTIS_NETWORK)

const readOnlyWeb3 = new Map();

export const hasExpired = async (networkId, address) => {
  let web3 = readOnlyWeb3.get(networkId);
  if(!web3) {
    const url = NETWORKS.get(networkId).url
    web3 = new Web3(url);
    readOnlyWeb3.set(networkId, web3)
  }

  const contract = new web3.eth.Contract(Fundraiser, address)
  const result = await contract.methods.hasExpired().call();

  return result;
}

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
