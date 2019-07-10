import React from 'react'
import styles from './../styles/iframeContainer.module.css'

import LoaderComp from './loaderComp.js'

class IframeContainer extends React.Component {
  state = {
    loading: true
  }

  loaded = () => {
    this.setState({
      loading: false
    })
  }

  render() {
    let loading, loaded
    if (this.props.loading === undefined || this.props.loaded === undefined) {
      loading = this.state.loading
      loaded = this.loaded
    } else {
      loading = this.props.loading
      loaded = this.props.loaded
    }

    return (
      <div className={styles.iframeContainer} style={this.props.containerStyles}>
          {loading && (
              <LoaderComp subtitle="none"></LoaderComp>
          )}
          <iframe className={loading ? styles.loading : ''} onLoad={loaded}
                  title={this.props.title || 'Chari-widget'} src={this.props.url}
                  style={this.props.iframeStyles}></iframe>
      </div>
    )
  }
}


export default IframeContainer
