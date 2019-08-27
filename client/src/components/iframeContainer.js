import React from 'react'
import styles from './../styles/iframeContainer.module.css'
import {hasExpired} from './../utils/getWeb3.js'
import classnames from 'classnames'
import LoaderComp from './loaderComp.js'

class IframeContainer extends React.Component {
  state = {
    loading: true,
    hasExpired: null
  }

  componentDidMount = async () => {
    const expired = await hasExpired(parseInt(this.props.networkId), this.props.address)
    this.setState({
      hasExpired: expired
    })
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

    const expiredClass = this.state.hasExpired ? styles.expired : ''
    const loadingClass = loading ? styles.loading : ''


    return (
      <div className={classnames(expiredClass, styles.iframeContainer)} style={this.props.containerStyles}>
          {loading && (
              <LoaderComp subtitle="none"></LoaderComp>
          )}
          <iframe className={loadingClass} onLoad={loaded}
                  title={this.props.title || 'Chari-widget'} src={this.props.url}
                  style={this.props.iframeStyles}></iframe>
      </div>
    )
  }
}


export default IframeContainer
