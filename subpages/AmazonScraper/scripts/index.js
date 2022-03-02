let [name, output] = [document.querySelector("#name"), document.querySelector("#price")]
let url = "https://elektrykunlocked.xyz/AmazonScrape";

fetch(url).then(data => data.json()).then(data =>{
    name.textContent = data.name
    output.textContent = data.price
})
let loop = setInterval(() => {
    fetch(url).then(data => data.json()).then(data =>{
        name.textContent = data.name
        output.textContent = data.price
    })
}, 1000*60*60);
