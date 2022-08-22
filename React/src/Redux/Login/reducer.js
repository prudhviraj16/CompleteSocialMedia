import { LOGIN_START,LOGIN_SUCCESS,LOGIN_FAILURE,FOLLOW,UNFOLLOW } from "./action";


const initialState = {
    // user : null,
    // isFetching : false,
    // error : false
    user : {
        _id:"62f23e99f5085946db55cba2",
        username:"Mike",
        email:"mike@gmail.com",
        password:"$2b$10$z3gxj1Odl4ssHTK8nsHkROEpBviHc6VLy/ttFt4Dl8wt7XkCBTYqO",
        profilePicture:"",
        coverPicture:"",
        followers:[],
        followings:[],
 
    },
    isFetching : false,
    error : false
   
}




const loginReducer = (state=initialState,action) =>{
    switch(action.type){
        case LOGIN_START :
            return {
                ...state,
                user:null,
                isFetching : true,
                error : false
            }
        case LOGIN_SUCCESS : 
            return {
                ...state,
                user : action.payload,
                isFetching : false,
                error : false
            }
        case LOGIN_FAILURE : 
            return {
                ...state,
                user : null,
                isFetching : false,
                error : true
            }
        
        case FOLLOW :
            return {
                ...state,
                user : {
                    ...state.user,
                    followings : [...state.user.followings,action.payload]
                }
            }
        
        case UNFOLLOW :
        return {
            ...state,
            user : {
                ...state.user,
                followings : [...state.user.followings.filter((following)=> following!==action.payload)]
            }
        }
        default : 
            return state 
    }
}

export default loginReducer


