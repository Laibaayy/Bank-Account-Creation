import React from 'react'
import { useSelector } from 'react-redux'

const CustomerAcc = () => {

    const name = useSelector(store => store.customer.Fullname)

    return (
        <h1>Customer, {name}</h1>
    )
}

export default CustomerAcc 