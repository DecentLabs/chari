import React from 'react';

import { Link } from 'react-router-dom';

import campaignStyles from '../styles/Campaign.module.css';
import buttonStyles from '../styles/button.module.css';
import cfg from '../shared/cfg';

const CurrentCampaign = (props) => (
    <div className={campaignStyles.centerRow}>
        <p>Your contract's address is:</p>
        <p className="big strong">{props.fundraiserAddress}</p>
        <div className={campaignStyles.iframeContainer}>
            <iframe title="Chari-widget-demo"
                    src={`${cfg.WIDGET_BASE_URL}?address=${props.fundraiserAddress}&network=${props.network}&color=02DB96&theme=light`}></iframe>
        </div>
        <div className={campaignStyles.centerColumn}>
            <Link to={`/campaign/${props.fundraiserAddress}/${props.network}/admin`} className={buttonStyles.button}>Edit your
                widget</Link>
            <Link to={`/campaign/${props.fundraiserAddress}/addfund`} className={buttonStyles.button}>Grant as a
                sponsor</Link>
        </div>
    </div>
)

export default CurrentCampaign
