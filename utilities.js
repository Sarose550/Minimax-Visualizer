const onclicks = ["disableButton(0,1);enableButton(3,4);","","","","disableButton(3,4);enableButton(0,1);"]

function hideButtons() {
  for(let i = 0; i < 5; i++){
    //console.log("button"+i);
    document.getElementById("button" + i).style.display = "none";
  }
}
function showButtons() {
  for(let i = 0; i < 5; i++){
    //console.log("button"+i);
    document.getElementById("button" + i).style.display = "block";
  }
}

function disableButton(){
  for(let i = 0; i < arguments.length; i++){
    $("#button"+arguments[i]).attr("disabled", true);
    $("#button"+arguments[i]).removeAttr("onclick");
  }
}

function enableButton(){
  for(let i = 0; i < arguments.length; i++){
    $("#button"+arguments[i]).removeAttr("disabled");
    $("#button"+arguments[i]).attr("onclick",onclicks[arguments[i]]);
  }
}
