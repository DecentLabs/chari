import React from 'react'
import styles from './../styles/Home.module.css'

import {NavLink} from "react-router-dom"

import Button from './../components/button.js'

export default function Home () {
  return (
    <div className={styles.home}>
      <header>
        <h1 className="title">A new class of potential <br/>matching sponsors and donors</h1>
        <p className="big">Chari offers a completely new way to raise funds and run <br/>fundraising campaigns</p>
      </header>

      <NavLink to="/new/deploy">
        <Button>Create Your Campaign</Button>
      </NavLink>
    </div>
  )
}
