import { h, Component } from 'preact'
import moment from 'moment'
import { Ticker } from '../ticker'

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
      const diff = Math.max(at - time, 0) * 1000
      if (diff > 0) {
        duration = moment.duration(diff)
      }
    }
    return (
      <div class="expiration">
        <Ticker duration={duration}/>
        <div class="campaignEnds">Campaign ends {moment(at * 1000).format("Do MMMM, YYYY h:mm a")}</div>
      </div>)
  }
}
