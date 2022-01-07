const onclicks = ["showFirst();","showPrev();","","showNext();","showLast();"]

function highlightCell(i,j){
  for(var x = 0; x < 2; x++){
    for(var y = 0; y < 3; y++){
      var clearedCell = document.getElementById(x + "," + y);
      clearedCell.style.backgroundColor = "";
      clearedCell.style.border = "";
    }
  }
  var cell = document.getElementById(i + "," + j);
  cell.style.backgroundColor = "yellow";
  cell.style.border = "solid 3px red";
}

function unhighlightCells(){
  for(var x = 0; x < 2; x++){
    for(var y = 0; y < 3; y++){
      var clearedCell = document.getElementById(x + "," + y);
      clearedCell.style.backgroundColor = "";
      clearedCell.style.border = "";
    }
  }
}

function hideButtons() {
  for(let i = 0; i < 5; i++){
    //console.log("button"+i);
    document.getElementById("button" + i).style.display = "none";
  }
  document.getElementById("speed").style.display = "none";
  document.getElementById("speedLabel").style.display = "none";
  $(nodeOptions).hide();
}

function showButtons() {
  for(let i = 0; i < 5; i++){
    //console.log("button"+i);
    document.getElementById("button" + i).style.display = "block";
  }
  document.getElementById("speed").style.display = "block";
  document.getElementById("speedLabel").style.display = "block";
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

function enableNavbar(){
  $("#navbarDropdown1").show();
  $("#navbarDropdown2").show();
  $("#navbarDropdown3").show();
  $("#navbarDropdown4").show();
}

function disableNavbar(){
  $("#navbarDropdown1").hide();
  $("#navbarDropdown2").hide();
  $("#navbarDropdown3").hide();
  $("#navbarDropdown4").hide();
}

function miniEx(canvasID){
  var minikey = new Node();
  minikey["type"] = MINNIE;
  minikey["x"] = 40;
  minikey["y"] = 13;
  minikey.draw(canvasID);
}

function maxiEx(canvasID){
  var maxikey = new Node();
  maxikey["type"] = MAXIE;
  maxikey["x"] = 40;
  maxikey["y"] = 22;
  maxikey.draw(canvasID);
}

function leafEx(canvasID){
  var leafkey = new Node();
  leafkey["type"] = LEAF;
  leafkey["x"] = 40;
  leafkey["y"] = 17;
  leafkey.draw(canvasID);
}

function initKey(){
  miniEx("key-minnie");
  maxiEx("key-maxie");
  leafEx("key-leaf");
}

function drawEx1(){
  isEditing = true;
  drawTreeCode('(((((3)(17))((2)(12)))(((15))((25)(0))))((((2)(5))((3)))(((2)(14)))))');
  $(nodeOptions).hide();
}

function drawEx2(){
  isEditing = true;
  drawTreeCode('((((4)(5))((1))((2)(-3)))(((4)(0))((2)(-2))))');
  $(nodeOptions).hide();
}

function drawEx3(){
  isEditing = true;
  drawTreeCode('(((((5)(6))((7)(4)(5)))(((3))))((6)(((7))))((((5)))(((9)(8))((6)))))');
  $(nodeOptions).hide();
}

function initRoot(){
  root = new Node();
  root.type = LEAF;
  root.x = canvasWidth/2;
  root.y = levelSpace/4;
  numLeaves = 0;
  document.getElementById("drawing").width = canvasWidth;
  document.getElementById("drawing").height = canvasHeight;
  root.draw("drawing");
  numLeaves++;
  isEditing = true;
  document.getElementById("drawing").addEventListener('mousedown', (e) => {if(isEditing){mouseClick(e);};}, false);
  document.addEventListener('keydown', function(e) {
    if(paused){
      if (e.defaultPrevented) {
        return;
     }
      switch (e.keyCode) {
          case 32:
            if(!isEditing || !paused){
              playBtnClick();
            }
            break;
          case 37:
            showPrev();
            break;
          case 39:
            showNext();
            break;
      }
      e.preventDefault();
    }
}, true);
}

function copyTree(){
  if(!isTree(root)){
    alert("Must assign values to all leaf nodes first.");
    return;
  }
  treeStr = toTreeCode(root);
  navigator.clipboard.writeText(treeStr);
  alert("Tree copied to clipboard.");
}

function copyExplicitTree(){
  if(!isGameTree(root)){
    alert("Must assign values to all leaf nodes first. Additionally, we require that all values are integers.");
    return;
  }
  treeStr = toExplicitTree(root);
  navigator.clipboard.writeText(treeStr);
  alert("Explicit game tree copied to clipboard.");
}

function isTree(node){
  if(node.type == LEAF){
    return node.val != null;
  }
  for(var i = 0; i < node.children.length; i++){
    if(!isTree(node.children[i])){
      return false;
    }
  }
  return true;
}

function isGameTree(node){
  if(node.type == LEAF){
    return node.val != null && Number.isInteger(node.val);
  }
  for(var i = 0; i < node.children.length; i++){
    if(!isGameTree(node.children[i])){
      return false;
    }
  }
  return true;
}

function toTreeCode(node){
  if(node.type == LEAF){
    return "(" + node.val + ")";
  }
  var treeStr = "("
  for(var i = 0; i < node.children.length; i++){
    treeStr += toTreeCode(node.children[i]);
  }
  treeStr += ")";
  return treeStr
}

function smlInt(x){
  if(x >= 0){
    return "" + x;
  }
  return "~" + (-x);
}

function parseSMLInt(x){
  if(x.at(0) == "~"){
    return -parseFloat(x.slice(1));
  }
  return parseFloat(x);
}

function isSMLNumber(str){
  if(str == ""){
    return false;
  }
  if(str.at(0) == "~"){
    if(str.length == 1){
      return false;
    }
    if(str.at(1) == "-"){
      return false;
    }
    return !isNaN(Number.parseInt(str.slice(1)));
  }
  if(str.at(0) == "-"){

    return false;
  }
  return !isNaN(Number.parseInt(str));
}

function toExplicitTree(node,str="a"){
  if(node.type == LEAF){
    return 'Esti("' + str + '",' + smlInt(node.val) + ')';
  }
  var treeStr = 'Node("' + str + '",[';
  for(var i = 0; i < node.children.length; i++){
    if(i != 0){
      treeStr += ",";
    }
    treeStr += toExplicitTree(node.children[i], str + ">" + i);
  }
  treeStr += "])";
  return treeStr;
}

function loadTreeCode(){
  var treeStr = prompt("Type a tree encoding:");

  if (treeStr == null) {
    return;
  }
  isEditing = true;
  hideButtons();
  $(nodeOptions).hide();
  drawTreeCode(treeStr);
}

function loadExplicitTree(){
  var treeStr = prompt("Type a tree encoding:");

  if (treeStr == null) {
    return;
  }
  isEditing = true;
  hideButtons();
  $(nodeOptions).hide();
  try{
    drawExplicitTreeCode(treeStr);
  }
  catch(e){
    alert("Not a valid explicit game tree.");
    return;
  }
}

function drawTreeCode(treeStr){
  var treeFeedback = loadTreeCodeHelper(treeStr,0);
  var tree = treeFeedback[0];
  var newNumLeaves = treeFeedback[1];
  var max_y = treeFeedback[2];
  if(tree != null){
    root.children = new Array();
    root = tree;
    numLeaves = newNumLeaves;
    if(max_y > canvasHeight){
      canvasHeight = max_y + levelSpace;
      var c = document.getElementById("drawing");
      c.height = canvasHeight;
    }
    positionNodes(root,numLeaves);
    drawAll("drawing");
  }
  else{
    alert("Not a valid tree.");
  }
}

function removeUnquotedWhiteSpace(str){
  var strArray = str.split("");
  var s = removeUnquotedWhiteSpace1(strArray);
  if(s == null){
    return null;
  }
  return s.join("");
}

function removeUnquotedWhiteSpace1(strArray,idx=0,quoteMode=0){
  //0 indicates that it's not inside quotes
  //1 indicates that it's inside single quotes
  //2 indicates that it's inside double quotes
  //if the quotes aren't matched up, this returns null.
  switch(quoteMode){
    case 0:
      if(idx == strArray.length){
        return strArray;
      }
      if(strArray[idx] == "'"){
        return removeUnquotedWhiteSpace1(strArray,idx+1,1);
      }
      if(strArray[idx] == '"'){
        return removeUnquotedWhiteSpace1(strArray,idx+1,2);
      }
      if(/\s/.test(strArray[idx])){
        strArray[idx] = "";
      }
      return removeUnquotedWhiteSpace1(strArray,idx+1,0);
      break;

    case 1:
      if(idx == strArray.length){
        return null;
      }
      if(strArray[idx] == "'"){
        return removeUnquotedWhiteSpace1(strArray,idx+1,0);
      }
      return removeUnquotedWhiteSpace1(strArray,idx+1,1);
      break;

    case 2:
      if(idx == strArray.length){
        return null;
      }
      if(strArray[idx] == '"'){
        return removeUnquotedWhiteSpace1(strArray,idx+1,0);
      }
      return removeUnquotedWhiteSpace1(strArray,idx+1,2);
      break;
  }
}

function parseArgs(args){
  if(args.length < 2){
    return null;
  }
  var c = args.at(0);
  if(c != "'" && c != '"'){
    return null;
  }
  var i = 1;
  var closedQuotes = false;
  while(i < args.length && !closedQuotes){
    if(args.at(i) == c){
      closedQuotes = true;
    }
    i++;
  }
  //console.log("Found the quoted part:");
  //console.log(args.slice(0,i));
  if(!closedQuotes || i == args.length){
    return null;
  }
  if(args.at(i) != ","){
    return null;
  }
  return args.slice(i+1);
}

function drawExplicitTreeCode(treeStr){
  var treeFeedback = loadExplicitTreeCodeHelper(removeUnquotedWhiteSpace(treeStr),0);
  var tree = treeFeedback[0];
  var newNumLeaves = treeFeedback[1];
  var max_y = treeFeedback[2];
  if(tree != null){
    root.children = new Array();
    root = tree;
    numLeaves = newNumLeaves;
    if(max_y > canvasHeight){
      canvasHeight = max_y + levelSpace;
      var c = document.getElementById("drawing");
      c.height = canvasHeight;
    }
    positionNodes(root,numLeaves);
    drawAll("drawing");
  }
  else{
    alert("Not a valid explicit game tree.");
  }
}

function loadExplicitTreeCodeHelper(treeStr,level){
  var firstToken = treeStr.slice(0,5);
  if(treeStr == null || !(firstToken == "Esti(" || firstToken == "Node(") || treeStr.at(-1) != ")"){
    //console.log("unmatched quote or string doesn't start with a constructor");
    return [null,null,null];
  }
  //This catches unmatched quotes, or string doesn't start with one of the tokens
  var args = treeStr.slice(5,-1);
  //console.log("args:");
  //console.log(args);
  var parsedArgs = parseArgs(args);
  //console.log("parsedArgs:");
  //console.log(parsedArgs);
  if(parsedArgs == null){
    //console.log("invalid arguments to constructor");
    return [null, null, null];
  }
  var tree = new Node();
  tree.y = levelSpace/4 + levelSpace * level;
  if(firstToken == "Esti("){
    if(isSMLNumber(parsedArgs)){
      tree.type = LEAF;
      tree.val = parseSMLInt(parsedArgs);
      return [tree,1,tree.y];
    }
    else{
      //console.log("second argument of esti constructor was not an integer");
      return [null,null,null];
    }
  }
  else{
    tree.type = 1-(level%2);
    tree.val = null;
  }
  //since we're not an esti node, check that parsedArgs is a list
  if(parsedArgs.length == 0 || !(parsedArgs.at(0) == "[" && parsedArgs.at(-1) == "]")){
    //console.log("second argument of node constructor was not a list");
    return [null,null,null];
  }
  var strBody = parsedArgs.slice(1,-1);
  var subTrees = new Array();
  var parenDepth = 0;
  var start = 0;
  var end = 0;
  for(var i = 0; i < strBody.length; i++){
    if(i != 0 && parenDepth == 0 && strBody.charAt(i) != "," && strBody.charAt(i-1) == ")"){
      //console.log("expected a , to separate list entries but didn't find one");
      return [null,null,null];
    }
    end++;
    if(strBody.charAt(i) == "("){
      parenDepth++;
    }
    else if(strBody.charAt(i) == ")"){
      parenDepth--;
      if(parenDepth == 0){
        subTrees.push(strBody.slice(start,end));
        start = end;
      }
    }
    else if(parenDepth == 0 && strBody.charAt(i) == ","){
      start++;
    }
    if(parenDepth < 0){
      //console.log("unmatched parentheses on the left");
      return [null,null,null];
    }
  }
  if(parenDepth > 0 || subTrees.length == 0){
    //console.log("unmatched parentheses on the right, or nonleaf had no children");
    return [null,null,null];
  }
  var totalLeaves = 0;
  var max_y = tree.y;
  //console.log("subtrees:");
  for(var i = 0; i < subTrees.length; i++){
    var candidateFeedback = loadExplicitTreeCodeHelper(subTrees[i],level+1);
    var candidate = candidateFeedback[0];
    if(candidate == null){
      return [null,null,null];
    }
    tree.children.push(candidate);
    candidate.parent = tree;
    totalLeaves += candidateFeedback[1];
    max_y = Math.max(max_y,candidateFeedback[2]);
  }
  for(var i = 0; i < tree.children.length; i++){
    tree.alphabetas.push(null);
  }
  return [tree,totalLeaves,max_y];
}

function loadTreeCodeHelper(treeStr,level){
  //if treeStr encodes a valid tree, it returns an array:
  // [root node of tree with the same x and y coordinates, # of leaves, # of times resizing]
  //if not, it returns [null,null,null].

  //first, check if it's a leaf encoding
  if(treeStr.length < 3 || treeStr.at(0) != "(" || treeStr.at(-1) != ")"){
    return [null,null,null];
  }

  var tree = new Node();
  tree.y = levelSpace/4 + levelSpace * level;
  var strBody = treeStr.slice(1,-1);
  if(isNumber(strBody)){
    tree.type = LEAF;
    tree.val = parseFloat(strBody);
    return [tree,1,tree.y];
  }
  else{
    tree.type = 1-(level%2);
    tree.val = null;
  }
  var subTrees = new Array();
  var parenDepth = 0;
  var start = 0;
  var end = 0;
  for(var i = 0; i < strBody.length; i++){
    end++;
    if(strBody.charAt(i) == "("){
      parenDepth++;
    }
    else if(strBody.charAt(i) == ")"){
      parenDepth--;
      if(parenDepth == 0){
        subTrees.push(strBody.slice(start,end));
        start = end;
      }
    }
    if(parenDepth < 0){
      return [null,null,null];
    }
  }
  if(parenDepth > 0 || subTrees.length == 0){
    return [null,null,null];
  }
  var totalLeaves = 0;
  var max_y = tree.y;
  for(var i = 0; i < subTrees.length; i++){
    var candidateFeedback = loadTreeCodeHelper(subTrees[i],level+1);
    var candidate = candidateFeedback[0];
    if(candidate == null){
      return [null,null,null];
    }
    tree.children.push(candidate);
    candidate.parent = tree;
    totalLeaves += candidateFeedback[1];
    max_y = Math.max(max_y,candidateFeedback[2]);
  }
  for(var i = 0; i < tree.children.length; i++){
    tree.alphabetas.push(null);
  }
  return [tree,totalLeaves,max_y];
}

function resizeHeight(){
  var c = document.getElementById("drawing");
  c.height += levelSpace;
  canvasHeight += levelSpace;
}

function resetTree(){
  isEditing = true;
  if(!isTree(root)){
    return;
  }
  drawTreeCode(toTreeCode(root));
  $(nodeOptions).hide();
}
