import { h } from 'preact'

export const Ticker = ({children, duration}) => {
  if (duration) {
    const {days, hours, minutes, seconds} = duration;
    return (
      <div class={ticker}>
        {days > 0 ? (
          <figure class={tickerItem}>
            <div class={value}>{days}</div>
            <figcaption class={label}>Days</figcaption>
          </figure>) : ''}
        <figure class={tickerItem}>
          <div class={value}>{hours}</div>
          <figcaption class={label}>Hours</figcaption>
        </figure>
        <figure class={tickerItem}>
          <div class={value}>{minutes}</div>
          <figcaption class={label}>Minutes</figcaption>
        </figure>
        {days === 0 ? (
          <figure class={tickerItem}>
            <div class={value}>{seconds}</div>
            <figcaption class={label}>Seconds</figcaption>
          </figure>) : ''}
      </div>)
  }
}
