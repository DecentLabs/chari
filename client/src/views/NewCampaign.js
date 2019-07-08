import React from "react"
import  { Route, Switch, Redirect} from "react-router-dom"
import styles from './../styles/NewCampaign.module.css'
import {connect} from 'react-redux'

import WidgetEditor from './WidgetEditor.js'
import CreateContractForm from './CreateContractForm.js'
import AddFund from './AddFund.js'
import Congrats from './Congrats.js'
import LoaderComp from './../components/loaderComp.js'

class NewCampaign extends React.Component {
  render () {
    return (
      <div className={styles.newCampaign}>
        {!this.props.isLoading && !this.props.isDeploying && (
          <div>
              <Switch>
              <Route path="/campaign/deploy" component={CreateContractForm} />
              <Route path="/campaign/congrats/:address" component={Congrats} />
              <Route path="/campaign/admin/:address" component={WidgetEditor} />
              <Route path="/campaign/addfund/:address" component={AddFund} />
              </Switch>
          </div>
        )}

        {this.props.isLoading && (
          <LoaderComp>
              <h1 className="subtitle">Connecting to your wallet</h1>
          </LoaderComp>
        )}

        {this.props.isDeploying && (
          <LoaderComp>
            <h1 className="subtitle">Your campaign is currently being created</h1>
          </LoaderComp>
        )}

        {this.props.isDeployed && (
            <Redirect to={`/campaign/congrats/${this.props.fundraiser}`} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.web3Connect.isConnected,
    isLoading: state.web3Connect.isLoading,
    isDeploying: state.web3Connect.isDeploying,
    isDeployed: state.web3Connect.isDeployed,
    fundraiser: state.web3Connect.fundraiser
  }
}

export default connect(mapStateToProps)(NewCampaign)
