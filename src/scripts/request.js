import { popUp,popUpErro } from "./popUp.js"
const baseUrl = "http://localhost:6278/"
const token = JSON.parse(localStorage.getItem("user")) || ""

const listSector = async () => {
    try{
        const request = await fetch(`${baseUrl}companies`)

        const response = await request.json()

        return response
    }catch(err){
        console.log(err)
    }
}

const register = async (body) => {
    try{
        const request = await fetch("http://localhost:6278/auth/register",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        
        if(request.ok){
            popUp()
            setTimeout(()=> {
                window.location.replace("/src/pages/login/index.html")
            },4000)
        }
    }catch(err){
        console.log(err)
    }
}

const login = async (body) => {
    try{
        const request = await fetch(`${baseUrl}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        if(request.ok){
            localStorage.setItem("user",JSON.stringify(response))
            verifyUser(response.token)
        }else{
            popUpErro()
        }
        
    }catch(err){
        console.log(err)
        popUpErro()
    }
}

const verifyUser = async (verifyToken)=>{
    
    try{
        const request = await fetch(`${baseUrl}auth/validate_user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${verifyToken}`
            }
        }) 
       
        const response = await request.json()
        if(response.is_admin){
            window.location.replace("/src/pages/admpage/index.html")
        }else{
            window.location.replace("/src/pages/userpage/index.html")
        }
    }catch(err){
        console.log(err)
    }
}

const dataUser = async ()=> {
    try{
        const request = await fetch(`${baseUrl}users/profile`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        const response = await request.json()
        localStorage.setItem("dataUser",JSON.stringify(response))
    }catch(err){
        console.log(err)
    }
}

const editProfile = async (body) => {
    try{
        const request = await fetch(`${baseUrl}users`,{
            method: "PATCH",
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token.token}`
            },
            body : JSON.stringify(body)
        })
        const response = await request.json()
        return response
    }catch(err){
        console.log(err)
    }
} 

const allDepart = async () => {
    try{
        const request = await fetch(`${baseUrl}departments`, {
            method: "GET",
            headers:{
                "Content-Type": "applicantion/json",
                Authorization: `Bearer ${token.token}`
            }
        })
        const response = await request.json()
        return response
    }catch(err){
        console.log(err)
    }
}
const departPerId = async (id) => {
    try{
        const request = await fetch(`${baseUrl}departments/${id}`, {
            method: "GET",
            headers:{
                "Content-Type": "applicantion/json",
                Authorization: `Bearer ${token.token}`
            }
        })
        const response = await request.json()
        return response
    }catch(err){
        console.log(err)
    }
}
const allUsers = async () => {
    try{
        const request = await fetch(`${baseUrl}users`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            }
        })
        const response = await request.json()
        return response
    }catch(err){
        console.log(err)
    }
}
const editProfileAdm = async (body,id) => {
    try{
        const request = await fetch(`${baseUrl}admin/update_user/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        return response
    }catch(err){
        console.log(err)
    }
}
const deleteUser = async(id) => {
    try{
        const request = await fetch(`${baseUrl}admin/delete_user/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            }
        })
        
    }catch(err){
        console.log(err)
    }
}
const departCreate = async (body) => {
    try{
        const request = await fetch(`${baseUrl}departments`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
                
            },
            body : JSON.stringify(body)
        })
        const response = await request.json()
        
        return response
    }catch(err){
        console.log(err)
    }
}
const editDepart = async  (body,id) => {
    try{
        const request = await fetch(`${baseUrl}departments/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        return response
    }catch(err){
        console.log(err)
    }
} 
const deleteDepart = async (id) => {
    try{
        const request = await fetch(`${baseUrl}departments/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.token}`
            }
        })
    }catch(err){
        console.log(err)
    }
}
export {
    listSector, register,login,
    dataUser,editProfile,allDepart,
    departPerId,allUsers,editProfileAdm,
    deleteUser,departCreate,editDepart,
    deleteDepart
}