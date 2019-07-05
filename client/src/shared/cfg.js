const isProduction = process.env.NODE_ENV === 'production'
const prodURL = 'https://chari.io/widget/'
const devURL = 'http://localhost:8080/widget/'

const cfg = {
  WIDGET_BASE_URL: isProduction ? prodURL : devURL
}

export default cfg
