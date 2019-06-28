import React from 'react'
import styles from './../styles/input.module.css'

class Input extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    console.log(this.props, 'p');
    const {label, placeHolder, name} = this.props
    return (
      <div className={styles.inputWrapper}>
        <label className={styles.label}>{label}</label>
        <input className={styles.input} name={name} placeholder={placeHolder}/>
      </div>
    )
  }
}

export default Input
