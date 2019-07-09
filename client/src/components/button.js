import React from 'react'
import styles from './../styles/button.module.css'
import classnames from 'classnames'

export default function Button (props) {
  const naked = props.naked ? styles.naked : null
  const copy = props.copy ? styles.copy : null
  const color = props.colorSelector ? styles.colorBtn : null
  const margin = props.margin ? styles.margin : null

  return (
    <button style={{borderBottom: `2px solid ${props.colorData}`}}
            data-color={props.colorData}
            className={classnames(styles.button, styles[props.state], naked, copy, color, margi)}
            onClick={props.onClick}
            disabled={props.disabled}>{props.children}</button>
  )
}
