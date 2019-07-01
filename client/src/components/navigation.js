import React from 'react'
import styles from './../styles/navigation.module.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import App from './../App.js'
import Featured from './../views/Featured.js'
import LearnMore from './../views/LearnMore.js'
import Contact from './../views/Contact.js'

import logo from './../assets/text-logo.svg'

export default function Navigation () {
  return (
    <Router>
      <nav className={styles.navigation}>
        <div className={styles.left}>
          <Link to="/">
            <img src={logo} alt="chari logo" className={styles.logo}/>
          </Link>
        </div>

        <ul className={styles.right}>
          <li className={styles.link}>
            <Link to="/featured">Featured campaigns</Link>
          </li>
          <li className={styles.link}>
            <Link to="/learn-more">Learn more</Link>
          </li>
          <li className={styles.link}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={App} />
      <Route path="/featured" component={Featured} />
      <Route path="/learn-more" component={LearnMore} />
      <Route path="/contact" component={Contact} />
    </Router>
  )
}
