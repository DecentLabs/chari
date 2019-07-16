import React from 'react';
import { TwitterPicker } from 'react-color';
import { Link } from 'react-router-dom';
import styles from './../styles/widgetEditor.module.css';

import Button from './../components/button.js';
import Select from './../components/select.js';
import copy from './../assets/copy.svg';

import IframeContainer from './../components/iframeContainer.js'

import { NETWORKS } from 'shared/constants.js';
import { makeClientUrl, makeWidgetUrl } from '../utils/makeUrl.js'

class WidgetEditor extends React.Component {
    constructor (props) {
        super(props);
        this.selectTheme = this.selectTheme.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.selectToken = this.selectToken.bind(this);
        this.iframeLoaded = this.iframeLoaded.bind(this);
        this.toggleColorSelector = this.toggleColorSelector.bind(this);
        this.history = this.props.history;
        this.state = {
            color: this.props.match.params.color,
            theme: this.props.match.params.theme,
            token: this.props.match.params.token,
            address: this.props.match.params.address,
            networkId: this.props.match.params.networkId,
            iframeLoading: true,
            showColorSelector: false,
        };
    }

    setHistoryState(o) {
        const newState = Object.assign(this.state, o)
        const {address, networkId, color, theme, token} = newState;
        this.history.push(makeClientUrl('admin',address, networkId, color, theme, token))
    }

    selectTheme (e) {
        this.setHistoryState({theme: e.target.value})
    }

    selectColor (color) {
        if (this.state.color !== color.hex) {
            this.setHistoryState({color:color.hex})
        }
    }

    selectToken (e) {
        this.setHistoryState({token: e.target.value})
    }

    toggleColorSelector () {
        const newState = !this.state.showColorSelector;
        this.setState({
            showColorSelector: newState,
        });
    }

    copyCode () {
        const toCopy = document.querySelector('textarea#chari-widget-code');
        toCopy.select();
        document.execCommand('copy');
    }

    iframeLoaded () {
        this.setState({
            iframeLoading: false,
        });
    }

    render () {
        const {address, networkId, color, theme, token} = this.state;
        const iframeUrl = makeWidgetUrl(address, networkId, color, theme, token)

        const themeOptions = [
            {value: 'dark', name: 'Dark theme'},
            {value: 'light', name: 'Light theme'},
        ];

        const tokenOptions = NETWORKS.get(parseInt(networkId)).tokens.map(i => ({
            value: i.token,
            name: i.token,
        }));

        const textareaContent = `<iframe src="${iframeUrl}" title="chari-widget" width="320px" height="435px" style="border-radius: 4px; border: none"></iframe>`

        return (
            <div className={styles.widgetEditor}>
                <header>
                    <h1 className="subtitle">Manage your fundraiser</h1>
                    <h2 className="subtitle">Edit your widget</h2>
                    <p className={styles.description}>You can manage your fundraiser widget from here, customize it and
                        also copy the code necessary to
                        embed it on your website.</p>
                    <Link to={makeClientUrl('details',address, networkId, color, theme, token)} className={styles.backLink}>Back to
                        fundraiser</Link>
                </header>
                <div className={styles.widget}>

                    <IframeContainer title="Chari-widget" url={iframeUrl} loading={this.state.iframeLoading} loaded={this.iframeLoaded} />

                    <div className={styles.settings}>
                        <Select options={tokenOptions} label="Please select token to pay with"
                                onChange={this.selectToken} />

                        <Select options={themeOptions} label="Please select widget theme"
                                onChange={this.selectTheme} />

                        <div className={styles.colorPickerCont}>
                            <Button state={this.state.showColorSelector ? 'close' : 'open'}
                                    onClick={this.toggleColorSelector} colorSelector colorData={'#'+this.state.color}>Please
                                select color</Button>
                            {this.state.showColorSelector && (
                                <TwitterPicker
                                    className={styles.picker}
                                    color={this.state.color}
                                    onChangeComplete={this.selectColor}
                                />
                            )}
                        </div>

                        <div className={styles.codeContainer}>
                            <textarea readOnly value={textareaContent} id="chari-widget-code" />
                            <Button copy onClick={this.copyCode}>Copy embed code<img src={copy} alt="copy code"/></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WidgetEditor;
