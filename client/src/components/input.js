import React from 'react'
import styles from './../styles/input.module.css'

class Input extends React.Component {
  render () {
    const {label, placeHolder, name, onChange, onClick, value} = this.props
    return (
      <div className={styles.inputWrapper}>
        <label className={styles.label}>{label}</label>
        <input className={styles.input} name={name} placeholder={placeHolder} onChange={onChange} onClick={onClick} value={value}/>
      </div>
    )
  }
}

export default Input
