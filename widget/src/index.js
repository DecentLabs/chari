import { h, Component } from 'preact'
import Donation from './components/donation'
import Contribution from './components/contribution'
import { Router } from 'preact-router'
import { Provider } from 'unistore/preact'
import { store, init } from './store.js'
import { createHashHistory } from 'history';

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
