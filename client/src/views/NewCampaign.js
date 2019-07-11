import React from "react"
import  { Route, Switch, Redirect} from "react-router-dom"
import styles from './../styles/NewCampaign.module.css'
import {connect} from 'react-redux'

import WidgetEditor from './WidgetEditor.js'
import CreateContractForm from './CreateContractForm.js'
import AddFund from './AddFund.js'
import LoaderComp from './../components/loaderComp.js'
import CampaignDetails from './CampaignDetails.js'
import { makeClientUrl } from '../utils/makeUrl.js'

class NewCampaign extends React.Component {
  render () {
    return (
      <div className={styles.newCampaign}>
        {!this.props.isLoading && !this.props.isDeploying && (
          <div>
              <Switch>
                <Redirect from="/campaign/:address/:networkId/details/" to={makeClientUrl('details',':address', ':networkId')} />
                <Redirect from="/campaign/:address/:networkId/admin/" to={makeClientUrl('admin',':address', ':networkId')} />
                <Redirect from="/campaign/:address/addfund/" to={makeClientUrl('addfund',':address', this.props.networkId)} />
                <Route path="/campaign/deploy" component={CreateContractForm} />
                <Route path={makeClientUrl('details',':address', ':networkId', ':color', ':theme' ,':token')} component={CampaignDetails} />
                <Route path={makeClientUrl('admin',':address', ':networkId', ':color', ':theme' ,':token')} component={WidgetEditor} />
                <Route path={makeClientUrl('addfund',':address', ':networkId', ':color', ':theme' ,':token')} component={AddFund} />
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
          <Redirect to={makeClientUrl('details',this.props.fundraiser, this.props.networkId)} />
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
