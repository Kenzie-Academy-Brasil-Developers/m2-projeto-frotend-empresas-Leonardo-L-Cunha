import { listSector,allDepart,departPerId,allUsers,listEmployerNotHire,employerPerDepart} from "../../scripts/request.js"
import { modalAdmEdit,modalDelUser,createDepartment,editDescript,modalDelDepart,seeModal } from "../../scripts/modal.js"
const getOut =  () => {
    const logout = document.querySelector(".btn-logout")

    logout.addEventListener("click", ()=> {
        localStorage.removeItem("user")
        localStorage.removeItem("dataUser")
        localStorage.removeItem("hired")
        localStorage.removeItem("deparUser")
        localStorage.removeItem("deparUserDel")
        window.location.replace("/src/pages/homepage/index.html")
    })
}

const verifyPermission =  () => {
    const user = JSON.parse(localStorage.getItem("user")) || ""
    
    if (user == "") {
        window.location.replace("/src/pages/homepage/index.html")
        
    }
 
    
    getOut()
    
}
verifyPermission()


const nameDepart = async() => {
    const data = await listSector()
    const select = document.querySelector(".box-option")
   
    data.forEach((element) => {
        const options = document.createElement("option")
        options.value = element.uuid
        options.innerText = element.name
        select.appendChild(options)
       
       
        
    });
    
    return select
}
const nameEmpre = async() => {
    const data = await listSector()
    const select = document.createElement("select")
    const optionEmpr = document.createElement("option")
    optionEmpr.innerText = "Selecionar empresa"
    select.classList.add("inputs")
  
   
    data.forEach((element) => {
        const options = document.createElement("option")
        options.value = element.uuid
        options.innerText = element.name
        select.append(optionEmpr,options)
       
       
        
    });
    
    return select
}
const nameNotHire = async () => {
    const data = await listEmployerNotHire()
    

    const select = document.createElement("select")
    const optionEmpr = document.createElement("option")
    optionEmpr.innerText = "Selecionar usuario"
    select.classList.add("inputs")
    
   
    data.forEach((element) => {
        const options = document.createElement("option")
        options.value = element.uuid
        options.innerText = element.username
        select.append(optionEmpr,options)
    })
       
       
       
     return select
}



const creatDepart = (body) => {
    const ul = document.getElementById("derpart-content")
    ul.innerHTML = ""
    body.forEach((element) => {
        const li = document.createElement("li")
        const h3 = document.createElement("h3")
        const p = document.createElement("p")
        const span = document.createElement("span")
        const divBtn = document.createElement("div")
        const buttonSee = document.createElement("button")
        const buttonEdit = document.createElement("button")
        const buttonDelete = document.createElement("button")

        li.classList.add("card-depart")
        divBtn.classList.add("box-btn")
        buttonSee.classList.add("see")
        buttonEdit.classList.add("edit")
        buttonDelete.classList.add("delete")
        h3.classList.add("text-2")

        buttonSee.addEventListener("click", async ()=> {
            localStorage.setItem("deparUser",JSON.stringify(element))
            const body = document.querySelector("body")
            const modal = await seeModal()
            body.appendChild(modal)
            modal.showModal()
        })
        
        buttonEdit.addEventListener("click", ()=> {
            localStorage.setItem("deparUser",JSON.stringify(element))
            const body = document.querySelector("body")
            const modal = editDescript()
            body.appendChild(modal)
            modal.showModal()
        })
        buttonDelete.addEventListener("click",()=>{
            localStorage.setItem("deparUserDel",JSON.stringify(element))
            const body = document.querySelector("body")
            const modal = modalDelDepart()
            body.appendChild(modal)
            modal.showModal()
        })

        h3.innerText = element.name
        p.innerText = element.description
        span.innerText = element.companies.name

        divBtn.append(buttonSee,buttonEdit,buttonDelete)
        li.append(h3,p,span,divBtn)
        ul.appendChild(li)
    })
    return ul
}
const render = async () => {
    const data = await nameDepart()
    const allData = await allDepart()

    data.addEventListener("change", async()=> {
        const ul = document.getElementById("derpart-content")
        ul.innerHTML = ""
       const dados = await departPerId(data.value)
       if(data.value == "Selecionar Empresa"){
            creatDepart(allData)
       }else{
        creatDepart(dados)
       }
    })
    creatDepart(allData)
}
render()

const creatUsers = async ()=> {
    const data = await allUsers()
    localStorage.setItem("hired",JSON.stringify(data))
    const ul = document.getElementById("users-content")
    ul.innerHTML = ""
   
  
    data.forEach((element) => {
        
        if(element.username != "ADMIN"){
        const li = document.createElement("li")
        const h3 = document.createElement("h3")
        const p = document.createElement("p")
        const span = document.createElement("span")
        const divBtn = document.createElement("div")
        const buttonEdit = document.createElement("button")
        const buttonDelete = document.createElement("button")

        li.classList.add("card-depart")
        divBtn.classList.add("box-btn")
        buttonEdit.classList.add("edit")
        buttonDelete.classList.add("delete")
        h3.classList.add("text-2")

        buttonEdit.addEventListener("click", ()=> {
            localStorage.setItem("idUser",JSON.stringify(element.uuid))
            const body = document.querySelector("body")
            const modal = modalAdmEdit()
            body.appendChild(modal)
            modal.showModal()
        })
        buttonDelete.addEventListener("click",()=> {
            localStorage.setItem("deleteUser",JSON.stringify(element))
            const body = document.querySelector("body")
            const modal = modalDelUser()
            body.appendChild(modal)
            modal.showModal()
        })

        h3.innerText = element.username
        p.innerText = element.professional_level
        span.innerText = "Company Name"

        divBtn.append(buttonEdit,buttonDelete)
        li.append(h3,p,span,divBtn)
        ul.appendChild(li)
        }
    })
}
await creatUsers()
const openModal = ()=> {
    const button = document.getElementById("create")

    button.addEventListener("click", async ()=> {
        const body = document.querySelector("body")
        const modal = await createDepartment()
        body.appendChild(modal)
        modal.showModal()
    })
}
openModal()

export {creatUsers,nameEmpre,render,nameNotHire}
