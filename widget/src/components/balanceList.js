import { h } from 'preact'

export default ({children, ...props}) => {
  return (
    <div class="balanceList">
      <ul>
        {props.balanceList.map(balance => (
          balance.value ? (<li>{balance.value} {balance.token}</li>) : ''
        ))}
      </ul>
      <progress value="10" max="100"></progress>
    </div>
  )
}
