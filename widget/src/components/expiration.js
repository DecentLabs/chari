import { h, Component } from 'preact'
import { Ticker } from './ticker.js'

const DAY = 86400;
const HOUR = 3600;
const MINUTE = 60;

export default class Expiration extends Component {
  state = {time: null}

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({time: Math.floor(Date.now() / 1000)})
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render ({at}, {time}) {
    let duration = false
    if (at && time) {
      const diff = Math.max(at - time, 0)
      if (diff > 0) {
        duration = {}
        duration.days = Math.floor(diff / DAY)
        duration.hours = Math.floor( (diff - duration.days * DAY) / HOUR )
        duration.minutes = Math.floor( (diff - duration.days * DAY - duration.hours * HOUR) / MINUTE )
        duration.seconds = diff - duration.days * DAY - duration.hours * HOUR - duration.minutes * MINUTE;
      }
    }
    return (
      <div class="expiration">
        <Ticker duration={duration}/>
        <div class="campaignEnds">Campaign ends {(new Date(at * 1000)).toLocaleString('en-US',{timeZone:'UTC',timeZoneName:'short', year:'numeric', month:'long', day:'numeric', hour:'numeric', minute:'numeric'})}</div>
      </div>)
  }
}
