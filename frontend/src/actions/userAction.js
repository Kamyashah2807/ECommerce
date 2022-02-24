import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../constants/userConstant'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios
            .post(`http://localhost:2000/api/login`, { email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const register = (userdata) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_REQUEST
        })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios
            .post(`http://localhost:2000/api/register`, { userdata }, config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}