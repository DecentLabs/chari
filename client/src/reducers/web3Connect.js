import { default as Web3 } from "web3";
import getWeb3 from './../utils/getWeb3';

export const WEB3_SETUP_REQUESTED = "WEB3_SETUP_REQUESTED";
export const WEB3_SETUP_SUCCESS = "WEB3_SETUP_SUCCESS";
export const WEB3_SETUP_ERROR = "WEB3_SETUP_ERROR";
export const WEB3_ACCOUNT_CHANGE = "WEB3_ACCOUNT_CHANGE";


const DURATION = 7 * 24 * 60 * 60

const initialState = {
    error: null,
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    recipient: '0x76E7a0aEc3E43211395bBBB6Fa059bD6750F83c3',
    expDate: Math.floor(Date.now() / 1000) + DURATION,
    isLoading: false,
    isConnected: false
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
            console.log("succes");
            return {
                ...state,
                isLoading: false,
                isConnected: true,

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

        default:
            return state;
    }
};

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
