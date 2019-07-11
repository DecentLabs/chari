import React from 'react'
import styles from './../styles/select.module.css'

class Select extends React.Component {
  render () {
    const onChange = this.props.onChange
    const options = this.props.options ? this.props.options : []
    const label = this.props.label ? this.props.label : 'Please select an option'
    const value = this.props.value

    const optionTags = []
    optionTags.push(<option key="select-value-0" value="undefined" disabled>{label}</option>) // todo selected
    options.forEach((option) => {
      optionTags.push(<option key={option.value} value={option.value}>{option.name}</option>)
    })
    return (
      <div className={styles.selectWrapper}>
        <select className={styles.select} onChange={onChange} defaultValue={value}>
          {optionTags}
        </select>
      </div>
    )
  }
}

export default Select
