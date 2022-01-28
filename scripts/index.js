let btns = document.querySelectorAll("button")
let info = document.querySelector("#info")
let comDiv = document.querySelector("#commentDiv")
let submit = document.querySelector("#submit")
let input = document.querySelector("#comment")
let errorDiv = document.querySelector("#errDiv")

btns.forEach((btn, key) =>{
  if(key == 86){
    return
  }else{
    btn.id = `${key}`
  }
  btn.addEventListener("click", (ev)=>{
    let symbol = btn.ariaLabel
    info.ariaLabel = symbol
    info.textContent = `Dodajesz informacje do sektoru: ${symbol}`
  })
  btn.addEventListener("dblclick", (ev)=>{
    let symbol = info.ariaLabel
    if(btn.classList == "btn btn-success") updateState(info.ariaLabel, 0);
    else updateState(info.ariaLabel, 1)

  })
})



submit.addEventListener("click", ()=>{
  let val = input.value
  if(info.ariaLabel == ""){
    errorDiv.textContent = "Wybierz pierw sektor!"
    errorDiv.classList = "text-danger"
  }else{
  if(val == ""){
    errorDiv.textContent = "Pomyslnie usunieto komenatrz";
    errorDiv.classList = "text-success"
    document.querySelector(`button[aria-label="${info.ariaLabel}"]`).textContent = `${info.ariaLabel.slice(1, info.ariaLabel.length)}`
    comDiv.textContent = val
    updateComment(info.ariaLabel, val)
  }else{
    errorDiv.textContent = "Pomyslnie dodano komentarz"
    errorDiv.classList = "text-success"
    document.querySelector(`button[aria-label="${info.ariaLabel}"]`).textContent = `${info.ariaLabel.slice(1, info.ariaLabel.length)}!`
    comDiv.textContent = val
    updateComment(info.ariaLabel, val)
  }}
})

function updateState(aria, state){
  try{
    let symbol = aria.slice(0, 1);
    let number = aria.slice(1, aria.length);
    $.ajax({
      headers: { "Accept": "application/json"},
        type: "POST",
        url: `https://elektrykunlocked.xyz/sectors`,
        data: {"symbol": symbol, "number": number, "state": state},
        crossDomain: true,
        success: function(data, textStatus, request){
            console.log(data)
        }
    })
  }catch(e){
    console.log("Wyjebalo errora :C", e)
  }
}
function updateHandler(){
  $.ajax({
    headers: { "Accept": "application/json"},
      type: "GET",
      url: `https://elektrykunlocked.xyz/sectorsAll`,
      crossDomain: true,
      success: function(data, textStatus, request){
        data.forEach(el=>{
          let combine = `${el.symbol}${el.number}`
          if(el.comment == ""){
          document.querySelector(`[aria-label=${combine}]`).textContent = `${el.number}`
          }else{
            document.querySelector(`[aria-label=${combine}]`).textContent = `${el.number}!`
          }
        })
      }
  })
}
let updateHandlerInterval = setInterval(async () => {
  updateHandler()
}, 10000);
updateHandler()

function updateComment(button, data){
  let aria = button;
  try{
    let symbol = aria.slice(0, 1);
    let number = aria.slice(1, aria.length);
    $.ajax({
      headers: { "Accept": "application/json"},
        type: "POST",
        url: `https://elektrykunlocked.xyz/sectors`,
        data: {"symbol": symbol, "number": number, "commentData": data},
        crossDomain: true,
        success: function(data, textStatus, request){
            comDiv.textContent = data
        }
    })
  }catch(e){
    console.log("Wyjebalo errora :C", e)
  }
  
}
function selectComment(button){
    let aria = button.ariaLabel
    let symbol = aria.slice(0, 1);
    let number = aria.slice(1, aria.length);
    $.ajax({
      headers: { "Accept": "application/json"},
      type: "GET",
      url: `https://elektrykunlocked.xyz/sectors?symbol=${symbol}&number=${number}`,
      crossDomain: true,
      success: function(data, textStatus, request){
        comDiv.textContent = data.comment
        console.log(data.comment)
      }
    })
}