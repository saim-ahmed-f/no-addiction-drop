import SignInSide from "../LoginComponents/LoginPage"


import {useRouter} from "next/router"

import toast from "../spinnerComponents/noitificationComp"


export default function LoginPageForUser(){
    const router = useRouter()
    

    const LoginRequestToServer = async (user_name , pass_word) => {
        

        const mainData = {
            "username" : user_name,
            "password" : pass_word,
        }

        const res = await fetch(
        `https://alcoban-vbk7q.ondigitalocean.app/accounts/login-user/${user_name}/${pass_word}/`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(mainData),
        }
        );
        
        const responseData = res.json()

        
        responseData.then(item=>{
            localStorage.setItem("mainUserValue", JSON.stringify(item.data))
        } )
        if (res.ok === true){
            //<NotifyerComponent mainHeading={"Login !"} type={"success"} gettingNotiFunc={true}/>
            toast({ type : "success" , message : "success"})
            router.push("/admin")
        }
        else{
            toast({ type : "error" , message : "Invalid Username / Password"})
            //<NotifyerComponent mainHeading={"Invalid Username / Password"} type={"error"} gettingNotiFunc={true}/>
        }
    }

    

    return <SignInSide gettingDataForLogin = {LoginRequestToServer} />
}

