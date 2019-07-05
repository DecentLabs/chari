import React from "react"
import styles from './../styles/widgetEditor.module.css'
import cfg from './../shared/cfg.js'

import Button from './../components/button.js'
import Select from './../components/select.js'
import copy from './../assets/copy.svg'

function WidgetEditor () {
  let color = 'purple' // todo
  let theme = 'light' // todo
  const address = '0xB5E5F24b659bC8872c4f89b127C685b7FC641862'
  const network = 4
  const iframeUrl = `${cfg.WIDGET_BASE_URL}?address=${address}&network=${network}&color=${color}&theme=${theme}` // todo

  const themeOptions = [
    {value: 'dark', name: 'Dark theme'},
    {value: 'light', name: 'Light theme'}
  ]
  const colorOptions = [{value: 'purple', name: 'purple'}, {value: 'green', name: 'green'}] // todo

  const selectTheme = (e) => {
    theme = e.target.value
  }

  const selectColor = (e) => {
    color = e.target.value
  }

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
          <Select options={themeOptions} label="Please select widget theme" onChange={selectTheme}></Select>
          <Select options={colorOptions} label="Please select color" onChange={selectColor}></Select>

          <div className={styles.codeContainer}>
            <textarea readOnly value="code here2" id="widget-code"></textarea>
            <Button copy onClick={copyCode}><img src={copy} alt="copy code"/></Button>
          </div>
        </div>

        <iframe title="Chari-widget" src={iframeUrl}></iframe>
      </div>

      <Button>Add fund</Button>
    </div>
  )
}

export default WidgetEditor
