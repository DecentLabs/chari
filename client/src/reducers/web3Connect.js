import getWeb3 from './../utils/getWeb3';

const WEB3_SETUP_REQUESTED = "WEB3_SETUP_REQUESTED";
const WEB3_SETUP_SUCCESS = "WEB3_SETUP_SUCCESS";
const WEB3_SETUP_ERROR = "WEB3_SETUP_ERROR";
const WEB3_ACCOUNT_CHANGE = "WEB3_ACCOUNT_CHANGE";
const UPDATE_EXPDATE = "UPDATE_EXPDATE";
const UPDATE_RECIPIENT = "UPDATE_RECIPIENT";
const UPDATE_ADDRESSES = "UPDATE_ADDRESSES";
const UPDATE_CONTRACT = "UPDATE_CONTRACT";
const UPDATE_DEPLOYING = "UPDATE_DEPLOYING";

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

        case WEB3_ACCOUNT_CHANGE:
            return {
                ...state,
            };
        case UPDATE_DEPLOYING:
            return {
                ...state,
                isDeploying: action.isDeploying
            }
        case UPDATE_CONTRACT:
            return {
                ...state,
                contract: action.contract
            }
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
        case UPDATE_ADDRESSES:
            return {
                ...state,
                deployer: action.addresses.deployer,
                recipient: action.addresses.recipient,
                sponsor: action.addresses.sponsor,
                fundraiser: action.addresses.fundraiser,
                grant: action.addresses.grant,
                isDeploying: false
            }
        default:
            return state;
    }
};

export const updateContract = (contract) => {
    return {
        type: UPDATE_RECIPIENT,
        contract
    }
}

export const updateRecipient = (recipient) => {
  return {
    type: UPDATE_RECIPIENT,
    recipient: recipient
  }
}

export const updateExpDate = (expDate) => {
  return {
    type: UPDATE_EXPDATE,
    expDate: expDate
  }
}

export const updateAddresses = (addresses) => {
    return {
        type: UPDATE_ADDRESSES,
        addresses
    }
}

export const updateDeploying = (isDeploying) => {
    return {
        type: UPDATE_ADDRESSES,
        isDeploying
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
