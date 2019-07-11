import cfg from '../shared/cfg.js'

export const makeWidgetUrl = (address, networkId, color, theme) => `${cfg.WIDGET_BASE_URL}?address=${address}&network=${networkId}&color=${color}&theme=${theme}&token=${token}`;
