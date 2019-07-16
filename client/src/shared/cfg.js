const isProduction = process.env.NODE_ENV === 'production'
const prodURL = 'https://chari.io/widget/'
const devURL = 'http://localhost:8080/widget/'

const cfg = {
  WIDGET_BASE_URL: isProduction ? prodURL : devURL
}

export default cfg


export const URL_DEFAULTS={
  networkId:1, color:'02DB96', theme:'light', token:'ETH'
}
