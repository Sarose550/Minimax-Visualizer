//the three types of nodes
const MINNIE = 0;
const MAXIE = 1;
const LEAF = 2;

const UNSEARCHED = 0;
const BOLD = 1;
const SEARCHING = 2;
const SEARCHED = 3;
//for pruned nodes:
const PRUNED = 4;
const DISCARDED = 5;

const levelSpace = 100;
const canvasWidth = 1260;
const nodeCircRadius = 20;
const leafHeight = 30;
const leafRatio = 1.5;
var canvasHeight = 675;

var numLeaves = 0;
var root;
var isEditing = true;

function Node(){
  this.val = null;
  this.parent = null;
  this.x;
  this.y;
  this.alpha = null;
  this.beta = null;
  this.alphabetas = [];
  this.type;
  this.status = UNSEARCHED;
  this.children = new Array();
  this.draw = drawNode;
  this.assign = writeValue;
  this.sprout = addChild;
  this.die = killSelf;
}

function drawInterval(start,end,alphabeta,context){
  if(alphabeta == null){
    //not an alpha-beta node, or the edge has been discarded, or it hasn't been searched yet
    return;
  }
  var theta;
  //now, we do casework to find the angle
  var dx = start.x - end.x;
  var dy = start.y - end.y;//ig this should always be levelSpace but nice for generality
  if(dx == 0){
    theta = -Math.PI/2;
  }
  else{
    theta = Math.atan(dy / dx);
  }
  var y = -9;
  var intervalStr = "(" + alphabetaToString(alphabeta[0]) + ", " + alphabetaToString(alphabeta[1]) + ")";
  var newx = (start.x + end.x)/2;
  var newy = (start.y + end.y)/2;
  context.save();
  context.translate(newx,newy);
  context.rotate(theta);
  context.textAlign = "center";
  if(end.status == BOLD && end.val != null){
    context.font = "bold 20px 'Courier New'";
    context.fillStyle = "blue";
    y = -11;
  }
  else{
    context.font = "bold 16px 'Courier New'";
    context.fillStyle = "black";
  }
  context.fillText(intervalStr,0,y);
  context.restore();
}

function pruneEdge(start,end,context){
  var theta;
  var dx = start.x - end.x;
  var dy = start.y - end.y;
  if(dx == 0){
    theta = -Math.PI/2;
  }
  else{
    theta = Math.atan(dy / dx);
  }
  var newx = (start.x + end.x)/2;
  var newy = (start.y + end.y)/2;
  context.save();
  context.translate(newx,newy);
  context.rotate(theta);
  context.strokeStyle = "white";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(-5,0);
  context.lineTo(5,0);
  context.closePath();
  context.stroke();
  context.strokeStyle = "grey";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(-5,-5);
  context.lineTo(-5,5);
  context.closePath();
  context.stroke();
  context.beginPath();
  context.moveTo(5,-5);
  context.lineTo(5,5);
  context.closePath();
  context.stroke();
  context.restore();
}

function alphabetaToString(endpt){
  if(endpt == Number.NEGATIVE_INFINITY){
    return "-∞";
  }
  if(endpt == Number.POSITIVE_INFINITY){
    return "∞";
  }
  return ""+endpt;
}


function killSelf(i){
  numLeaves -= countLeaves(this);
  this.parent.children.splice(i,1);
  this.parent.alphabetas.splice(i,1);
  if(this.parent.children.length == 0){
    this.parent.type = LEAF;
    numLeaves++;
  }
  this.parent = null;
  positionNodes(root,numLeaves);
  drawAll("drawing");
}

function countLeaves(node){
  sum = 0;
  if(node.type == LEAF){
    //console.log("found leaf");
    sum++;
  }
  for(var idx = 0; idx < node.children.length; idx++){
    sum += countLeaves(node.children[idx]);
  }
  return sum;
}

function cloneTree(rootNode){
  var newTree = new Node();
  var attributes = Object.keys(rootNode);
  for(var i = 0; i < attributes.length; i++){
    var attr = attributes[i];
    if(attr != "children" && attr != "parent" && attr != "alphabetas"){
      newTree[attr] = rootNode[attr];
    }
  }
  for(var i = 0; i < rootNode.children.length; i++){
    var newChild = cloneTree(rootNode.children[i]);
    newChild.parent = newTree;
    newTree.children.push(newChild);
  }
  for(var i = 0; i < rootNode.alphabetas.length; i++){
    newTree.alphabetas.push(rootNode.alphabetas[i]);
  }
  return newTree;
}

function positionNodes(rootNode, numLeaves){
  var currentSlot = new Array();
  currentSlot.push(1);
  positionNodesHelper(rootNode,numLeaves,currentSlot);
}

