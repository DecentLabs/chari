import React from 'react';
import { connect } from 'react-redux'
import {deploy} from './../reducers/web3Connect.js'

import Button from './button.js'

class DeployButton extends React.Component {
    constructor (props) {
        super(props);
        this.deploy = this.deploy.bind(this);
    }

    deploy() {
      this.props.dispatch(deploy())
    }

    render() {
        return (<Button state="deploy" onClick={this.deploy} disabled={this.props.disabled}>Create</Button>)
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3
});

export default connect(mapStateToProps)(DeployButton);
