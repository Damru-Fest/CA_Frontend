"use client"
import UserInfo from "../Admin/components/userinfo" 
const adminPage= () => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");
    if (loggedIn === "true"){
        return(
            <>
            <UserInfo></UserInfo>
            </>
        )
    }else{
        window.location.href = "/Pages/AdminAuth"
    }
    
}
export default adminPage;