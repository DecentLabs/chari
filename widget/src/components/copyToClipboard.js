import { h, Component } from 'preact'
import { copyToClipboard } from 'shared/utils/copyToClipboard'

export default class CopyToClipboard extends Component {

  render({children, _class}) {
    const buttonClass = _class ? `button ${_class}` : 'button secondary'
    return (
      <span class="copy-to-clipboard">
        <button onClick={e => {copyToClipboard(this.props.text)}} class={buttonClass}>{children}</button>
      </span>
    )
  }
}
