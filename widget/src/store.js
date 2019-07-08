import createStore from 'unistore'
import { NETWORKS } from 'shared/constants.js'
import Fundraiser from 'shared/abis/Fundraiser_ABI_97a43d1a19a9dc40580696887486437d.json'
import Grant from 'shared/abis/Grant_ABI_abe03ad4ff197414ebc39eb6d0a03042.json'
import Eth from 'ethjs'

export const store = createStore({
  fundraiserAddress: null,
  networkId: null,
  fundraiserContract: null,
  grantContract: null,
  expiration: 0,
  tokens: [],
  fundraiserBalance: [],
  grantBalance: [],
  color: 'pink',
  theme: 'theme-light'
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

export const setTheme = store.action((state, color, theme) => {
  if (color) {
    store.setState({color: color})
    const root = document.documentElement;
    root.style.setProperty('--widget-color', color);
  }
  if (theme) {
    store.setState({theme: theme})
  }
})

export const init = store.action((state, fundraiserAddress, networkId) => {
  const network = parseInt(networkId, 10)
  if (NETWORKS.has(network)) {
    const {url, tokens} = NETWORKS.get(network)
    const provider = new Eth.HttpProvider(url)
    const eth = new Eth(provider)
    const fundraiserContract = new eth.contract(Fundraiser.abi).at(fundraiserAddress)

    fundraiserContract.grant().then(result => {
      const grantAddress = result[0]
      const grantContract = new eth.contract(Grant.abi).at(grantAddress)
      store.setState({grantContract});
      refreshBalance()
    })

    fundraiserContract.expiration().then(result => {
      const expiration = result[0]
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

  return contract.tokenBalance(tokenAddress).then(result => {
    let balance = result[0]
    if (decimals) {
      let DEC_DIV = decimals
      if (decimals > 5) {
        balance = balance.div(new Eth.BN(Math.pow(10, decimals - 5)))
        DEC_DIV = 5
      }
      balance = balance.toNumber() / Math.pow(10, DEC_DIV)
    }
    return {value: balance, token: token}
  })
}
