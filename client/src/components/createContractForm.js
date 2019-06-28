import React from 'react'
import styles from './../styles/createContractForm.module.css'

import Button from './button.js'
import Input from './input.js'

export default function CreateContractForm () {

  return (
    <form className={styles.createContractForm}>
      <Input name="to" label="to" placeHolder="address"></Input>
      <Input name="lorem" label="lorem" placeHolder="Ipsum"></Input>
    </form>
  )
}
