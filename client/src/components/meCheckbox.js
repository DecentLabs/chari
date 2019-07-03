import React from 'react'
import styles from '../styles/meCheckbox.module.css'

export default class MeCheckbox extends React.Component {
    render () {
        const {id, onChange} = this.props;
        return (
            <div className={styles.meField}>
                <input className={styles.meCheckbox} id={id} type="checkbox" onChange={onChange} />
                <label htmlFor={id}>it's me!</label>
            </div>
        )
    }
}
