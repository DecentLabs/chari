import React from 'react';
import { TwitterPicker } from 'react-color';
import { Link } from 'react-router-dom';
import styles from './../styles/widgetEditor.module.css';
import cfg from './../shared/cfg.js';

import Button from './../components/button.js';
import Select from './../components/select.js';
import LoaderComp from './../components/loaderComp.js';
import copy from './../assets/copy.svg';

import { NETWORKS } from '../shared/constants.js';

class WidgetEditor extends React.Component {
    constructor (props) {
        super(props);
        this.selectTheme = this.selectTheme.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.selectToken = this.selectToken.bind(this);
        this.iframeLoaded = this.iframeLoaded.bind(this);
        this.toggleColorSelector = this.toggleColorSelector.bind(this);

        this.state = {
            color: '#02DB96',
            theme: 'light',
            token: '',
            iframeLoading: true,
            showColorSelector: false,
        };
    }

    selectTheme (e) {
        this.setState({
            theme: e.target.value,
            iframeLoading: true,
        });
    }

    selectColor (color) {
        this.setState({
            color: color.hex,
            iframeLoading: true,
        });
    }

    selectToken (e) {
        this.setState({
            token: e.target.value,
            iframeLoading: true,
        });
    }

    toggleColorSelector () {
        const newState = !this.state.showColorSelector;
        this.setState({
            showColorSelector: newState,
        });
    }

    copyCode () {
        const toCopy = document.querySelector('textarea#widget-code');
        toCopy.select();
        document.execCommand('copy');
    }

    iframeLoaded () {
        this.setState({
            iframeLoading: false,
        });
    }

    render () {
        const address = this.props.match.params.address;
        const networkId = this.props.match.params.networkId;
        const color = this.state.color.split('#')[1];
        const iframeUrl = `${cfg.WIDGET_BASE_URL}?address=${address}&network=${networkId}&color=${color}&theme=${this.state.theme}&token=${this.state.token}`; // todo

        const themeOptions = [
            {value: 'dark', name: 'Dark theme'},
            {value: 'light', name: 'Light theme'},
        ];

        const tokenOptions = NETWORKS.get(parseInt(networkId)).tokens.map(i => ({
            value: i.token,
            name: i.token,
        }));

        return (
            <div className={styles.widgetEditor}>
                <header>
                    <h1 className="subtitle">Manage your campaign</h1>
                    <h2 className="subtitle">Edit your widget</h2>
                    <p className={styles.description}>You can manage your campaign widget from here, customize it and
                        also copy the code necessary to
                        embed it on your website.</p>
                    <Link to={`/campaign/${address}/${networkId}/details/`} className={styles.backLink}>Go back to
                        campaign page</Link>
                </header>
                <div className={styles.widget}>
                    <div className={styles.settings}>
                        <Select options={themeOptions} label="Please select widget theme"
                                onChange={this.selectTheme}></Select>
                        <div className={styles.colorPickerCont}>
                            <Button state={this.state.showColorSelector ? 'close' : 'open'}
                                    onClick={this.toggleColorSelector} colorSelector colorData={this.state.color}>Please
                                select color</Button>
                            {this.state.showColorSelector && (
                                <TwitterPicker
                                    className={styles.picker}
                                    color={this.state.color}
                                    onChangeComplete={this.selectColor}
                                />
                            )}
                        </div>
                        <Select options={tokenOptions} label="Please select token to pay with"
                                onChange={this.selectToken}></Select>

                        <div className={styles.codeContainer}>
                            <textarea readOnly value="code here2" id="widget-code"></textarea>
                            <Button copy onClick={this.copyCode}><img src={copy} alt="copy code"/></Button>
                        </div>
                    </div>

                    <div className={styles.iframeContainer}>
                        {this.state.iframeLoading && (
                            <LoaderComp subtitle="none"></LoaderComp>
                        )}
                        <iframe className={this.state.iframeLoading ? styles.loading : ''} onLoad={this.iframeLoaded}
                                title="Chari-widget" src={iframeUrl}></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default WidgetEditor;
