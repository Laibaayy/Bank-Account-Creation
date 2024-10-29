import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    Fullname: "",
    nationalID: "",
    CreatedAt: "",
}

const CustomerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        createcustomer: {
            prepare(Fullname, nationalID, CreatedAt) {
                return {
                    payload: { Fullname, nationalID, CreatedAt: new Date().toISOString() }
                }
            },
            reducer(state, action) {
                state.Fullname = action.payload.Fullname;
                state.nationalID = action.payload.nationalID;
                state.CreatedAt = action.payload.CreatedAt;
            }
        },
        update(state, action) {
            state.Fullname = action.payload
        }

    }
})

export const { createcustomer, update } = CustomerSlice.actions
export default CustomerSlice.reducer


// export default function reducercustomer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case "customer/createcustomer":
//             return { ...state, Fullname: action.payload.Fullname, nationalID: action.payload.nationalID, CreatedAt: action.payload.CreatedAt }
//         case "customer/update":
//             return { ...state, Fullname: action.payload }
//         default:
//             return state;
//     }
// }

// export function createcustomer(Fullname, nationalID) {
//     return { type: "customer/createcustomer", payload: { Fullname: Fullname, nationalID: nationalID, CreatedAt: new Date().toISOString() } }
// }

// export function updatename(Fullname) {
//     return { type: "customer/update", payload: Fullname }
// }

// store.dispatch(createcustomer("Laiba", "H55"))
// console.log(store.getState());
// store.dispatch(updatename("Nimra"))
// console.log(store.getState());