function positionNodesHelper(rootNode,numLeaves,currentSlot){
  if(rootNode.type == LEAF){
    rootNode.x = currentSlot[0] / (numLeaves + 1) * canvasWidth;
    currentSlot[0]++;
    return;
  }
  else{
    for(var i = 0; i < rootNode.children.length; i++){
      positionNodesHelper(rootNode.children[i],numLeaves,currentSlot);
    }
    if(rootNode.type != LEAF){
      rootNode.x = (rootNode.children[0].x + rootNode.children[rootNode.children.length-1].x)/2;
    }
  }

}

function drawAll(canvasID){
  var c = document.getElementById(canvasID);
  var ctx = c.getContext("2d");
  ctx.beginPath();

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.closePath();
  //draw edges and then nodes
  drawEdges(root,canvasID);
  drawAllNodes(root,canvasID);
}

function drawEdges(rootNode,canvasID){
  var c = document.getElementById(canvasID);
  var ctx = c.getContext("2d");
  for(var i = 0; i < rootNode.children.length; i++){
    var curNode = rootNode.children[i];
    drawEdge(rootNode,curNode,i,ctx);
    drawEdges(curNode,canvasID);
  }
}

function drawEdge(start,end,idx,context){
  if(end.status == SEARCHED || end.status == PRUNED){
    context.strokeStyle = "blue";
  }
  else if((end.status == SEARCHING || end.status == BOLD) && start.status == SEARCHING){
    context.strokeStyle = "red";
  }
  else if(end.status == DISCARDED){
    context.strokeStyle = "grey";
  }
  else{
    context.strokeStyle = "black";
  }
  context.beginPath();
  context.moveTo(start.x,start.y);
  context.lineTo(end.x,end.y);
  context.closePath();
  context.lineWidth = 1;
  context.stroke();
  drawInterval(start,end,start.alphabetas[idx],context);
  if((start.status == PRUNED || start.status == BOLD || start.status == SEARCHED) && end.status == DISCARDED){
    pruneEdge(start,end,context);
  }
}

function drawAllNodes(rootNode,canvasID){
  var c = document.getElementById(canvasID);
  var ctx = c.getContext("2d");
  rootNode.draw(canvasID);
  for(var i = 0; i < rootNode.children.length; i++){
    var curNode = rootNode.children[i];
    drawAllNodes(curNode,canvasID);
  }
}


function addChild(){
  newChild = new Node();
  newChild.type = LEAF;
  newChild.y = this.y + levelSpace;
  if(newChild.y > canvasHeight-leafHeight/2){
    resizeHeight();
  }
  newChild.parent = this;
  if(this.type == LEAF){
      if(this.parent == null){
        this.type = MAXIE;
      }
      else{
        this.type = 1-this.parent.type;
      }
      this.val = null;
  }
  else{
    numLeaves++;
  }
  this.children.push(newChild);
  this.alphabetas.push(null);
  positionNodes(root,numLeaves);
  drawAll("drawing");
}

function writeValue(canvasID){
  var value = prompt("Type a value:");

  if (value == null) {
    return;
  }
	else if (!isNumber(value)) {
		alert("Input must be an integer or a decimal.");
		return;
	}
	this.val = parseFloat(value);
  this.draw(canvasID);
}

