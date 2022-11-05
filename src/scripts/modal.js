import {dataUser,editProfileAdm,deleteUser,departCreate,editDepart,deleteDepart } from "./request.js"
import { creatUsers,nameEmpre,render } from "../pages/admpage/index.js"


const modalAdmEdit = () => {
    const modal = document.createElement("dialog")
    const divCard = document.createElement("div")
    const h2 = document.createElement("h2")
    const buttonClose = document.createElement("button")
    const form = document.createElement("div")
    const selectWork = document.createElement("select")
    const selectLevel = document.createElement("select")
    const buttonEdit = document.createElement("button")
    const optionHibridy = document.createElement("option")
    const optionHome = document.createElement("option")
    const optionOffice = document.createElement("option")
    const optionJunior = document.createElement("option")
    const optionPleno = document.createElement("option")
    const optionSenior = document.createElement("option")
    const optionSelectModel = document.createElement("option")
    const optionSelectLevel = document.createElement("option")
    const optionStation = document.createElement("option")



    divCard.classList.add("card-modal")
    buttonClose.classList.add("btn-close")
    form.classList.add("form-modal")
    selectWork.classList.add("inputs")
    selectLevel.classList.add("inputs")
    buttonEdit.classList.add("btn-register-2")

    h2.innerText = "Editar Usuário"
    buttonClose.innerText = "X"
    buttonEdit.innerText = "Editar"

    optionSelectModel.innerText = "Selecionar modalidade de trabalho "
    optionSelectLevel.innerText = "Selecionar nível profissional"
    optionHibridy.value = "hibrido"
    optionHome.value = "presencial"
    optionOffice.value = "home office"
    optionHibridy.innerText = "Hibrido"
    optionHome.innerText = "Presencial"
    optionOffice.innerText = "Home Office"
    optionStation.innerText = "Estagio"
    
    optionStation.value = "estágio"
    optionJunior.value = "júnior"
    optionPleno.value = "pleno"
    optionSenior.value = "sênior"
    optionJunior.innerText = "junior"
    optionPleno.innerText = "pleno"
    optionSenior.innerText = "senior"

    selectWork.append(optionSelectModel,optionHibridy,optionHome,optionOffice)
    selectLevel.append(optionSelectLevel,optionStation,optionJunior,optionPleno,optionSenior)
    form.append(selectWork,selectLevel)
    divCard.append(h2,buttonClose,form,buttonEdit)
    modal.appendChild(divCard)
    buttonClose.addEventListener("click", ()=> {
        localStorage.removeItem("idUser")
        modal.close()
    })
    const idLocal = JSON.parse(localStorage.getItem("idUser"))
    const body = {}
        selectWork.addEventListener("change", ()=> {
            body ["kind_of_work"] = selectWork.value
        })
        selectLevel.addEventListener("change", ()=> {
            body ["professional_level"] = selectLevel.value
        })
        
    buttonEdit.addEventListener("click", async ()=> {
        await editProfileAdm(body,idLocal)
        creatUsers()
        modal.close()
        localStorage.removeItem("idUser")
    })
    
    

    return modal

}

const modalDelUser = () => {
    const userDel = JSON.parse(localStorage.getItem("deleteUser"))
    const modal = document.createElement("dialog")
    const divCard = document.createElement("div")
    const h2 = document.createElement("h2")
    const buttonClose = document.createElement("button")
    const buttonDelete= document.createElement("button")

    divCard.classList.add("card-modal")
    buttonClose.classList.add("btn-close")
    buttonDelete.classList.add("btn-delete")
    h2.classList.add("center-del")

    h2.innerText = `Realmente deseja remover o usuário ${userDel.username}?`
    buttonClose.innerText = "X"
    buttonDelete.innerText = "Deletar"

    divCard.append(h2,buttonClose,buttonDelete)
    modal.appendChild(divCard)
   
    buttonDelete.addEventListener("click",async ()=> {
        await deleteUser(userDel.uuid)
        creatUsers()
        modal.close()
        localStorage.removeItem("deleteUser")
    })
    buttonClose.addEventListener("click", ()=> {
        modal.close()
        localStorage.removeItem("deleteUser")
    })

    return modal

}

