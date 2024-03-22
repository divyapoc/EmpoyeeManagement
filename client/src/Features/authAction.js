import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const backendURL = 'http://localhost:7300/'
// const  navigate = useNavigate()
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
     const {data}= await axios.post(
        `${backendURL}api/user/`,
        { name, email, password },
        config
      )
      console.log(data)
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.post(
          `${backendURL}api/user/login`,
          { email, password },
          config
        )
        console.log(data)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('userToken', data.token)
        // localStorage.setItem('user', data.user)
        return data
      } catch (error) {
        if (error.response && error.response.data.message) {
         
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )