const onclicks = ["showFirst();","showPrev();","","showNext();","showLast();"]

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
  drawTreeCode('(((((3)(17))((2)(12)))(((15))((25)(0))))((((2)(5))((3)))(((2)(14)))))');
}

function drawEx2(){
  drawTreeCode('((((4)(5))((1))((2)(-3)))(((4)(0))((2)(-2))))');
}

function drawEx3(){
  drawTreeCode('(((((5)(6))((7)(4)(5)))(((3))))((6)(((7))))((((5)))(((9)(8))((6)))))');
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
  document.getElementById("drawing").addEventListener('mousedown', mouseClick, false);
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

function loadTreeCode(){
  var treeStr = prompt("Type a tree encoding:");

  if (treeStr == null) {
    return;
  }
  hideButtons();
  drawTreeCode(treeStr);
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
  return [tree,totalLeaves,max_y];
}

function resizeHeight(){
  var c = document.getElementById("drawing");
  c.height += 100;
  canvasHeight += 100;
}

function resetTree(){
  if(!isTree(root)){
    return;
  }
  drawTreeCode(toTreeCode(root));
}
