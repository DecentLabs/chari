import React from 'react'
import styles from './../styles/Home.module.css'
import {connect} from 'react-redux'
import {setupWeb3} from './../reducers/web3Connect.js'
import {NavLink} from "react-router-dom"
import cfg from './../shared/cfg.js'
import classnames from 'classnames'

import Button from './../components/button.js'
import IframeContainer from './../components/iframeContainer.js'

import hospischool from './../assets/korhazsuli.jpeg'
import gitcoinLogo from './../assets/gitcoin.png'
import award from './../assets/medal-2.svg'

const iframeContHomeStyles = {
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block'
}
const iframeHomeStyles = {
  width: '100%',
  border: 0,
}

function Home (props) {
  const connectWeb3 = () => {
    if (!props.web3Connect.isConnected) {
      props.dispatch(setupWeb3())
    }
  }

  return (
    <div className={classnames(styles.home, 'home')}>
      <header>
        <h1 className="title">A match made in crypto</h1>
        <p className="big">
          Chari makes donation matching campaigns easy
          <br/>
          and secure with cryptocurrencies.
        </p>
      </header>

      <NavLink to="/campaign/deploy">
        <Button onClick={connectWeb3}>Create a fundraising campaign</Button>
      </NavLink>

      <section className="benefits">
        <h1 className="subtitle">Why use Chari?</h1>
        <div>
          <h2>A different audience</h2>
          <p className="big">
            Reach a new class of sponsors and donors
            <br/>
            in the world of magic internet money.
          </p>
        </div>
        <div className="divider"></div>

        <div>
          <h2>Zero fees</h2>
          <p className="big">
            Fundraising platforms typically charge a 4-8% fee on donations.
            <br/>
            Chari charges nothing<sup>*</sup>, so more goes to the cause!
            <br/>
          </p>
          <small>
            <sup>*</sup> Ethereum transactions do incur a small fee, typically less than 0.1%.
          </small>
          <div className="divider"></div>
        </div>

        <div>
          <h2>Safe and secure</h2>
          <p className="big">
            Chari provides maximum security for the fundraising process.
            <br/>
            There's no need for a trusted third party, all funds 
            <br/>
            are managed by a smart contract.
          </p>
        </div>
      </section>


      <section className="chari">
        <h1 className="subtitle">What is Chari?</h1>
        <div>
          <p className="strong big">A smart contract.</p>
          <p className="big">
            The Chari smart contract manages the sponsor grant and donations on the Ethereum blockchain.
            This means there is no need for a trusted third party to coordinate the fundraising and each participant can be certain their funds are managed safely.
          </p>
        </div>

        <div>
          <p className="strong big">A donation widget.</p>
          <p className="big">
            You can easily embed a Chari donation component into the landing page of your fundraiser campaign.
          </p>
        </div>

        <div className="divider"></div>
        <h2>What is donation matching?</h2>

        <p className="big">
          Matching grants are a great way to raise funds for a charitable cause.
          A sponsor deposits a budget to match donations 1:1. So the donors will double the impact of their contributions.
        </p>
        <p className="big">
          When the fundraiser ends, the charity gets twice the donations and any remaining budget is returned to the sponsor.
        </p>
      </section>


      <section className="featured">
        <h1 className="subtitle">Featured Fundraisers</h1>

        <div>
          <div className={styles.fundraiser}>
            <div>
              <h2>Archive.org</h2>
              <p>
                <strong>Recipient:</strong> <a href="https://www.archive.org">The Internet Archive</a>
                <br/>
                <strong>Sponsor:</strong> <a href="https://decent.org">Decent Labs</a>
              </p>
              <p>The Internet Archive is a small non-profit library with a huge mission: to give everyone access to all knowledge, forever. For free.</p>
            </div>

            <IframeContainer title="Chari-widget-demo"
                             address="0x4a3De18552C740977E82ecF9FF2B826aD9Ba2305"
                             networkId="1"
                             containerStyles={iframeContHomeStyles}
                             iframeStyles={iframeHomeStyles}
                             url={`${cfg.WIDGET_BASE_URL}?address=0x4a3De18552C740977E82ecF9FF2B826aD9Ba2305&network=1&color=02DB96&theme=light`}></IframeContainer>
          </div>

          <div className={styles.fundraiser}>
            <div>
              <h2>GiveDirectly</h2>
              <p>
                <strong>Recipient:</strong> <a href="https://www.givedirectly.org">GiveDirectly</a>
                <br/>
                <strong>Sponsor:</strong> <a href="https://decent.org">Decent Labs</a>
              </p>
              <p>This fundraiser helps people living in extreme poverty.</p>
            </div>

            <IframeContainer title="Chari-widget-demo"
                             address="0x009D88A62945F22ec7df60D34541B5F01cFF23f9"
                             networkId="1"
                             containerStyles={iframeContHomeStyles}
                             iframeStyles={iframeHomeStyles}
                             url={`${cfg.WIDGET_BASE_URL}?address=0x009D88A62945F22ec7df60D34541B5F01cFF23f9&network=1&color=02DB96&theme=light`}></IframeContainer>
          </div>
        </div>
      </section>

      <section className="social-proof">
        <img className="logo gitcoin-logo" src={award} alt="gitcoin-logo"></img>
        <p className="big">
          Chari was awarded for best user experience
          <br/>
          at <a href="https://gitcoin.co/" target="_blank" rel="noopener noreferrer">Gitcoin</a>'s international <a href="https://gitcoin.co/hackathon/beyondblockchain" target="_blank" rel="noopener noreferrer">Beyond Blockchain</a> hackhaton.
        </p>


        <a href="https://korhazsuli.com/" target="_blank" rel="noopener noreferrer"><img className="hospischool-logo logo" alt="hospischool-logo" src={hospischool}/></a>
        <div className="quote">
          <p>"Crypto fundraising opens access to a new world of potential sponsors and donors. Chari provides a safe platform for donations: no 3rd party to manage funds, no chance of corruption. I like how simple it is and the fact there’s no overhead on funding.''</p>
          <span>- Réka Berczelédi, <a href="https://korhazsuli.com/" target="_blank" rel="noopener noreferrer">HospiSchool</a></span>
        </div>

        <p>HospiSchool supports long-term hospitalized children to continue education with the help of student volunteers.</p>
      </section>

    </div>
  )
}

const mapStateToProps = state => ({
    web3Connect: state.web3Connect
});

export default connect(mapStateToProps)(Home)
