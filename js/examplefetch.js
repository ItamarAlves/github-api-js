/*
Maneira alternativa de trabalhar o código
*/
fetch("https://api.github.com/users/ItamarAlves")
    .then((response) => response.json())
    .then((json) => console.log(json));

async function mostrar() {
    let response = await fetch("https://api.github.com/users/ItamarAlves");
    let json = await response.json();

    console.log('mostrar: ' + json.id);
}

function buscar() {
    const valueInput = document.getElementById("login").value;
    fetch(`https://api.github.com/users/${valueInput}`)
        .then((response) => response.json())
        .then((json) => {
            fetch(json.avatar_url)
            .then((responseImg) => responseImg.blob())
            .then((blob) => URL.createObjectURL(blob))
            .then((url) => montar(json, url))
        
        });
}