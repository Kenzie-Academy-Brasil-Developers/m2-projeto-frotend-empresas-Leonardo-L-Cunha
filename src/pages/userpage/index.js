import {dataUser} from "../../scripts/request.js";
import {modalEditUser} from "../../scripts/modal.js"
await dataUser()
const getOut =  () => {
    const logout = document.querySelector(".btn-logout")

    logout.addEventListener("click", ()=> {
        localStorage.removeItem("user")
        localStorage.removeItem("dataUser")
        window.location.replace("/src/pages/homepage/index.html")
    })
}

const renderName =  async () => {
    const data  = await JSON.parse(localStorage.getItem("dataUser"))
   
    const div = document.querySelector(".box-card-head")
    div.innerHTML = ""
    const h2 = document.createElement("h2")
    const divText = document.createElement("div")
    const Pmail = document.createElement("p")
    const PLevel = document.createElement("p")
    const PKindWork = document.createElement("p")
    const button = document.createElement("button")

    divText.classList.add("box-text-head")
    button.id = "edit-user"

    button.addEventListener("click",()=> {
        const body = document.querySelector("body")
        const modal = modalEditUser()
        body.appendChild(modal)
        modal.showModal()
        
    })

    h2.innerText = data.username
    Pmail.innerText = data.email
    PLevel.innerText = data.professional_level
    if(data.kind_of_work == null){
        PKindWork.innerText = ""
    }else{
        PKindWork.innerText = data.kind_of_work
    }
    
    if(data.department_uuid ==null ){
        const section = document.querySelector(".main-sect")
        section.innerHTML = ""
        const h1 = document.createElement("h1")
        h1.classList.add("not-hire")
        h1.innerText = "Voce ainda nao foi contratado"
        section.appendChild(h1)
    }
    
    divText.append(Pmail,PLevel,PKindWork,button)
    div.append(h2,divText)
}


const verifyPermission =  () => {
    const user = JSON.parse(localStorage.getItem("dataUser"))
    
    if (user.error == "invalid token") {
        localStorage.removeItem("dataUser")
        window.location.replace("/src/pages/homepage/index.html")
        
    }
 
    renderName()
    getOut()
    
}
verifyPermission()



export {renderName}