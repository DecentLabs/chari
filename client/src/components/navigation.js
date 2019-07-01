import React from 'react'
import styles from './../styles/navigation.module.css'

import logo from './../assets/text-logo.svg'

export default function Navigation () {
  return (
    <div className={styles.navigation}>
      <div className={styles.left}>
        <img src={logo} alt="chari logo" className={styles.logo}/>
      </div>

      <div className={styles.right}>
        <a className={styles.link} to="">Featured campaigns</a>
        <a className={styles.link} to="">Learn more</a>
        <a className={styles.link} to="">Contact</a>
      </div>
    </div>
  )
}
