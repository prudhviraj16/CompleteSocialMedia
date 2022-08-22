import axios from 'axios'


export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'



export const loginStart = ()=>({
    type : LOGIN_START,
})

export const loginSuccess = (user) =>({
    type : LOGIN_SUCCESS,
    payload : user 
})

export const loginFailure = (error) =>({ 
    type : LOGIN_FAILURE,
    payload : error
})

export const follow = (userId) =>({
    type :FOLLOW,
    payload : userId
})

export const unfollow = (userId) =>({
    type : UNFOLLOW,
    payload : userId
})

export const fetchData = (data) => {
    return async (dispatch) => {
        try{
            dispatch(loginStart())    
            let res = await axios.post('http://localhost:4000/api/auth/login',data)
            dispatch(loginSuccess(res.data))
        }
        catch(err){
            dispatch(loginFailure(err.message))
        }
    }
}

