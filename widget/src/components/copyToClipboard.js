import { h, Component } from 'preact'
import copy from 'shared/scripts/CopyToClipboard'

export default class CopyToClipboard extends Component {

  render({children, _class}) {
    const buttonClass = _class ? `button ${_class}` : 'button secondary'
    return (
      <span class="copy-to-clipboard">
        <button onClick={e => {copy(this.props.text)}} class={buttonClass}>{children}</button>
      </span>
    )
  }
}
