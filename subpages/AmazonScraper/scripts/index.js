let [name, output] = [document.querySelector("#name"), document.querySelector("#price")]

$.get("https://www.amazon.pl/Ultimate-Ears-przenośne-Bluetooth-bateriach/dp/B07G6MBCG3/ref=sr_1_2?__mk_pl_PL=ÅMÅŽÕÑ&crid=1W8OZJKTMGDJI&keywords=ultimate%2Bears%2Bboom%2B3&qid=1646081516&sprefix=ultimate%2Bears%2Bboom%2B3%2Caps%2C75&sr=8-2&th=1", (data)=>{
    console.log(data)
})