import {ADD_CUSTOMER, TOGGLE_CUSTOMER} from './actionType'

let nextId = 0
export const addCustomer = (email) => ({
    type: ADD_CUSTOMER,
    id: nextId++,
    email
})

export const toggleCustomer = (id) => ({
    type: TOGGLE_CUSTOMER,
    id
})
