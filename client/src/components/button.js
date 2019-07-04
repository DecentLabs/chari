import React from 'react'
import styles from './../styles/button.module.css'
import classnames from 'classnames'

export default function Button (props) {
  const naked = props.naked ? styles.naked : null
  const copy = props.copy ? styles.copy : null

  return (
    <button className={classnames(styles.button, naked, copy)} onClick={props.onClick}>{props.children}</button>
  )
}
