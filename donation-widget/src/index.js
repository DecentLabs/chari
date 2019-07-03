let poly = require("preact-cli/lib/lib/webpack/polyfills");

import Donation from "./components/donation";

var searchParams = new URLSearchParams(location.search);

const App = () => (
  <Donation fundraiser={searchParams.get('address')}
            network={searchParams.get('network')} />
);

export default App
