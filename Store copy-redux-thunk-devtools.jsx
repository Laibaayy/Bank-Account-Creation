import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from 'redux-thunk';
import reducer from "./bank/src/Components/Accounts/AccountSlice";
import reducercustomer from "./bank/src/Components/Customers/CustomerSlice";
import { composeWithDevTools } from "redux-devtools-extension"


const RootStore = combineReducers({
    reducer: reducer,
    customer: reducercustomer
})
const store = createStore(RootStore, composeWithDevTools(applyMiddleware(thunk)));





export default store
