import React from 'react'
import styles from './../styles/button.module.css'
import classnames from 'classnames'

export default function Button (props) {
  const naked = props.naked ? styles.naked : null
  return (
    <button className={classnames(styles.button, naked)} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
  )
}
