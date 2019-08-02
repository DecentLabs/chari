import React from 'react';

import { Link } from 'react-router-dom';

import campaignStyles from '../styles/Campaign.module.css';
import buttonStyles from '../styles/button.module.css';
import IframeContainer from './../components/iframeContainer.js'
import { makeClientUrl, makeWidgetUrl } from '../utils/makeUrl.js'
import cutAddress from 'shared/scripts/cutAddress.js'
import copy from 'shared/scripts/copyToClipBoard.js'
import copyIcon from './../assets/copy-color.svg'
import classnames from 'classnames'

import './../styles/address.scss'

const CurrentCampaign = (props) => {
  const {address, networkId, color, theme, token} = props;
  const _address = cutAddress(address)

  return (
    <div>
      <p>Your contract's address is:</p>
      <div className="addressCont">
        <span className="big strong address first">{_address.start}</span>
        <span className="big strong address last">{_address.end}</span>
        <span class="copy-to-clipboard">
          <button onClick={e => {copy(address)}} className={classnames(buttonStyles.button, buttonStyles.copy, buttonStyles.small)}>
            <img src={copyIcon} alt="copy"/>
          </button>
        </span>
      </div>


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
