import React from 'react';

import { Link } from 'react-router-dom';

import campaignStyles from '../styles/Campaign.module.css';
import buttonStyles from '../styles/button.module.css';
import IframeContainer from './../components/iframeContainer.js'
import { makeClientUrl, makeWidgetUrl } from '../utils/makeUrl.js'
import cutAddress from 'shared/scripts/cutAddress.js'
import copy from 'shared/scripts/copyToClipboard.js'
import CopyIcon from './../components/copyIcon.js'
import classnames from 'classnames'

class CurrentCampaign extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      smallScreen: window.innerWidth < 600
    }
    window.addEventListener('resize', () => {
      this.setState({
        smallScreen: window.innerWidth < 550
      })
    })
  }

  render () {
    const {address, networkId, color, theme, token} = this.props;
    const _address = this.state.smallScreen ? cutAddress(address) : null

    return (
      <div>
        <p>Your contract's address is:</p>
        <div className="addressCont">
          {_address && (
            <div>
              <span className="big strong address">{`${_address.start}...`}</span>
              <span className="big strong address">{_address.end}</span>
            </div>
          )}
          {!_address && (
            <div>
              <span className="big strong address">{address}</span>
            </div>
          )}
          <span className="copy-to-clipboard">
            <button onClick={e => {copy(address)}} className={classnames(buttonStyles.button, buttonStyles.copy, buttonStyles.small)}>
              <CopyIcon></CopyIcon>
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
}

export default CurrentCampaign
