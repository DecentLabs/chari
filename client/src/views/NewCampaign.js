import React from "react"
import  { Route, Switch, Redirect} from "react-router-dom"
import styles from './../styles/NewCampaign.module.css'
import {connect} from 'react-redux'

// import CreateCampaignNav from './../components/createCampaignNav.js'

import WidgetEditor from './WidgetEditor.js'
import CreateContractForm from './../components/createContractForm.js'
import LoaderComp from './../components/loaderComp.js'


class NewCampaign extends React.Component {
  render () {
    return (
      <div className={styles.newCampaign}>
          <div>
            {!this.props.isLoading && !this.props.isDeploying && (
              <Switch>
                <Route path="/campaign/deploy" component={CreateContractForm} />
                <Route path="/campaign/admin" component={WidgetEditor} />
              </Switch>
            )}
          </div>

        {this.props.isDeployed && (
            <Redirect to='/campaign/admin' />
        )}

        {this.props.isLoading && (
          <LoaderComp>
            Connecting to your wallet
          </LoaderComp>
        )}

        {this.props.isDeploying && (
          <LoaderComp>
            Your campaign is currently being created
          </LoaderComp>
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
    isDeployed: state.web3Connect.isDeployed
  }
}

export default connect(mapStateToProps)(NewCampaign)
