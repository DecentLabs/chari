import { h, Component } from 'preact'
import Donation from './components/donation.js'
import Contribution from './components/contribution.js'
import Expired from './components/expired.js'
import Loader from './components/loader.js'
import { Router } from 'preact-router'
import { Provider } from 'unistore/preact'
import { store, init } from './store.js'
import { createHashHistory } from 'history';
import {THEMES, ROUTES} from './constants.js'
import "./index.css"
import "./styles.scss"

let poly = require('preact-cli/lib/lib/webpack/polyfills')

class App extends Component {

  state = {theme:THEMES[0]}

  setTheme = (color, theme) => {
    if (color) {
      const c = `#${color}`
      store.setState({color: c})
      const root = document.documentElement;
      root.style.setProperty('--widget-color', c);
    }
    if (theme) {
      this.setState({theme: theme})
    }
  }

  /** Gets fired when the route changes.
   *  @param {Object} event    "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url  The newly routed URL
   */
  handleRoute = () => {
    if(location.search) {
      const searchParams = new URLSearchParams(location.search)
      const address = searchParams.get('address')
      const network = searchParams.get('network')
      const token = searchParams.get('token') || undefined
      const color = searchParams.get('color')
      const theme = searchParams.get('theme')
      this.setTheme(color, theme)
      init(address, network, token);
    }
  }

  render ({},{theme}) {
    return (
      <div className="donation" id="DonationWidget" data-theme={theme} data-view="donation">
        <Router onChange={this.handleRoute} history={createHashHistory()}>
          <Loader path="/"/>
          <Donation path={ROUTES.DONATION} />
          <Contribution path={ROUTES.CONTRIBUTION} />
          <Expired path={ROUTES.EXPIRED} />
        </Router>
      </div>
    )
  }
}

export default () => (
  <Provider store={store}>
    <App/>
  </Provider>
)
