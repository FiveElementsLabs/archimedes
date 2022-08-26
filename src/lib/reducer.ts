import actions from "./actions";

type action = {
  type: string;
  payload?: any;
};

export const initialState = {
  is_connected: false,
  account: "",
  provider: null,
  network_name: null,
  chain_id: null,
  loading: false,
};

export const reducer = (state: typeof initialState, action: action) => {
  switch (action.type) {
    case actions.LOGIN_WALLET:
      window.localStorage.setItem("shouldConnectMetamask", "true");
      return {
        ...state,
        is_connected: true,
        account: action.payload.account,
        provider: action.payload.provider,
        network_name: action.payload.network_name,
        chain_id: action.payload.chain_id,
      };

    case actions.LOGOUT_WALLET:
      window.localStorage.removeItem("shouldConnectMetamask");
      return {
        ...state,
        is_connected: false,
        account: "",
        provider: null,
        network_name: null,
        chain_id: null,
      };

    case actions.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case actions.CHANGE_NETWORK:
      return {
        ...state,
        network_name: action.payload.network_name,
        chain_id: action.payload.chain_id,
      };

    default:
      return state;
  }
};
