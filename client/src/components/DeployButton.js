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
        const disabled = !this.props.web3;

        return (<div>
            <Button onClick={this.deploy} disabled={disabled}>Yes, let's do it!</Button>
        </div>)
    }
}

const mapStateToProps = state => ({
    web3: state.web3Connect.web3
});

export default connect(mapStateToProps)(DeployButton);
