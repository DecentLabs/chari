import createStore from 'unistore'
import { NETWORKS } from './constants.js'
import Fundraiser from '../../deployments/Fundraiser.json'
import Grant from '../../deployments/Grant.json'
import Web3 from 'Web3'

export const store = createStore({
  fundraiserAddress: null,
  networkId: null,
  fundraiserContract: null,
  grantContract: null,
  expiration: 0,
  tokens: [],
  fundraiserBalance: [],
  grantBalance: []
})

export const refreshBalance = store.action((state) => {
  const {tokens, fundraiserContract, grantContract} = state
  if (fundraiserContract && grantContract) {
    Promise.all(tokens.map(token => getBalance(fundraiserContract, token))).then(balances => store.setState({
      fundraiserBalance:balances
    }))
    Promise.all(tokens.map(token => getBalance(grantContract, token))).then(balances => store.setState({
      grantBalance: balances
    }))
  }
})

export const init = store.action((state, fundraiserAddress, networkId) => {
  const network = parseInt(networkId, 10)
  if (NETWORKS.has(network)) {
    const {url, tokens} = NETWORKS.get(network)
    const provider = new Web3.providers.HttpProvider(url)
    const web3 = new Web3(provider)
    const fundraiserContract = new web3.eth.Contract(Fundraiser.abi, fundraiserAddress)

    fundraiserContract.methods.grant().call().then(grantAddress => {
      const grantContract = new web3.eth.Contract(Grant.abi, grantAddress)
      store.setState({grantContract});
      refreshBalance()
    })

    fundraiserContract.methods.expiration().call().then(expiration => {
      store.setState({expiration: expiration.toNumber()})
    })
    return {
      fundraiserAddress,
      networkId,
      fundraiserContract,
      tokens
    }
  }
  return {}
})


function getBalance(contract, tokenInfo) {
  const {token, tokenAddress, decimals} = tokenInfo

  return contract.methods.tokenBalance(tokenAddress).call().then(result => {
    let balance = result
    if (decimals) {
      let DEC_DIV = decimals
      if (decimals > 5) {
        balance = balance.div(Math.pow(10, decimals - 5))
        DEC_DIV = 5
      }
      balance = balance.toNumber() / Math.pow(10, DEC_DIV)
    }
    return {value: balance.toString(), token: token}
  })
}
