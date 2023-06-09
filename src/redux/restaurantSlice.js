import {createSlice} from '@reduxjs/toolkit'


export const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState: {
        restaurants: []
    },
    reducers: {
        setRestaurants: (state, action) => {
            state.restaurants = action.payload
        },
        // getRestaurants: (state, action) => {
        //     console.log(action.payload);
        //     state.restaurants = action.payload
        // },

        // updateRestaurant: (state, action) => {
        //     state.restaurants = action.payload
        // },
        // deleteRestaurant: (state, action) => {
        //     state.restaurants = action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const {setRestaurants} = restaurantSlice.actions

export default restaurantSlice.reducer
