import { login } from "../../scripts/request.js"
const menuMobilie = () => {
    const openMenu = document.querySelector(".open-close")
    const boxBtn = document.querySelector(".box-btn")
    openMenu.addEventListener("click", ()=> {
        boxBtn.classList.toggle("show-btn")

        if(boxBtn.classList.contains("show-btn")){
            openMenu.src = "/src/img/VectorX.png"
        }else{
            openMenu.src = "/src/img/Vector.png"
        }
        
    })
    
}
menuMobilie()

const loggin = () => {

    const form = document.getElementById("login")
    const elements =[...form.elements]

    form.addEventListener("submit",async (event)=> {
        event.preventDefault()

        const body = {}

        elements.forEach((element) => {
            body [element.name] = element.value
        })
        await login(body)
    })
}
loggin()
