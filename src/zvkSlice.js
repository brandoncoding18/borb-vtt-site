import { createSlice } from '@reduxjs/toolkit'

export const zvkSlice = createSlice({
  name: 'zvk',
  initialState: {
    value: 0,
    pageSelect :  {name : 'Armory',  tag : "armory-icon-0.jpg"},
    pages : [
        {name : 'Armory',  tag : "armory-icon-0.jpg"},
        {name : 'Spells',  tag : "armory-icon-0.jpg"},
        {name : 'Classes',  tag : "armory-icon-0.jpg"},
        {name : 'Feats',  tag : "armory-icon-0.jpg"},
        {name : 'DatabaseGUI',  tag : "armory-icon-0.jpg"},
        {name : 'Nations',  tag : "armory-icon-0.jpg"},
        {name : 'Races',  tag : "armory-icon-0.jpg"},
        {name : 'Rules',  tag : "armory-icon-0.jpg"},

    ]
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    selectPage: (state, action) => {
        state.pageSelect = action.payload; 
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, selectPage } = zvkSlice.actions

export default zvkSlice.reducer