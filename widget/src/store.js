import createStore from 'unistore'
import { NETWORKS } from 'shared/constants.js'
import Fundraiser from 'shared/abis/Fundraiser.json'
import Grant from 'shared/abis/Grant.json'
import Eth from 'ethjs'

export const store = createStore({
  fundraiserAddress: null,
  grantAddress: null,
  networkId: null,
  fundraiserContract: null,
  grantContract: null,
  expiration: 0,
  tokens: [],
  fundraiserBalance: [],
  grantBalance: [],
  color: 'pink',
  theme: 'theme-light',
  raised: null,
  hasExpired: false,
  matched: null
})

export const refreshBalance = store.action((state) => {
  const {tokens, fundraiserContract, grantContract} = state
  if (fundraiserContract && grantContract) {
    Promise.all(tokens.map((token) => {
      getBalance(fundraiserContract, token).then(balances => store.setState({
        fundraiserBalance:balances
      }))
      getRaised(fundraiserContract, token).then(raised => store.setState({
        raised: raised
      }))
    }))
    Promise.all(tokens.map((token) => {
      getBalance(grantContract, token).then(balances => store.setState({
        grantBalance: balances
      }))
      getMatched(grantContract, token).then(matched => store.setState({
        matched: matched
      }))
    }))
  }
})

export const setTheme = store.action((state, color, theme) => {
  if (color) {
    const c = `#${color}`
    store.setState({color: c})
    const root = document.documentElement;
    root.style.setProperty('--widget-color', c);
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
    const fundraiserContract = new eth.contract(Fundraiser).at(fundraiserAddress)

    fundraiserContract.grant().then(result => {
      const grantAddress = result[0]
      const grantContract = new eth.contract(Grant).at(grantAddress)

      store.setState({
        grantContract: grantContract,
        grantAddress: grantAddress
      });

      refreshBalance()
    })

    fundraiserContract.expiration().then(result => {
      const expiration = result[0]
      store.setState({expiration: expiration.toNumber()})
    })
    fundraiserContract.hasExpired().then((res) => {
      store.setState({
        hasExpired: res[0]
      })
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

function getRaised (contract, token) {
  return contract.raised(token.tokenAddress).then((res) => {
    const raised = convert(token.decimals, res[0])
    return {value: raised, token: token.token}
  })
}

function getMatched(contract, token) {
  return contract.matched(token.tokenAddress).then((res) => {
    const matched = convert(token.decimals, res[0])
    return { value: matched, token: token.token}
  })
}


function getBalance(contract, tokenInfo) {
  const {token, tokenAddress, decimals} = tokenInfo

  return contract.tokenBalance(tokenAddress).then(result => {
    const balance = convert(decimals, result[0])
    return {value: balance, token: token}
  })
}

function convert (decimals, result) {
  if (decimals) {
    let DEC_DIV = decimals
    if (decimals > 5) {
      result = result.div(new Eth.BN(Math.pow(10, decimals - 5)))
      DEC_DIV = 5
    }
    result = result.toNumber() / Math.pow(10, DEC_DIV)
    return result
  }
}
