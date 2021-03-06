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
    if(ev.srcElement.id == "86") return
    if(btn.classList == "btn btn-success"){
      btn.classList = "btn btn-danger"
      updateState(0, btn.ariaLabel)
    }else{
      btn.classList = "btn btn-success"
      updateState(1, btn.ariaLabel)
    }
  })
})

function updateState(state, aria){
  let symbol = aria.slice(0, 1);
  let number = aria.slice(1, aria.length); 
  $.ajax({
    headers: { "Accept": "application/json"},
      type: "POST",
      url: `https://elektrykunlocked.xyz/sectorState`,
      data: {"symbol": symbol, "number": number, "state": state},
      crossDomain: true,
      success: function(data, textStatus, request){
          console.log(request)
      }
  })
}

submit.addEventListener("click", ()=>{
  let val = input.value
  if(info.ariaLabel == ""){
    errorDiv.textContent = "Wybierz pierw sektor!"
    errorDiv.classList = "text-danger"
  }else{
  if(val == ""){
    errorDiv.textContent = "Pomyslnie usunieto komenatrz";
    errorDiv.classList = "text-success"
    document.querySelector(`button[aria-label="${info.ariaLabel}"]`).style.color = `white`
    comDiv.textContent = val
    updateComment(info.ariaLabel, val)
  }else{
    errorDiv.textContent = "Pomyslnie dodano komentarz"
    errorDiv.classList = "text-success"
    document.querySelector(`button[aria-label="${info.ariaLabel}"]`).style.color = `#32F745`
    comDiv.textContent = val
    console.log(input.value)
    input.value = ""
    updateComment(info.ariaLabel, val)
  }}
})


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
          document.querySelector(`[aria-label=${combine}]`).style.color = `white`
          }else{
            document.querySelector(`[aria-label=${combine}]`).style.color = `#32F745`
          }
          if(el.state == 1){
            document.querySelector(`[aria-label=${combine}]`).classList = `btn btn-success`
          }else{
            document.querySelector(`[aria-label=${combine}]`).classList = `btn btn-danger`
          }
        })
      }
  })
}
let updateHandlerInterval = setInterval(() => {
  updateHandler()
}, 5000);
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