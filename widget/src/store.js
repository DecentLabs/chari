import createStore from 'unistore'
import { NETWORKS } from 'shared/constants.js'
import Fundraiser from 'shared/abis/Fundraiser.json'
import Grant from 'shared/abis/Grant.json'
import Eth from 'ethjs'
import QRCode from 'qrcode'

export const store = createStore({
  fundraiserAddress: null,
  grantAddress: null,
  networkId: null,
  fundraiserContract: null,
  sponsored: null,
  grantContract: null,
  expiration: 0,
  tokens: [],
  fundraiserBalance: [],
  grantBalance: [],
  color: 'pink',
  theme: 'theme-light',
  raised: null,
  hasExpired: null,
  matched: null,
  selectedToken: null
})

export const refreshBalance = store.action((state) => {
  const {fundraiserContract, grantContract, selectedToken} = state
  if (fundraiserContract && grantContract) {

    Promise.all([
      getBalance(fundraiserContract, selectedToken),
      getBalance(grantContract, selectedToken),
      getRaised(fundraiserContract, selectedToken),
      getMatched(grantContract, selectedToken),
      getSponsored(grantContract, selectedToken)
    ]).then(balances => store.setState({
        fundraiserBalance: balances[0],
        grantBalance: balances[1],
        raised: balances[2],
        matched: balances[3],
        sponsored: balances[4]
      }))
  }
})

export const init = store.action((state, fundraiserAddress, networkId, tokenName) => {
  const network = parseInt(networkId, 10)
  if (NETWORKS.has(network) &&
    (state.networkId !== network || state.fundraiserAddress !== fundraiserAddress)) {

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
      })

      refreshBalance()
    }).then(() => fundraiserContract.expiration())
      .then(result => {
        const expiration = result[0].toNumber()
        const hasExpired = expiration < (Date.now() / 1000)
        store.setState({
          expiration: expiration,
          hasExpired
        })

        if(!hasExpired) {
          setInterval(() => {
            refreshBalance()
          }, 5000)
        }
      })

    QRCode.toDataURL(fundraiserAddress, {version: 3}).then(url => {
      store.setState({qrcode: url})
    })

    let selectedToken = tokens.find(t => t.token === tokenName)
    if(!selectedToken) {
      selectedToken = tokens.find(t => t.token === 'ETH')
    }


    return {
      fundraiserAddress,
      networkId: network,
      fundraiserContract,
      tokens,
      selectedToken
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

function getMatched (contract, token) {
  return contract.matched(token.tokenAddress).then((res) => {
    const matched = convert(token.decimals, res[0])
    return {value: matched, token: token.token}
  })
}

function getSponsored (contract, tokenInfo) {
  const {token, tokenAddress, decimals} = tokenInfo

  return contract.sponsored(tokenAddress).then(result => {
    const balance = convert(decimals, result[0])
    return {value: balance, token: token}
  })
}

function getBalance (contract, tokenInfo) {
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
