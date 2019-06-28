import React from 'react';

class DeployButton extends React.Component {
    constructor (props) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    render() {
        <button onClick={onClick}>Deploy Contract</button>
    }
}