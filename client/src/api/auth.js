import axios from "./axios";

const API = 'http://localhost:4000/api'

export const registerRequest = (user) => axios.post(`/register`, user)

export const loginRequest = (user) => axios.post(`/login`, user)

export const verityTokenRequet = () => axios.get('/verify')

// export const logoutRequest = () => axios.