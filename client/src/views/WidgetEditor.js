import React from "react"
import {Link} from "react-router-dom"
import styles from './../styles/widgetEditor.module.css'
import cfg from './../shared/cfg.js'

import Button from './../components/button.js'
import Select from './../components/select.js'
import copy from './../assets/copy.svg'

class WidgetEditor extends React.Component {
  constructor (props) {
    super(props)
    this.selectTheme = this.selectTheme.bind(this)
    this.selectColor = this.selectColor.bind(this)

    this.state = {
      color: 'purple',
      theme: 'light',
      network: 4
    }
  }

  selectTheme (e) {
    this.setState({
      theme: e.target.value
    })
  }

  selectColor (e) {
    this.setState({
      color: e.target.value
    })
  }

  copyCode () {
    const toCopy = document.querySelector('textarea#widget-code')
    toCopy.select()
    document.execCommand("copy")
  }

  render () {
      const address = this.props.match.params.address

      const iframeUrl = `${cfg.WIDGET_BASE_URL}?address=${address}&network=${this.state.network}&color=${this.state.color}&theme=${this.state.theme}` // todo

      const themeOptions = [
          {value: 'dark', name: 'Dark theme'},
          {value: 'light', name: 'Light theme'}
      ]
      const colorOptions = [{value: 'purple', name: 'purple'}, {value: 'green', name: 'green'}] // todo

      const copyCode = () => {
          const toCopy = document.querySelector('textarea#widget-code')
          toCopy.select()
          document.execCommand("copy")
      }

      return (
          <div className={styles.widgetEditor}>
              <header>
                  <h1 className="subtitle">Manage your campaign</h1>
                  <h2 className="subtitle">Edit your widget</h2>
                  <p>You can manage your campaign widget from here, customize it and also copy the code necessary to
                      embed it on your website.</p>
                  <Link to={`/campaign/${address}/details/`}>Go back to campaign page</Link>
              </header>

              <div className={styles.widget}>
                  <div className={styles.settings}>
                      <Select options={themeOptions} label="Please select widget theme"
                              onChange={this.selectTheme}></Select>
                      <Select options={colorOptions} label="Please select color" onChange={this.selectColor}></Select>

                      <div className={styles.codeContainer}>
                          <textarea readOnly value="code here2" id="widget-code"></textarea>
                          <Button copy onClick={this.copyCode}><img src={copy} alt="copy code"/></Button>
                      </div>
                  </div>

                  <iframe src="" title="Chari-widget" src={iframeUrl}></iframe>
              </div>
          </div>
      )
  }
}

export default WidgetEditor
