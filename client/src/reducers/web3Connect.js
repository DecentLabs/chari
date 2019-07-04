import getWeb3 from './../utils/getWeb3';
import FundraiserFactory from '../contracts/FundraiserFactory.json'

const WEB3_SETUP_REQUESTED = "WEB3_SETUP_REQUESTED";
const WEB3_SETUP_SUCCESS = "WEB3_SETUP_SUCCESS";
const WEB3_SETUP_ERROR = "WEB3_SETUP_ERROR";

const UPDATE_EXPDATE = "UPDATE_EXPDATE";
const UPDATE_RECIPIENT = "UPDATE_RECIPIENT";
const UPDATE_SPONSOR = "UPDATE_SPONSOR"

const DEPLOY_REQUESTED = "DEPLOY_REQUESTED"
const DEPLOY_SUCCESS = "DEPLOY_SUCCESS"
const DEPLOY_ERROR = "DEPLOY_ERROR"

const DURATION = 7 * 24 * 60 * 60;

const initialState = {
    error: null,
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    networkId: null,
    recipient: '0x76E7a0aEc3E43211395bBBB6Fa059bD6750F83c3',
    expDate: Math.floor(Date.now() / 1000) + DURATION,
    isLoading: false,
    isConnected: false,
    deployer: null,
    sponsor: null,
    fundraiser: null,
    grant: null,
    isDeploying: false,
    isDeployed: false
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
              isDeployed: true
            }
        case DEPLOY_ERROR:
            return {
              ...state,
              error: action.error,
              isDeploying: false,
              isDeployed: false
            }
        default:
            return state;
    }
};

export const updateRecipient = (recipient) => {
  return {
    type: UPDATE_RECIPIENT,
    recipient: recipient
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
    expDate: expDate
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
                web3: web3,
                accounts: accounts,
                networkId: networkId,
            });
        } catch (error) {
            return dispatch({
                type: WEB3_SETUP_ERROR,
                error: error
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

        const abi = FundraiserFactory.abi;
        const contractAddress = FundraiserFactory.networks['4'].address;
        const contract = new web3.eth.Contract(abi, contractAddress);

        if (web3.utils.isAddress(recipient) && typeof expiration === 'number' && expiration % 1 === 0) {
            const tx = contract.methods.deploy(recipient, sponsor, expiration).send({
                from: sponsor,
                gas: 1000000
            });

            tx.on('error', (e) => {
              dispatch({type: DEPLOY_ERROR});
            }).on('confirmation', (n,r) => console.log(n,r, 'conf'))
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
                  contract: contract
                });
            })
        }
      } catch (error) {
          return dispatch({
              type: DEPLOY_ERROR,
              error: error
          });
      }
  };
}
