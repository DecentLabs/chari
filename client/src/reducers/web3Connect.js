import getWeb3 from './../utils/getWeb3';
import FundraiserFactory from 'shared/abis/FundraiserFactory.json'
import {NETWORKS} from 'shared/constants.js'

const WEB3_SETUP_REQUESTED = "WEB3_SETUP_REQUESTED";
const WEB3_SETUP_SUCCESS = "WEB3_SETUP_SUCCESS";
const WEB3_SETUP_ERROR = "WEB3_SETUP_ERROR";
const TRANSACTION_HASH = "TRANSACTION_HASH"

const UPDATE_EXPDATE = "UPDATE_EXPDATE";
const UPDATE_RECIPIENT = "UPDATE_RECIPIENT";
const UPDATE_SPONSOR = "UPDATE_SPONSOR";

const DEPLOY_REQUESTED = "DEPLOY_REQUESTED";
const DEPLOY_SUCCESS = "DEPLOY_SUCCESS";
const DEPLOY_ERROR = "DEPLOY_ERROR";
const DEPLOY_FINISH = "DEPLOY_FINISH";

const RESET_STORE = "RESET_STORE";

const initialState = {
    error: null,
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    transactionHash: null,
    networkId: null,
    recipient: null,
    expDate: null,
    isLoading: false,
    isConnected: false,
    deployer: null,
    sponsor: null,
    fundraiser: null,
    grant: null,
    isDeploying: false,
    isDeployed: false,
    justDeployed: false
};


export default (state = initialState, action) => {
    switch (action.type) {
        case WEB3_SETUP_REQUESTED:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case WEB3_SETUP_SUCCESS:
            console.log("success");
            return {
                ...state,
                isLoading: false,
                isConnected: true,
                ...action
            };

        case WEB3_SETUP_ERROR:
            return {
                ...state,
                isLoading: false,
                isConnected: false,
                error: action.error
            };
        case UPDATE_EXPDATE:
            return {
              ...state,
              expDate: action.expDate
            }
        case UPDATE_RECIPIENT:
            return {
              ...state,
              recipient: action.recipient
            }
        case TRANSACTION_HASH:
            return {
              ...state,
              transactionHash: action.hash
            }
        case UPDATE_SPONSOR:
            return {
                ...state,
                sponsor: action.sponsor
            }
        case DEPLOY_REQUESTED:
            return {
              ...state,
              isDeploying: true
            }
        case DEPLOY_SUCCESS:
            return {
              ...state,
              deployer: action.addresses.deployer,
              recipient: action.addresses.recipient,
              sponsor: action.addresses.sponsor,
              fundraiser: action.addresses.fundraiser,
              grant: action.addresses.grant,
              contract: action.contract,
              isDeploying: false,
              isDeployed: true,
              justDeployed: true
            }
        case DEPLOY_ERROR:
            return {
              ...state,
              error: action.error,
              isDeploying: false,
              isDeployed: false
            }
        case DEPLOY_FINISH:
            return {
                ...state,
                justDeployed: false
            }
        case RESET_STORE:
            return {
                ...state,
                deployer: null,
                recipient: null,
                sponsor: null,
                fundraiser: null,
                grant: null,
                contract: null,
                isDeployed: false
            }
        default:
            return state;
    }
};

export const updateRecipient = (recipient) => {
  return {
    type: UPDATE_RECIPIENT,
    recipient
  }
}

export const updateSponsor = (sponsor) => {
    return {
        type: UPDATE_SPONSOR,
        sponsor
    }
}

export const updateExpDate = (expDate) => {
  return {
    type: UPDATE_EXPDATE,
    expDate
  }
}

export const setupWeb3 = () => {
    return async dispatch => {
        dispatch({
            type: WEB3_SETUP_REQUESTED
        });

        try {
          const web3 = await getWeb3();
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();

            return dispatch({
                type: WEB3_SETUP_SUCCESS,
                web3,
                accounts,
                networkId,
            });
        } catch (error) {
            return dispatch({
                type: WEB3_SETUP_ERROR,
                error
            });
        }
    };
};

export const deploy = () => {
  return async (dispatch, getState) => {
      dispatch({
          type: DEPLOY_REQUESTED
      });

      try {
        const web3Connect = getState().web3Connect;
        const recipient = web3Connect.recipient;
        const sponsor = web3Connect.sponsor;
        const expiration = web3Connect.expDate;
        const web3 = web3Connect.web3;
        const networkId = web3Connect.networkId;
        const me = web3Connect.accounts[0]

        const contractAddress = NETWORKS.get(networkId).factory;
        const contract = new web3.eth.Contract(FundraiserFactory, contractAddress);

        if (web3.utils.isAddress(recipient) && typeof expiration === 'number' && expiration % 1 === 0) {
            const tx = contract.methods.newFundraiser(recipient, sponsor, expiration).send({
                from: me,
                gas: 2000000
            });

            tx.on('error', (e) => {
              console.log(e)
              dispatch({type: DEPLOY_ERROR});
            }).on('confirmation', (n,r) => console.log(n,r, 'conf'))
            .on('transactionHash', (hash) => {
              dispatch({
                type: TRANSACTION_HASH,
                hash: hash
              })
            })
            .then((receipt) => {
                const result = receipt.events.NewFundraiser.returnValues;
                const addresses = {
                    deployer: result[0],
                    recipient: result[1],
                    sponsor: result[2],
                    fundraiser: result[3],
                    grant: result[4]
                };
                dispatch({
                  type: DEPLOY_SUCCESS,
                  addresses,
                  contract
                });
            })
        }
      } catch (error) {
          return dispatch({
              type: DEPLOY_ERROR,
              error
          });
      }
  };
}
