import { h, Component } from 'preact'
export default class Balance extends Component {
  state = { balance: null }
  componentDidUpdate() {
    const {contract, token, tokenAddress, decimals} = this.props
    if(contract && token && tokenAddress && this.state.balance === null) {
      contract.methods.tokenBalance(tokenAddress).call().then(result => {
        let balance = result;
        if(decimals) {
          let DEC_DIV = decimals
          if(decimals > 5) {
            balance = balance.div(Math.pow(10,decimals - 5))
            DEC_DIV = 5;
          }
          balance = balance.toNumber() / Math.pow(10, DEC_DIV);
        }
        this.setState({balance})
      })
    }
  }

  render({token}, {balance}) {
    if(balance && !balance!== 0) {
      return (<li>{balance.toString()} {token}</li>)
    }
  }
}
