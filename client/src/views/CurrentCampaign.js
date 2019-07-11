import React from 'react';

import { Link } from 'react-router-dom';

import campaignStyles from '../styles/Campaign.module.css';
import buttonStyles from '../styles/button.module.css';
import IframeContainer from './../components/iframeContainer.js'
import { makeClientUrl, makeWidgetUrl } from '../utils/makeUrl.js'

const CurrentCampaign = (props) => {
  const {address, networkId, color, theme, token} = props;
  return (
    <div>
      <p>Your contract's address is:</p>
      <p className="big strong">{address}</p>
      <div className={[campaignStyles.centerRow, campaignStyles.padding].join(' ')}>
        <IframeContainer url={makeWidgetUrl(address, networkId, color, theme, token)}></IframeContainer>
        <div className={campaignStyles.centerColumn}>
          <Link to={makeClientUrl('admin', address, networkId, color, theme, token)} className={buttonStyles.button}>Customize widget</Link>
          <Link to={makeClientUrl('addfund', address, networkId, color, theme, token)} className={buttonStyles.button}>Transfer funds</Link>
        </div>
      </div>
    </div>
  )
}

export default CurrentCampaign
