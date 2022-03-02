let [name, output] = [document.querySelector("#name"), document.querySelector("#price")]
let url = "https://www.amazon.pl/Ultimate-Ears-przenośne-Bluetooth-bateriach/dp/B07G6MBCG3/ref=sr_1_2?__mk_pl_PL=ÅMÅŽÕÑ&crid=1W8OZJKTMGDJI&keywords=ultimate%2Bears%2Bboom%2B3&qid=1646081516&sprefix=ultimate%2Bears%2Bboom%2B3%2Caps%2C75&sr=8-2&th=1";

//fetch(`https://cors-anywhere.herokuapp.com/${url}`).then(resp => resp.json()).then(data => console.log(data))
fetch(url, {mode: "no-cors"}).then(resp => resp.json()).then(data => console.log(data))