import React from "react"
import styles from './../styles/widgetEditor.module.css'

import Button from './../components/button.js'
import Select from './../components/select.js'
import copy from './../assets/copy.svg'

function WidgetEditor () {
  const themeOptions = [
    {value: 'dark', name: 'Dark theme'},
    {value: 'light', name: 'Light theme'}
  ]
  const colorOptions = [{value: 'purple', name: 'purple'}, {value: 'green', name: 'green'}] // todo
  const options = [{value: 1, name: 1}, {value: 2, name: 2}] // todo

  const copyCode = () => {
    const toCopy = document.querySelector('textarea#widget-code')
    toCopy.select()
    document.execCommand("copy")
  }

  return (
    <div className={styles.widgetEditor}>
      <header>
        <h1>Welcome in campaign editor page!</h1>
        <p>You can manage your campaign widget from here, customize it and also copy the code necessary to embed it on your website.</p>
      </header>

      <div className={styles.widget}>
        <div className={styles.settings}>
          <Select options={themeOptions} label="Please select widget theme"></Select>
          <Select options={colorOptions} label="Please select color"></Select>
          <Select options={options}></Select>

          <div className={styles.codeContainer}>
            <textarea readOnly value="code here2" id="widget-code"></textarea>
            <Button copy onClick={copyCode}><img src={copy} alt="copy code"/></Button>
          </div>
        </div>

        <iframe src="" title="chari-widget"></iframe>
      </div>

      <Button>Add fund</Button>
    </div>
  )
}

export default WidgetEditor
