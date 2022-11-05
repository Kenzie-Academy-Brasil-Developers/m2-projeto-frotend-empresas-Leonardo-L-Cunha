import { register } from "../../scripts/request.js"
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

const createUser = ()=> {
    const form = document.getElementById("register")
    const elements = [...form.elements]
    
    
    form.addEventListener("submit", async (event)=> {
        event.preventDefault()

        const body = {}
        elements.forEach((element) => {
            if(element.tagName == "INPUT"){
                body [element.id] = element.value
            }
            if(element.tagName == "SELECT"){
                body [element.id] = element.value
            }
        })
        await register(body)
        
        
    })
}
createUser()