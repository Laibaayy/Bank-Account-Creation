import React from 'react'
import { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { createcustomer } from './CustomerSlice'
const initialstate = {
    name: "",
    nationalID: ""
}

function reducer(state, action) {
    switch (action.type) {
        case "SetName":
            return { ...state, name: action.payload }
        case "SetNationalID":
            return { ...state, nationalID: action.payload }
        default:
            return state;
    }
}


const CreateCustomer = () => {

    const [state, dispatch] = useReducer(reducer, initialstate)
    const { name, nationalID } = state
    const dispatching = useDispatch()
    const buttonhandler = () => {
        if (!name || !nationalID) return;
        dispatching(createcustomer(name, nationalID))
    }
    return (
        <div className='customerdata'>
            <h1>Create New Customer</h1>
            <div>
                <label htmlFor="">Customer Full Name:</label>
                <input type="text" name="" id="" value={name} onChange={(e) => dispatch({ type: "SetName", payload: e.target.value })} />
            </div>

            <div>
                <label htmlFor="">Customer nationalID:</label>
                <input type="text" name="" id="" value={nationalID} onChange={(e) => dispatch({ type: "SetNationalID", payload: e.target.value })} />
            </div>
            <div>
                <button className='btn' onClick={buttonhandler}>Create New Customer</button>
            </div>

        </div>
    )
}

export default CreateCustomer