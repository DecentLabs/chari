import cfg from '../shared/cfg.js'

const recolor = (color) => color[0] === '#' ? color.slice(1) : color

export const makeWidgetUrl = (address, networkId=1, color='02DB96', theme='light', token='ETH') => `${cfg.WIDGET_BASE_URL}?address=${address}&network=${networkId}&color=${recolor(color)}&theme=${theme}&token=${token}`

export const makeClientUrl = (destination, address, networkId=1, color='02DB96', theme='light', token='ETH') => `/campaign/${address}/${networkId}/${recolor(color)}/${theme}/${token}/${destination}`
