import React from 'react';

import congratsStyles from '../styles/Congrats.module.css';
import { Link } from 'react-router-dom';
import buttonStyles from '../styles/button.module.css';

const CurrentCampaign = (props) => (
    <div>
        <p>Your contract's address is:</p>
        <p className="big strong">{props.fundraiserAddress}</p>
        <div className={congratsStyles.buttonRow}>
            <Link to={`/campaign/${props.fundraiserAddress}/admin`} className={buttonStyles.button}>Edit your
                widget</Link>
            <Link to={`/campaign/${props.fundraiserAddress}/addfund`} className={buttonStyles.button}>Grant as a
                sponsor</Link>
        </div>
    </div>
)

export default CurrentCampaign