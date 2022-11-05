import {dataUser,editProfile} from "../../scripts/request.js"


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
const modalEditUser = () => {
    const modal = document.createElement("dialog")
    const divCard = document.createElement("div")
    const h2 = document.createElement("h2")
    const buttonClose = document.createElement("button")
    const form = document.createElement("form")
    const inputName = document.createElement("input")
    const inputMail = document.createElement("input")
    const inputPassword = document.createElement("input")
    const buttonRegister = document.createElement("button")

    divCard.classList.add("card-modal")
    buttonClose.classList.add("btn-close")
    form.classList.add("form-modal")
    inputName.classList.add("inputs")
    inputMail.classList.add("inputs")
    inputPassword.classList.add("inputs")
    buttonRegister.classList.add("btn-register-2")

    h2.innerText = "Editar Perfil"
    buttonClose.innerText = "X"
    buttonRegister.innerText = "Editar Perfil"
    buttonRegister.type = "submit"

    inputName.type = "text"
    inputName.placeholder = "Seu nome"
    inputName.required = "true"
    inputName.name = "username"
    
    inputMail.type = "email"
    inputMail.placeholder = "Seu e-mail"
    inputMail.required = "true"
    inputMail.name = "email"

    inputPassword.type = "password"
    inputPassword.placeholder = "Sua senha"
    inputPassword.required = "true"
    inputPassword.name = "password"
   

    form.append(inputName,inputMail,inputPassword,buttonRegister)
    divCard.append(h2,buttonClose,form)
    modal.appendChild(divCard)

    const elements = [...form.elements]
    buttonClose.addEventListener("click", ()=> {
        modal.close()
    })
    form.addEventListener("submit", async  (event) => {
        
        event.preventDefault()
        const body = {}

        elements.forEach((input) => {
            if(input.tagName == "INPUT" && input.value != ""){
                body [input.name] = input.value
            }
        })
        await editProfile(body)
        modal.close()
        await dataUser()
        await renderName()
    })

    return modal


}

const verifyPermission =  async () => {
    const user = JSON.parse(localStorage.getItem("dataUser"))
    
    if (user.error == "invalid token") {
        localStorage.removeItem("dataUser")
        window.location.replace("/src/pages/homepage/index.html")
        
    }
    
    await renderName()
    getOut()
    
}
verifyPermission()





