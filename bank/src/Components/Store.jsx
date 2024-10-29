
import { configureStore } from "@reduxjs/toolkit"
import reducer from "./Accounts/AccountSlice"
import reducercustomer from "./Customers/CustomerSlice"

const store = configureStore({
    reducer: {
        reducer: reducer,
        customer: reducercustomer
    }
})





export default store
