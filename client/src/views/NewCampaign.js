import React from "react"
import  { Route, Switch, Redirect} from "react-router-dom"
import styles from './../styles/NewCampaign.module.css'
import {connect} from 'react-redux'

import WidgetEditor from './WidgetEditor.js'
import CreateContractForm from './CreateContractForm.js'
import AddFund from './AddFund.js'
import LoaderComp from './../components/loaderComp.js'
import CampaignDetails from './CampaignDetails.js'

class NewCampaign extends React.Component {
  render () {
    return (
      <div className={styles.newCampaign}>
        {!this.props.isLoading && !this.props.isDeploying && (
          <div>
              <Switch>
                <Route path="/campaign/deploy" component={CreateContractForm} />
                <Route path="/campaign/:address/:networkId/:token?/details/" component={CampaignDetails} />
                <Route path="/campaign/:address/:networkId/:token?/admin/" component={WidgetEditor} />
                <Route path="/campaign/:address/:token?/addfund/" component={AddFund} />
              </Switch>
          </div>
        )}

        {this.props.isLoading && (
          <LoaderComp>
              <h1 className="subtitle">Connecting to your wallet</h1>
          </LoaderComp>
        )}

        {this.props.isDeploying && (
          <LoaderComp subtitle={this.props.transactionHash ? 'Deploying smart contract to the Ethereum blockchain...' : null}>
            <h1 className="subtitle">Your fundraiser is being created</h1>
          </LoaderComp>
        )}

        {this.props.isDeployed && (
            <Redirect to={`/campaign/${this.props.fundraiser}/${this.props.networkId}/details`} />
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
    fundraiser: state.web3Connect.fundraiser,
    networkId: state.web3Connect.networkId,
    transactionHash: state.web3Connect.transactionHash
  }
}

export default connect(mapStateToProps)(NewCampaign)
