import React from "react"
import  { Route, Switch, Redirect} from "react-router-dom"
import styles from './../styles/NewCampaign.module.css'
import {connect} from 'react-redux'
import {setupWeb3} from './../reducers/web3Connect.js'

import CreateCampaignNav from './../components/createCampaignNav.js'

import WidgetEditor from './WidgetEditor.js'
import AddFund from './AddFund.js'
import CreateContractForm from './../components/createContractForm.js'
import LoaderComp from './../components/loaderComp.js'


class NewCampaign extends React.Component {
  componentDidMount () {
    if (!this.props.isLoading && !this.props.isConnected) {
      this.props.dispatch(setupWeb3())
    }
  }

  render () {
    console.log(this.props);
    return (
      <div className={styles.newCampaign}>
        {this.props.isConnected && !this.props.isLoading && !this.props.isDeploying && (
          <div>
            <CreateCampaignNav></CreateCampaignNav>
            <Switch>
              <Route path="/new/deploy" component={CreateContractForm} />
              <Route path="/new/widget" component={WidgetEditor} />
              <Route path="/new/fund" component={AddFund} />
            </Switch>
          </div>
        )}

        {this.props.isDeployed && (
            <Redirect to='/new/fund' />
        )}

        {!this.props.isConnected && (
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
    isDeploying: state.web3Connect.isDeploying
  }
}

export default connect(mapStateToProps)(NewCampaign)
