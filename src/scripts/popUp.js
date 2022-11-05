const popUp = () =>{
    const body = document.querySelector("body")
   
    const divContainer = document.createElement("div")
    divContainer.classList.add("pop-container")

    const divImg = document.createElement("div")
    divImg.classList.add("pop-up")

    const img = document.createElement("img")
    img.src = "/src/img/Group 17.png"

    const h3 = document.createElement("h3")
    h3.classList.add("text-green")
    h3.innerText = "Cadastro criado com sucesso!"

    
    const p = document.createElement("p")
    p.classList.add("text-grey")
    p.innerText = "Seu cadastro foi criado com susseco... redericionando para a pagina de login!!"

    
    divImg.append(img,h3)
    divContainer.append(divImg,p)

    body.appendChild(divContainer)

}
const popUpErro = () =>{
    const body = document.querySelector("body")
   
    const divContainer = document.createElement("div")
    divContainer.classList.add("pop-container-erro")

    const divImg = document.createElement("div")
    divImg.classList.add("pop-up")


    const h3 = document.createElement("h3")
    h3.classList.add("text-green")
    h3.innerText = "Email ou senha esta errado!"

    
    const p = document.createElement("p")
    p.classList.add("text-grey")
    p.innerText = "Email ou senha incorretos!!"
    
    divImg.append(h3)
    divContainer.append(divImg,p)

    body.appendChild(divContainer)

}

export{popUp,popUpErro}