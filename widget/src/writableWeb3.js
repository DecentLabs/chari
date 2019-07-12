import Eth from 'ethjs'
import {PORTIS_APP, NETWORKS} from 'shared/constants.js'
import IERC20 from 'shared/abis/IERC20.json'

const getPortis = (networkId) => new Promise((resolve) => {
  import('@portis/web3').then(portis => {
    resolve(portis)
  })
})

let eth = null

export const getEth = async (networkId) => {
  if(eth === null) {
    const network = NETWORKS.get(parseInt(networkId, 10))
    let provider = null
    if (window.ethereum) {
      provider = window.ethereum
      eth = provider.enable().then(() => new Eth(provider));
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      provider = window.web3
      eth = Promise.resolve(new Eth(provider))
    }
    // Fallback to portis
    else {
      let portis = null;
      eth = getPortis(networkId)
          .then(Portis => new Portis(PORTIS_APP, network.portisName))
          .then(_portis => {
            portis = _portis;
            return portis.provider.enable()
          })
          .then(() => new Eth(portis.provider))
    }
  }
  return eth
}


export const transferEth = (networkId, to, amountInEther) => getEth(networkId)
  .then(eth => eth.accounts()
    .then(acc => {
      const account = acc[0]
      return eth.sendTransaction({
        from:account,
        to,
        value:Eth.toWei(amountInEther,'ether'),
        gas: '3000000',
        data: null
      })
    })
  )

export const transferToken = (networkId, to, amountInToken, token) => getEth(networkId)
  .then(eth =>  eth.accounts()
    .then(acc => {
      const account = acc[0]
      const decimals = token.decimals
      const tokenContract = new eth.contract(IERC20).at(token.tokenAddress)
      return tokenContract.transfer(to, amountInToken * Math.pow(10, decimals),{from:account})
    }))
