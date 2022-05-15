options = {headers : {"Authorization" : "token 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"}}

async function buscarIndex() {
    await buscar(null);
}    
async function buscar(valueUser) {
    let value = null;
    let valueInput = document.getElementById("login").value;
    if (valueUser === null) {
        value = valueInput;
    } else {
        value = valueUser;
        document.getElementById("login").value = value;
    }

    const response = await fetch(`https://api.github.com/users/${value}`, options);
    const json = await response.json();
    const username = json.name;

    // ///inicio imagem
    // const responseImg = await fetch(json.avatar_url, headers);
    // const blob = await responseImg.blob();
    // const url = await URL.createObjectURL(blob);
    // ///fim imagem

    const responseFollowers = await fetch(json.followers_url, options);
    const jsonFollowers = await responseFollowers.json();
    
    const followers = {data: []}
    for (let i = 0; i < jsonFollowers.length; i++) {
        const user = jsonFollowers[i].login;

        const responseUser = await fetch(`https://api.github.com/users/${user}`, options);
        const jsonUser = await responseUser.json();
        followers.data.push({username: jsonUser.name, login: jsonUser.login, avatar_url: jsonUser.avatar_url})
    }

    montar(username, followers);
}

function montar(username, followers) {
    limparResultados();
    const p = document.createElement("p");
    const text = document.createTextNode(username);
    p.appendChild(text);

    const div = document.getElementById("resultados");
    div.appendChild(p);

    // const img = document.createElement("img");
    // img.classList.add("img")
    // img.src = url;
    // div.appendChild(img);

    const h1 = document.createElement("h1");
    h1.innerHTML = 'Seguidores'
    div.appendChild(h1)

    for (let i = 0; i < followers.data.length; i++) {
        let login = followers.data[i].login
        let user = followers.data[i].username || login;

        const a = document.createElement("a");
        a.innerHTML = user;
        // a.href = `https://api.github.com/users/${user}/followers`;
        a.onclick = function() {
            buscar(login);
        }

        const li = document.createElement("li");
        li.appendChild(a);
        div.appendChild(li)
    }
}

function limparResultados() {
    const div = document.getElementById("resultados");
    div.innerHTML  = '';
}