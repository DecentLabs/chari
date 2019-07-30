import { h, Component } from 'preact'

export default class CopyToClipboard extends Component {

  copy = () => {
    const el = document.createElement('textarea');
    el.value = this.props.text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  render({children, _class}) {
    const buttonClass = _class ? `button ${_class}` : 'button secondary'
    return (
      <span class="copy-to-clipboard">
        <button onClick={this.copy} class={buttonClass}>{children}</button>
      </span>
    )
  }
}
