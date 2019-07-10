import React from 'react'
import styles from './../styles/Home.module.css'
import {connect} from 'react-redux'
import {setupWeb3} from './../reducers/web3Connect.js'
import {NavLink} from "react-router-dom"
import cfg from './../shared/cfg.js'

import Button from './../components/button.js'

function Home (props) {
  const connectWeb3 = () => {
    if (!props.web3Connect.isConnected) {
      props.dispatch(setupWeb3())
    }
  }

  return (
    <div className={styles.home}>
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

      <dl>
        <dt>What is donation matching?</dt>
        <dd>
          <a rel="noopener noreferrer" target="_blank" href="https://en.wikipedia.org/wiki/Matching_funds">
          Matching grants</a> are a great way to raise funds for a charitable cause.
          A sponsor deposits a budget to match donations 1:1.
          Thus <strong>donors double the impact</strong> of their contributions.
          When the fundraiser ends, the charity gets twice the donations
          and any remaining budget is returned to the sponsor.
        </dd>

        <dt>What is Chari?</dt>
        <dd>
          <strong>A smart contract</strong>.
          The Chari smart contract manages the sponsor grant and donations on
          the <a rel="noopener noreferrer" target="_blank" href="https://en.wikipedia.org/wiki/Ethereum">Ethereum blockchain</a>.
          This means there is no need for a trusted third party to coordinate the fundraising
          and each participant can be certain their funds are managed safely.
        </dd>
        <dd>
          <strong>A donation widget</strong>.
          Easily embed a Chari donation component into the landing page of your fundraiser campaign.
        </dd>
      </dl>

      <h1 className="subtitle">Featured Fundraiser</h1>

      <div className={styles.fundraiser}>

        <h2>Fundraiser for GiveDirectly</h2>

        <p>
          <strong>Recipient:</strong> <a href="https://www.givedirectly.org">GiveDirectly</a>
          <br/>
          <strong>Sponsor:</strong> <a href="https://decent.org">Decent Labs</a>
        </p>

        <p>This fundraiser helps people living in extreme poverty.</p>

        <div className={styles.iframeContainer}>
          <iframe title="Chari-widget-demo" src={`${cfg.WIDGET_BASE_URL}?address=0x009D88A62945F22ec7df60D34541B5F01cFF23f9&network=1&color=02DB96&theme=light`}></iframe>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
    web3Connect: state.web3Connect
});

export default connect(mapStateToProps)(Home)
