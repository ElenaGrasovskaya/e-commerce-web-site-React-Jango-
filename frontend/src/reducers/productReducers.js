import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state={products:[]}, actions) => {
    switch(actions.type){
        case PRODUCT_LIST_REQUEST:
            return{loading: true, products: []};

        case PRODUCT_LIST_SUCCESS:
            return{loading: false, products: actions.payload};
            
        case PRODUCT_LIST_FAIL:
            return{loading: true, error: actions.payload};
        
        default: 
            return state;
    }
}

export const productDetailsReducer = (state={product:{reviews:[]}}, actions) => {
    switch(actions.type){
        case PRODUCT_DETAILS_REQUEST:
            return{loading: true, ...state};

        case PRODUCT_DETAILS_SUCCESS:
            return{loading: false, product: actions.payload};
            
        case PRODUCT_DETAILS_FAIL:
            return{loading: true, error: actions.payload};
        
        default: 
            return state;
    }
}