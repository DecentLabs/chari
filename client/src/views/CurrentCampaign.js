import React from 'react';

import { Link } from 'react-router-dom';

import campaignStyles from '../styles/Campaign.module.css';
import buttonStyles from '../styles/button.module.css';
import IframeContainer from './../components/iframeContainer.js'
import {makeWidgetUrl} from '../utils/makeWidgetUrl.js'

const CurrentCampaign = (props) => (
    <div>
        <p>Your contract's address is:</p>
        <p className="big strong">{props.fundraiserAddress}</p>
        <div className={[campaignStyles.centerRow, campaignStyles.padding].join(' ')}>
            <IframeContainer url={makeWidgetUrl(props.fundraiserAddress, props.network, '02DB96&', 'light')}></IframeContainer>
            <div className={campaignStyles.centerColumn}>
                <Link to={`/campaign/${props.fundraiserAddress}/${props.network}/admin`} className={buttonStyles.button}>Customize
                    widget</Link>
                <Link to={`/campaign/${props.fundraiserAddress}/addfund`} className={buttonStyles.button}>Transfer funds</Link>
            </div>
        </div>
    </div>
)

export default CurrentCampaign
