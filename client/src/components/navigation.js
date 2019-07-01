import React from 'react'
import styles from './../styles/navigation.module.css'
import {NavLink} from "react-router-dom"

import logo from './../assets/text-logo.svg'

export default function Navigation () {
  return (
      <nav className={styles.navigation}>
        <div className={styles.left}>
          <NavLink to="/">
            <img src={logo} alt="chari logo" className={styles.logo}/>
          </NavLink>
        </div>

        <ul className={styles.right}>
          <li className={styles.link}>
            <NavLink to="/featured">Featured campaigns</NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/learn-more">Learn more</NavLink>
          </li>
          <li className={styles.link}>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
  )
}
