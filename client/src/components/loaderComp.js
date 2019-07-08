import React from 'react'
import styles from './../styles/loaderComp.module.css'

import loader from './../assets/loader.svg'

function LoaderComp (props) {
  const subtitle = props.subtitle ? (props.subtitle === "none" ? "" : props.subtitle) : "Please wait and follow the instructions in your wallet."
  return (
    <div className={styles.loader}>
      {props.children && (
        props.children
      )}
      {subtitle && (
        <p>{subtitle}</p>
      )}
      <div className={styles.loaderIcon}>
        <img src={loader} alt="loader"/>
      </div>
    </div>
  )
}

export default LoaderComp
