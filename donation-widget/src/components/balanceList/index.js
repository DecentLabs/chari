import { h } from 'preact'

export default ({children, ...props}) => (
  <ul>{props.balanceList.map(balance => (
    <li>{balance.value} {balance.token}</li>
  ))}</ul>
)
