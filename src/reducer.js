export const initialState = {
    basket: [],
    user: null,
    shippingData: {},
    paymentMessage: "",
}

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
    SET_SHIPPINGDATA: "SET_SHIPPINGDATA",
    SET_PAYMENT_MESSAGE: "SET_PAYMENT_MESSAGE",
}

export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => amount + item.price, 0)
}

const reducer = (state, action)=>{
    console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
            return{
                ...state,
                basket: [...state.basket, action.item],
            };
        case "REMOVE_ITEM":
            const index = state.basket.findIndex((basketItem=>basketItem.id === action.id));
            let newBasket = [...state.basket];
            if(index>=0){newBasket.splice(index,1);} else {console.log("Can't remove product"); }
            return {
                ...state,
                basket: newBasket,
              };
              case "SET_USER":
                return{
                    ...state,
                    user:action.user
                }
                case "EMPTY_BASKET":
                    return{
                        ...state,
                        basket: []
                    }
                case "SET_SHIPPINGDATA":
                    return{
                        ...state,
                        shippingData: action.shippingData
                    }
                case "SET_PAYMENT_MESSAGE":
                    console.log("Action payload:", action.paymentMessage);
                    return{
                        ...state,
                        paymentMessage: action.paymentMessage,
                    };
            default: return state;
    }
}

export default reducer;