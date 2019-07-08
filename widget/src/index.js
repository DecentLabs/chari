import { h, Component } from 'preact'
import Donation from './components/donation'
import Contribution from './components/contribution'
import { Router, route } from 'preact-router'
import { Provider, connect } from 'unistore/preact'
import { store, init, setTheme } from './store.js'
import { createHashHistory } from 'history';
import "./index.css"
import "./styles.scss"

let poly = require('preact-cli/lib/lib/webpack/polyfills')

class App extends Component {

  /** Gets fired when the route changes.
   *  @param {Object} event    "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url  The newly routed URL
   */
  handleRoute = () => {
    if(location.search) {
      const searchParams = new URLSearchParams(location.search);
      const address = searchParams.get('address')
      const network = searchParams.get('network')
      const color = searchParams.get('color')
      const theme = searchParams.get('theme')
      setTheme(color, theme)
      init(address, network);
    }
  }

  render () {
    return (
        <Router onChange={this.handleRoute} history={createHashHistory()}>
          <Donation path="/"/>
          <Contribution path="/contribution/"/>
        </Router>
    )
  }
}

export default () => (
  <Provider store={store}>
    <App/>
  </Provider>
)
