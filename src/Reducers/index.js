const rootReducers = (state = [], action) => {

    switch (action.type) {
        case 'ADD_CUSTOMER':
            return [
                ...state, {
                    id: action.id,
                    email: action.email,
                    completed: false
                }
            ]

        case 'TOGGLE_CUSTOMER':
            return state.map(customer =>
                (customer.id === action.id)
                    ? { ...customer, completed: !customer.completed } :
                    customer)
        default:
            return state
    }
}

export default rootReducers