function drawNode(canvasID,outlineColor="black"){
  var c = document.getElementById(canvasID);
  var ctx = c.getContext("2d");
  switch (this.status) {
    case BOLD:
      ctx.lineWidth = 5;
      ctx.strokeStyle = "red";
      break;
    case SEARCHING:
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      break;
    case SEARCHED:
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";
      break;
    case PRUNED:
      ctx.lineWidth = 2;
      ctx.strokeStyle = "blue";
      break;
    default:
      ctx.lineWidth = 1;
      ctx.strokeStyle = outlineColor;
  }
  switch (this.type){
    case MAXIE:
      var r = nodeCircRadius;
      if(this.status == DISCARDED){
        ctx.fillStyle = "#c1f1c3";
      }
      else{
        ctx.fillStyle = "#23E965";
      }
      ctx.beginPath();
      ctx.moveTo(this.x-leafRatio*Math.sqrt(3)*r/2, this.y+r/2);
      ctx.lineTo(this.x+leafRatio*Math.sqrt(3)*r/2, this.y+r/2);
      ctx.lineTo(this.x, this.y-r);
      ctx.lineTo(this.x-leafRatio*Math.sqrt(3)*r/2, this.y+r/2);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      break;
    case MINNIE:
      var r = nodeCircRadius;
      if(this.status == DISCARDED){
        ctx.fillStyle = "#f7d4ab";
      }
      else{
        ctx.fillStyle = "#E98D23";
      }
      ctx.beginPath();
      ctx.moveTo(this.x-leafRatio*Math.sqrt(3)*r/2, this.y-r/2);
      ctx.lineTo(this.x+leafRatio*Math.sqrt(3)*r/2, this.y-r/2);
      ctx.lineTo(this.x, this.y+r);
      ctx.lineTo(this.x-leafRatio*Math.sqrt(3)*r/2, this.y-r/2);
      ctx.closePath();
      ctx.stroke();

      ctx.fill();
      break;
    case LEAF:
      ctx.beginPath();
      ctx.rect(this.x-leafRatio*leafHeight/2,this.y-leafHeight/2,leafRatio*leafHeight,leafHeight);
      ctx.closePath();
      ctx.stroke();
      if(this.status == DISCARDED){
        ctx.fillStyle = "#f3f3f3";
      }
      ctx.fillStyle = "white";
      ctx.fill();
      break;
  }
  if(this.val != null){
    var startingStr = "";
    if(this.status == PRUNED){
      if(this.type == MAXIE){
        startingStr = "≥";
      }
      if(this.type == MINNIE){
        startingStr = "≤";
      }
    }
    if(this.status == DISCARDED){
      ctx.fillStyle = "gray";
    }
    else{
      ctx.fillStyle = "black";
    }
  	ctx.font = "bold 13px 'Courier New'";
    var valueStr = startingStr + this.val;
    letterwidth = 8;
    valueSize = letterwidth * valueStr.length;
    ctx.fillText(valueStr, this.x - valueSize/2, this.y + letterwidth/2);
  }

}


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function mouseClick(e) {

	$(nodeOptions).hide();

	var mouseFeedback = detectFromRoot(root,e.offsetX,e.offsetY);
  var selectedNode = mouseFeedback[0];
  var idx = mouseFeedback[1];

  //console.log(idx);

	if (selectedNode == null) {
		return;
	}

	nodeOptions.innerHTML = "";

	var div = document.createElement('div');
	div.innerHTML = "Add Child";
	$(div).bind('click', function(){
		$(nodeOptions).hide();
	   selectedNode.sprout();
	});
	$(nodeOptions).append(div);

	if (selectedNode.type == LEAF) {
		div = document.createElement('div');
		div.innerHTML = "Edit Value";
		$(div).bind('click', function(){
			$(nodeOptions).hide();
			selectedNode.assign("drawing");
		});
		$(nodeOptions).append(div);
	}

	if (selectedNode.parent != null) {
		div = document.createElement('div');
		div.innerHTML = "Delete Node";
		$(div).bind('click', function(){
			$(nodeOptions).hide();
			selectedNode.die(idx);
		});
		$(nodeOptions).append(div);
	}

	$("#main").append(nodeOptions);
	$(nodeOptions).css('position', 'absolute');
	$(nodeOptions).css('left', e.offsetX + 'px');
	$(nodeOptions).css('top', e.offsetY + 'px');
	$(nodeOptions).show();

}

function detect(node,mouse_x,mouse_y){
  switch (node.type) {
    case MINNIE:
      return isInMinnie(mouse_x,mouse_y,node.x,node.y);
      break;
    case MAXIE:
      return isInMaxie(mouse_x,mouse_y,node.x,node.y);
      break;
    case LEAF:
      return isInLeaf(mouse_x,mouse_y,node.x,node.y);
      break;
  }
}

function detectFromRoot(rootNode,mouse_x,mouse_y,idx=null){
  if(detect(rootNode,mouse_x,mouse_y)){
    return [rootNode,idx];
  }
  for(var i = 0; i < rootNode.children.length; i++){
    candidateFeedback = detectFromRoot(rootNode.children[i],mouse_x,mouse_y,i);
    if(candidateFeedback[0] != null){
      return candidateFeedback;
    }
  }
  return [null,idx];
}

function isInMinnie(x,y,center_x,center_y) {
  var radius = nodeCircRadius;
	var dx = (x-center_x) / leafRatio;
  var dy = y-center_y;
  return (dy <= radius / 2) && ((Math.sqrt(3)/2) * dx - dy/2 <= radius / 2) && ((-1*Math.sqrt(3)/2) * dx - dy/2 <= radius / 2);
}

function isInMaxie(x,y,center_x,center_y){
  return isInMinnie(x,2*center_y-y,center_x,center_y);
}

function isInLeaf(x,y,center_x,center_y){
  var width = leafHeight * leafRatio;
  var dx = x-center_x;
  var dy = y-center_y;
  return Math.abs(dx) <= width/2 && Math.abs(dy) <= leafHeight/2;
}
