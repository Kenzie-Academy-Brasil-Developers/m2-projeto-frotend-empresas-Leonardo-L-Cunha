import {editProfileAdm,deleteUser,departCreate,editDepart,deleteDepart,hiredEmployer,firedEmployer } from "./request.js"
import { creatUsers,nameEmpre,nameNotHire,render} from "../pages/admpage/index.js"



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

const seeModal = async () => {
    const dataDepart = await JSON.parse(localStorage.getItem("deparUser"))
    const hire = await JSON.parse(localStorage.getItem("hired"))

    const modal = document.createElement("dialog")
    const divContainer = document.createElement("div")
    const h2 = document.createElement("h2")
    const buttonClose = document.createElement("button")
    const divHead = document.createElement("div")
    const divText = document.createElement("div")
    const divSelect = document.createElement("div")
    const h3 = document.createElement("h3")
    const pName = document.createElement("p")
    const buttonHire = document.createElement("button")
    const select = await nameNotHire()
    const ul = document.createElement("ul")
    ul.classList.add("card-overflow")
    
    
    
    modal.classList.add("modal")
    buttonClose.classList.add("btn-close")
    divContainer.classList.add("see-container")
    divHead.classList.add("see-box-head")
    divText.classList.add("see-text")
    divSelect.classList.add("see-select")
    buttonHire.classList.add("btn-hire")

    h2.innerText = dataDepart.name
    h3.innerText = dataDepart.description
    pName.innerText = dataDepart.companies.name
    buttonHire.innerText = "Contratar"
    buttonClose.innerText = "X" 
    
   const dados = hire.filter((element) => {
        if(dataDepart.uuid == element.department_uuid){
            return element
        }
   })
   dados.forEach(element => {
    const li = document.createElement("li")
    const h3 = document.createElement("h3")
    const pLevel = document.createElement("p")
    const span = document.createElement("span")
    const button = document.createElement("button")
    

    li.classList.add("card-see-modal")
    button.classList.add("btn-off")
    button.id = element.uuid

    h3.innerText = element.username
    pLevel.innerText = element.professional_level
    span.innerText = dataDepart.companies.name
    button.innerText = "Desligar"

    li.append(h3,pLevel,span,button)
    ul.appendChild(li)

    button.addEventListener("click", async () => {
        await firedEmployer(button.id)
        window.location.reload("/src/pages/admpage/index.html")
        
    })
   });

    buttonHire.addEventListener("click", async()=> {
        const body = {}
        body ["user_uuid"] = select.value
        body ["department_uuid"] = dataDepart.uuid
        await hiredEmployer(body)
        window.location.reload("/src/pages/admpage/index.html")
    })
    buttonClose.addEventListener("click", ()=> {
        modal.close()
       


    })

    divText.append(h3,pName)
    divSelect.append(select,buttonHire)
    divHead.append(divText,divSelect)
    divContainer.append(h2,buttonClose,divHead,ul)
    modal.appendChild(divContainer)

    return modal



}
seeModal()
/*
<dialog class="modal">
        <div class="see-container">
            <h2>Nome do departamento</h2>
            <div class="see-box-head">
                <div class="see-text">
                    <h3>Descrição do departamento</h3>
                    <p>Empresa pertencente</p>
                </div>
                <div class="see-selec">
                    <select>
                        <option value="">Selecionar usuario</option>
                    </select>
                    <button>Contratar</button>
                </div>
            </div>
            <ul class="card-overflow">
                <li class="card-modal">
                    <h3></h3>
                    <p></p>
                    <span></span>
                    <button>Desligar</button>
                </li>
            </ul>
        </div>
    </dialog>
*/
export 
{
    modalAdmEdit,modalDelUser,createDepartment,
    editDescript,modalDelDepart,seeModal
}
