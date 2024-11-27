


const getUserByFromLS=()=>{
    const userId = localStorage.getItem("userId")
    return userId||null
}
export const methods={
    getUserByFromLS
}