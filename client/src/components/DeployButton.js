import React from 'react';
import DonationMatchingJSON from '../contracts/DonationMatching.json'


export default class DeployButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {contract: null};
        this.deploy = this.deploy.bind(this);
    }

    deploy() {
        const abi = DonationMatchingJSON.abi;
        const byteCode = DonationMatchingJSON.bytecode;
        const web3 = this.props.web3;
        const contract = new web3.eth.Contract(abi);
        const {recipient, expiration} = this.props
        const tx = contract.deploy({data: byteCode, arguments: [recipient, expiration]}).send({
            from: this.props.account,
            gas: 2000000
        });
        tx.then((newContractInstance) => {
            console.log(newContractInstance)
            this.setState({
                contract: newContractInstance
            })
        })
    }

    render() {
        const {contract} = this.state

        return (<div>
            <button onClick={this.deploy}>Deploy Contract</button>
            {contract && (<p>
                {contract.options.address}
            </p>)}
        </div>)
    }
}