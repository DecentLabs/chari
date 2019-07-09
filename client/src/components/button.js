import React from 'react'
import styles from './../styles/button.module.css'
import classnames from 'classnames'

export default function Button (props) {
  const naked = props.naked ? styles.naked : null
  const copy = props.copy ? styles.copy : null
  const margin = props.margin ? styles.margin : null

  return (
    <button className={classnames(styles.button, naked, copy, margin)} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
  )
}
