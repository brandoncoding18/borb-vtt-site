
import { configureStore } from '@reduxjs/toolkit'
import zvkSlice from './zvkSlice'

export default configureStore({
  reducer: {
    zvk: zvkSlice,
  },
})