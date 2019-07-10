import React from 'react'
import styles from './../styles/iframeContainer.module.css'

import LoaderComp from './loaderComp.js'

function IframeContainer (props) {
  const loading = props.loading
  const iframeUrl = props.url
  return (
    <div className={styles.iframeContainer}>
        {loading && (
            <LoaderComp subtitle="none"></LoaderComp>
        )}
        <iframe className={loading ? styles.loading : ''} onLoad={props.loaded}
                title="Chari-widget" src={iframeUrl}></iframe>
    </div>
  )
}


export default IframeContainer
