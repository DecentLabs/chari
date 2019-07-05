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
      <iframe src={`${cfg.WIDGET_BASE_URL}?address=0xB5E5F24b659bC8872c4f89b127C685b7FC641862&network=4`} title="Chari-widget-demo"></iframe>

    </div>
  )
}

const mapStateToProps = state => ({
    web3Connect: state.web3Connect
});

export default connect(mapStateToProps)(Home)
