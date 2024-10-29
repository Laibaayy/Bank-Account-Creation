import React from 'react'
import { combineReducers, createStore } from "redux"
const initialState = {
    Balance: 0,
    Loan: 0,
    Loanpurpose: ""
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, Balance: state.Balance + action.payload }
        case "account/withdraw":
            return { ...state, Balance: state.Balance - action.payload }
        case "account/loan":
            if (state.Loan > 0) return;
            return { ...state, Balance: state.Balance + action.payload.ammount, Loan: state.Loan + action.payload.ammount, Loanpurpose: action.payload.purpose }
        case "account/payloan":
            return { ...state, Balance: state.Balance - state.Loan, Loan: 0, Loanpurpose: "" }

        default:
            return state;
    }
}


const initialStateCustomer = {
    Fullname: "",
    nationalID: "",
    CreatedAt: "",
}



function reducercustomer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createcustomer":
            return { ...state, Fullname: action.payload.Fullname, nationalID: action.payload.nationalID, CreatedAt: action.payload.CreatedAt }
        case "customer/update":
            return { ...state, Fullname: action.payload }
        default:
            return state;
    }
}

function createcustomer(Fullname, nationalID) {
    return { type: "customer/createcustomer", payload: { Fullname: Fullname, nationalID: nationalID, CreatedAt: new Date().toISOString() } }
}

function updatename(Fullname) {
    return { type: "customer/update", payload: Fullname }
}

const RootStore = combineReducers({
    reducer: reducer,
    customer: reducercustomer
})
const store = createStore(RootStore);


store.dispatch(createcustomer("Laiba", "H55"))
console.log(store.getState());
store.dispatch(updatename("Nimra"))
console.log(store.getState());
// store.dispatch({ type: "account/deposit", payload: 500 })
// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 })
// console.log(store.getState());

// store.dispatch({ type: "account/loan", payload: { ammount: 1000, purpose: "Buy cloths" } })
// console.log(store.getState());

// store.dispatch({ type: "account/payloan" })

function deposit(ammount) {
    return { type: "account/deposit", payload: ammount }
}
store.dispatch(deposit(500));
console.log(store.getState());

function withdraw(ammount) {
    return { type: "account/withdraw", payload: ammount }
}
store.dispatch(withdraw(200));
console.log(store.getState());


function loan(ammount, purpose) {
    return { type: "account/loan", payload: { ammount: ammount, purpose: purpose } }
}
store.dispatch(loan(1000, "buy a car"));
console.log(store.getState());

function payloan() {
    return { type: "account/payloan" }
}
store.dispatch(payloan());
console.log(store.getState());



const Store = () => {
    return (
        <div>Store</div>
    )
}

export default Store








