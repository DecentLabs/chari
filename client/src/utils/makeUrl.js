import cfg, {URL_DEFAULTS} from '../shared/cfg.js'

const recolor = (color) => color[0] === '#' ? color.slice(1) : color

export const makeWidgetUrl = (address, networkId=URL_DEFAULTS.networkId, color=URL_DEFAULTS.color, theme=URL_DEFAULTS.theme, token=URL_DEFAULTS.token) => `${cfg.WIDGET_BASE_URL}?address=${address}&network=${networkId}&color=${recolor(color)}&theme=${theme}&token=${token}`

export const makeClientUrl = (destination, address, networkId=URL_DEFAULTS.networkId, color=URL_DEFAULTS.color, theme=URL_DEFAULTS.theme, token=URL_DEFAULTS.token) => `/campaign/${address}/${networkId}/${recolor(color)}/${theme}/${token}/${destination}`
