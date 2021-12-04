import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = { products: [] }, actions) => {
  switch (actions.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, products: actions.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: actions.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = { products: [] }, actions) => {
  switch (actions.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, products: actions.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: actions.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  actions
) => {
  switch (actions.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: actions.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: actions.payload };

    default:
      return state;
  }
};