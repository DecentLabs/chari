import React from 'react'
import styles from './../styles/Home.module.css'
import {connect} from 'react-redux'
import {setupWeb3} from './../reducers/web3Connect.js'
import {NavLink} from "react-router-dom"
import cfg from './../shared/cfg.js'

import Button from './../components/button.js'
import IframeContainer from './../components/iframeContainer.js'

import hospischool from './../assets/korhazsuli.jpeg'

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

      <section className="benefits">
        <h1 className="subtitle">Benefits of Chari</h1>
        <div>
          <h3>Charities can reach a new class of sponsors and donors.</h3>
          <p>
            Aliquam rutrum arcu at odio bibendum, vitae pulvinar massa lobortis. <br/> Ut dapibus accumsan urna, sit amet gravida leo.
          </p>
        </div>
        <div className="divider"></div>

        <div>
          <h3>Dramatically lower fundraising costs</h3>
          <p>Chari dramatically lower fundraising costs, there’s just a minimal gas cost of transfers.</p>
          <p>Typical overhead of charity fundraising is 4-8%:</p>
          <ul>
            <li>Administration fee (3.5-5%)</li>
            <li>Payment fees (0.5-3%)</li>
          </ul>
          <div className="divider"></div>
        </div>

        <div>
          <h3>Secure</h3>
          <p>
            Chari provides maximum security to the whole process of your fundraiser. <br/>
          </p>
          <ul>
            <li>No trusted 3rd party needed</li>
            <li>Sponsor funds are fully commited, up-front</li>
          </ul>
        </div>
      </section>


      <section className="chari">
        <h1 className="subtitle">What is Chari?</h1>
        <p className="strong">A smart contract.</p>
        <p>
          The Chari smart contract manages the sponsor grant and donations on the Ethereum blockchain.
          This means there is no need for a trusted third party to coordinate the fundraising and each participant can be certain their funds are managed safely.
        </p>

        <p className="strong">A donation widget.</p>
        <p>
          Easily embed a Chari donation component into the landing page of your fundraiser campaign.
        </p>

        <div className="divider"></div>
        <h2>What is donation matching?</h2>

        <p>
          Matching grants are a great way to raise funds for a charitable cause.
          A sponsor deposits a budget to match donations 1:1. Thus donors double the impact of their contributions.
        </p>
        <p>
          When the fundraiser ends, the charity gets twice the donations and any remaining budget is returned to the sponsor.
        </p>
      </section>


      <section className="expert">
        <a href="https://korhazsuli.com/" target="_blank" rel="noopener noreferrer"><img className="hospischool-logo" alt="hospischool-logo" src={hospischool}/></a>
        <div className="quote">
          <p>"Crypto fundraising opens access to a new world of potential sponsors and donors. Chari provides a safe platform for donations: no 3rd party to manage funds, no chance of corruption. I like how simple it is and the fact there’s no overhead on funding.''</p>
          <span>- Reka Berczeledi, HospiSchool</span>
          <a href="https://korhazsuli.com/" target="_blank" rel="noopener noreferrer">https://korhazsuli.com/</a>
        </div>

        <p>HospiSchool supports long-term hospitalized children continue education with the help of student volunteers.</p>
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
    </div>
  )
}

const mapStateToProps = state => ({
    web3Connect: state.web3Connect
});

export default connect(mapStateToProps)(Home)
