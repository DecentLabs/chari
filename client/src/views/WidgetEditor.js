import React from "react"
import styles from './../styles/widgetEditor.module.css'

function WidgetEditor () {
  return (
    <div className={styles.widgetEditor}>
      <header>
        <h2>Welcome in campaign editor page!</h2>
        <p>You can manage your campaign widget from here, customize it and also copy the code necessary to embed it on your website.</p>
      </header>

      <div className={styles.widget}>
        <iframe src=""></iframe>
      </div>
    </div>
  )
}

export default WidgetEditor
