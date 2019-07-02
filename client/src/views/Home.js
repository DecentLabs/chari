import React from 'react'
import styles from './../styles/Home.module.css'
import {connect} from 'react-redux'
import {setupWeb3} from './../reducers/web3Connect.js'
import {NavLink} from "react-router-dom"

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
        <h1 className="title">A new class of potential <br/>matching sponsors and donors</h1>
        <p className="big">Chari offers a completely new way to raise funds and run <br/>fundraising campaigns</p>
      </header>

      <NavLink to="/new/deploy">
        <Button onClick={connectWeb3}>Create Your Campaign</Button>
      </NavLink>
    </div>
  )
}

const mapStateToProps = state => ({
    web3Connect: state.web3Connect
});

export default connect(mapStateToProps)(Home)
