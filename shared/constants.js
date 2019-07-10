export const NETWORKS = new Map()

const ETH = {
  token: 'ETH',
  tokenAddress: '0x0000000000000000000000000000000000000000',
  decimals: 18
}

const AEUR_RINKEBY = {
  token: 'AEUR',
  tokenAddress: '0x79065a165Ec09E6A89D584a14872802717FE12a3',
  decimals: 2
}

const AEUR_MAIN = {
  token: 'AEUR',
  tokenAddress: '0xc994a2dEb02543Db1f48688438b9903c4b305ce3',
  decimals: 2
}

const DAI_MAIN = {
  token: 'DAI',
  tokenAddress: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
  decimals: 18
}

NETWORKS.set(1, {
  url: 'https://mainnet.infura.io/v3/0aac55d3d6bb4b3498e97cbcf7112f6b',
  tokens: [ETH, AEUR_MAIN, DAI_MAIN],
  factory: '0x18662Eef5F00f59A765830B571FAc1d273F4b8D8',
  etherscan:'https://etherscan.io/'
})

NETWORKS.set(3, {
  url: 'https://ropsten.infura.io/v3/0aac55d3d6bb4b3498e97cbcf7112f6b',
  tokens: [ETH],
  factory: '0x1329857cDa42634C501C1d5f2757761Ccde07436',
  name:'Ropsten testnet',
  etherscan:'https://ropsten.etherscan.io/'
})

NETWORKS.set(4, {
  url: 'https://rinkeby.infura.io/v3/0aac55d3d6bb4b3498e97cbcf7112f6b',
  tokens: [ETH, AEUR_RINKEBY],
  factory: '0x43D5e98C1350DB149f24C4cf9a181e4d7b6fC2d2',
  name:'Rinkeby testnet',
  etherscan:'https://rinkeby.etherscan.io/'
})
