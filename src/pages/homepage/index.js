import { listSector } from "../../scripts/request.js"
const data = await listSector()

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

const creatCard = (products) => {

    const ul = document.querySelector(".card-container")
    ul.innerHTML = ""
    products.forEach(element => {
        const li = document.createElement("li")
        const div = document.createElement("div")
        const h2 = document.createElement("h2")
        const span = document.createElement("span")
        const p = document.createElement("p")
        
        li.classList.add("card")
        div.classList.add("box-sector")
        p.classList.add("btn-false")

        h2.innerText = element.name
        span.innerText = element.opening_hours
        p.innerText = element.sectors.description

        div.append(span,p)
        li.append(h2,div)
        ul.appendChild(li)
        return ul

    });
    
}

creatCard(data)


const creatOption = () => {
    const select = document.querySelector(".sele")
    const options = document.querySelectorAll(".opt")

    select.addEventListener("change", ()=> {
        const filter = data.filter((element) => {
            if(select.value == element.sectors.description){
                return element
            }else if (select.value == "Selecionar Setor"){
                return element
            }
            
        })
        creatCard(filter)
        
    })
   
}
creatOption()