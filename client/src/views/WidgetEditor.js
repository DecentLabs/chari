import React from "react"
import styles from './../styles/widgetEditor.module.css'

import Button from './../components/button.js'
// import Input from './../components/input.js'
import Select from './../components/select.js'

function WidgetEditor () {
  const options = [
    {value: 1, name: 'first option'},
    {value: 2, name: 'second option'},
    {value: 3, name: 'third option'}
  ]

  return (
    <div className={styles.widgetEditor}>
      <header>
        <h1>Welcome in campaign editor page!</h1>
        <p>You can manage your campaign widget from here, customize it and also copy the code necessary to embed it on your website.</p>
      </header>

      <div className={styles.widget}>
        <iframe title="Widget" src=""></iframe>
        <div className={styles.settings}>
          <Select options={options}></Select>
          <Select options={options} defaultValue="2"></Select>
          <Select options={options} defaultValue="3"></Select>
        </div>
      </div>

      <textarea placeholder="code"></textarea>

      <Button>Add fund</Button>
    </div>
  )
}

export default WidgetEditor
