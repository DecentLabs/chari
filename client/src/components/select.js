import React from 'react'
import styles from './../styles/select.module.css'

class Select extends React.Component {
  render () {
    const {onChange, defaultValue} = this.props
    const options = this.props.options ? this.props.options : []

    const optionTags = options.map((option) => {
      return (
        <option key={option.value} value={option.value}>{option.name}</option>
      )
    })
    return (
      <div className={styles.selectWrapper}>
        <select className={styles.select}  onChange={onChange} value={defaultValue}>
          {optionTags}
        </select>
      </div>
    )
  }
}

export default Select
