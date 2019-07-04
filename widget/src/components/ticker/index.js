import { h } from 'preact'
import { ticker, label, value } from './style.scss'

export const Ticker = ({children, ...props}) => {
  const {duration} = props
  if (duration) {
    const days = Math.floor(duration.asDays())
    return (
      <div class={ticker}>
        {days > 0 ? (
          <figure>
            <div class={value}>{days}</div>
            <figcaption class={label}>Days</figcaption>
          </figure>) : ''}
        <figure>
          <div class={value}>{duration.hours()}</div>
          <figcaption class={label}>Hours</figcaption>
        </figure>
        <figure>
          <div class={value}>{duration.minutes()}</div>
          <figcaption class={label}>Minutes</figcaption>
        </figure>
        {days === 0 ? (
          <figure>
            <div class={value}>{duration.seconds()}</div>
            <figcaption class={label}>Seconds</figcaption>
          </figure>) : ''}
      </div>)
  }
}
