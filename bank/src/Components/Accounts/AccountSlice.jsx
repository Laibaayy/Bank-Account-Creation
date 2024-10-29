import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    Balance: 0,
    Loan: 0,
    Loanpurpose: "",
    isLoading: false,
}

const AccountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
        deposit(state, action) {
            state.Balance = state.Balance + action.payload;
            state.isLoading = false
        },
        withdraw(state, action) {
            state.Balance = state.Balance - action.payload
        },
        loan: {
            prepare(ammount, purpose) {

                return {
                    payload: { ammount, purpose }
                }
            },

            reducer(state, action) {
                if (state.Loan > 0) return state;
                state.Balance = state.Balance + action.payload.ammount;
                state.Loan = state.Loan + action.payload.ammount;
                state.Loanpurpose = action.payload.purpose
            }
        },
        payloan(state, action) {
            state.Balance = state.Balance - state.Loan;
            state.Loan = 0; state.Loanpurpose = ""
        },
        cuurencyloader(state) {
            state.isLoading = true
        }
    }
})
export function deposit(ammount, currency) {
    if (!currency) {
        console.error('Currency is required for deposit function.');
        return;
    }
    if (currency === "USD") return { type: "account/deposit", payload: ammount }
    console.log(currency);
    return async function (dispatch, getState) {
        dispatch({ type: "account/cuurencyloader" })
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${ammount}&from=${currency}&to=USD`)
        const data = await res.json()
        const converter = data.rates.USD
        dispatch({ type: "account/deposit", payload: converter })

    }
}


console.log(AccountSlice);
export const { withdraw, loan, payloan } = AccountSlice.actions
export default AccountSlice.reducer
// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return { ...state, Balance: state.Balance + action.payload, isLoading: false }
//         case "account/withdraw":
//             return { ...state, Balance: state.Balance - action.payload }
//         case "account/loan":
//             if (state.Loan > 0) return state;
//             return { ...state, Balance: Number(state.Balance + action.payload.ammount), Loan: state.Loan + action.payload.ammount, Loanpurpose: action.payload.purpose }
//         case "account/payloan":
//             return { ...state, Balance: state.Balance - state.Loan, Loan: 0, Loanpurpose: "" }
//         case "account/cuurencyloader":
//             return { ...state, isLoading: true }

//         default:
//             return state;
//     }
// }


// export function deposit(ammount, currency) {
//     if (!currency) {
//         console.error('Currency is required for deposit function.');
//         return;
//     }
//     if (currency === "USD") return { type: "account/deposit", payload: ammount }
//     console.log(currency);
//     return async function (dispatch, getState) {
//         dispatch({ type: "account/cuurencyloader" })
//         const res = await fetch(`https://api.frankfurter.app/latest?amount=${ammount}&from=${currency}&to=USD`)
//         const data = await res.json()
//         const converter = data.rates.USD
//         dispatch({ type: "account/deposit", payload: converter })

//     }
// }




// export function withdraw(ammount) {
//     return { type: "account/withdraw", payload: ammount }
// }



// export function loan(ammount, purpose) {
//     return { type: "account/loan", payload: { ammount: ammount, purpose: purpose } }
// }


// export function payloan() {
//     return { type: "account/payloan" }
// }



