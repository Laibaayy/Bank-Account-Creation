import React from 'react'
import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deposit, loan, payloan, withdraw } from './AccountSlice'

const initialState = {
    depositammount: '',
    withdrawammount: '',
    currency: "Dollar",
    loanammount: '',
    loanpurpose: ""
}
function reducer(state, action) {
    switch (action.type) {
        case "depositammount":
            return { ...state, depositammount: action.payload }
        case "withdrawammount":
            return { ...state, withdrawammount: action.payload }
        case "setcurrency":
            return { ...state, currency: action.payload }
        case "setloanammount":
            return { ...state, loanammount: action.payload }
        case "setloanpurpose":
            return { ...state, loanpurpose: action.payload }
        default:
            return state;
    }
}
const CreateAccount = () => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { depositammount, withdrawammount, currency, loanammount, loanpurpose } = state
    const { Loan, Loanpurpose, Balance, isLoading } = useSelector(store => store.reducer)
    console.log("state:", Balance);
    const dispatching = useDispatch()
    const deposithandler = () => {
        if (!depositammount) return;
        dispatching(deposit(parseFloat(depositammount), currency))
        dispatch({ type: "depositammount", payload: "" });
        dispatch({ type: "setcurrency", payload: 'Dollar' });

    }
    const withdrawhandler = () => {
        if (!withdrawammount) return;
        dispatching(withdraw(parseFloat(withdrawammount)))
        dispatch({ type: "withdrawammount", payload: "" });

    }
    const reqloanhandler = () => {
        if (!loanammount || !loanpurpose) return;
        dispatching(loan(parseFloat(loanammount), loanpurpose))
        dispatch({ type: "setloanammount", payload: "" });
        dispatch({ type: "setloanpurpose", payload: "" });

    }
    const payloanhandler = () => {
        dispatching(payloan())

    }

    return (
        <div>
            <h1>Your Account Operation</h1>
            <div>
                <label htmlFor="">Deposit: </label>
                <input type="text" value={depositammount} onChange={(e) => dispatch({ type: "depositammount", payload: e.target.value })} />
                <select name="" id="" value={currency} onChange={(e) => dispatch({ type: "setcurrency", payload: e.target.value })}>
                    <option value="INR">INR</option>
                    <option value="EUR">Euro</option>
                    <option value="USD">USD</option>
                </select>
                <button className='btnn' onClick={deposithandler}>{isLoading ? "Converting..." : ` Deposit  ${depositammount}`}</button>
            </div>
            <div>
                <label htmlFor="">Withdraw:</label>
                <input type="text" name="" id="" value={withdrawammount} onChange={(e) => dispatch({ type: "withdrawammount", payload: +e.target.value })} />
                <button className='btnn' onClick={withdrawhandler}>Withdraw</button>
            </div>
            <div>
                <label htmlFor="">Request Loan:</label>
                <input type="text" name="" id="" value={loanammount} onChange={(e) => dispatch({ type: "setloanammount", payload: +e.target.value })} />
                <input type="text" name="" id="" placeholder='Loan purpose' value={loanpurpose} onChange={(e) => dispatch({ type: "setloanpurpose", payload: e.target.value })} />
                <button className='btnn' onClick={reqloanhandler}>Request Loan</button>
            </div>
            {Loanpurpose || Loan ? (
                <div>
                    <label htmlFor="">Pay Back {Loan} {Loanpurpose}:</label>
                    <button onClick={payloanhandler}>Pay Loan</button>
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default CreateAccount


