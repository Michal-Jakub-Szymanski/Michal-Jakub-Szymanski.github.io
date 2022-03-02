let [name, output] = [document.querySelector("#name"), document.querySelector("#price")]
let url = "https://elektrykunlocked.xyz/AmazonScrape";

//fetch(`https://cors-anywhere.herokuapp.com/${url}`).then(resp => resp.json()).then(data => console.log(data))
fetch(url).then(data => data.json()).then(data =>{
    name.textContent = data.name
    output.textContent = data.price
})