const createDepartment = async ()=> {
    
    const modal = document.createElement("dialog")
    const divCard = document.createElement("div")
    const h2 = document.createElement("h2")
    const buttonClose = document.createElement("button")
    const form = document.createElement("div")
    const buttonDepart= document.createElement("button")
    const inputDepart = document.createElement("input")
    const inputDescript = document.createElement("input")

    const select = await nameEmpre()

    divCard.classList.add("card-modal")
    buttonClose.classList.add("btn-close")
    buttonDepart.classList.add("btn-register-2")
    h2.classList.add("center-del")
    form.classList.add("form-modal")
    inputDepart.classList.add("inputs")
    inputDescript.classList.add("inputs")

    h2.innerText = "Criar Departamento"
    buttonClose.innerText = "X"
    inputDepart.placeholder = "Nome do departamento"
    inputDepart.type = "text"
    inputDepart.name = "name"
    inputDescript.placeholder = "Descrição"
    inputDescript.type = "text"
    inputDescript.name = "description"
    buttonDepart.innerText = "Criar o departamento"
    

    form.append(inputDepart,inputDescript,select,buttonDepart)
    divCard.append(h2,buttonClose,form)
    modal.appendChild(divCard)
    const body = {}
    select.addEventListener("change", ()=> {
        body ["company_uuid"] = select.value
        
    })
    buttonDepart.addEventListener("click", async ()=> {
        body ["name"] = inputDepart.value
        body ["description"] = inputDescript.value

        await departCreate(body)
        render()
        modal.close()
    })
    buttonClose.addEventListener("click", ()=> {
        modal.close()
    })
    

    return modal

}

const editDescript = () => {
    const deparUser = JSON.parse(localStorage.getItem("deparUser"))
    const modal = document.createElement("dialog")
    const divCard = document.createElement("div")
    const h2 = document.createElement("h2")
    const buttonClose = document.createElement("button")
    const input = document.createElement("input")
    const buttonEdit = document.createElement("button")

    divCard.classList.add("card-modal")
    buttonClose.classList.add("btn-close")
    input.classList.add("textarea")
    buttonEdit.classList.add("btn-register-2")

    h2.innerText = "Editar Departamento"
    buttonClose.innerText = "X"
    input.type = "text"
    input.placeholder = deparUser.description
    buttonEdit.innerText = "Salvar alterações"

    divCard.append(h2,buttonClose,input,buttonEdit)
    modal.appendChild(divCard)

    buttonEdit.addEventListener("click", async ()=> {
        const body = {}
        body ["description"] = input.value
        await editDepart(body,deparUser.uuid)
        render()
        modal.close()
        localStorage.removeItem("deparUser")
    })

    buttonClose.addEventListener("click", ()=> {
        localStorage.removeItem("deparUser")
        modal.close()
        
    })



    return modal
}
const modalDelDepart = () => {
    const deparUser = JSON.parse(localStorage.getItem("deparUserDel"))
    console.log(deparUser)
    const modal = document.createElement("dialog")
    const divCard = document.createElement("div")
    const h2 = document.createElement("h2")
    const buttonClose = document.createElement("button")
    const buttonDelete= document.createElement("button")

    divCard.classList.add("card-modal")
    buttonClose.classList.add("btn-close")
    buttonDelete.classList.add("btn-delete")
    

    h2.innerText = `Realmente deseja deletar o ${deparUser.companies.name} e demitir seus funcionários? ?`
    buttonClose.innerText = "X"
    buttonDelete.innerText = "Confirmar"

    divCard.append(h2,buttonClose,buttonDelete)
    modal.appendChild(divCard)
   
    buttonDelete.addEventListener("click",async ()=> {
        await deleteDepart(deparUser.uuid)
        render()
        modal.close()
        localStorage.removeItem("deparUserDel")
    })
    buttonClose.addEventListener("click", ()=> {
        modal.close()
        localStorage.removeItem("deparUserDel")
    })

    return modal

}
export 
{
    modalAdmEdit,modalDelUser,
    createDepartment,editDescript,modalDelDepart
}
