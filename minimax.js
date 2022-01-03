//TODO:
//Add the drawing methods required for minimax / alpha-beta pruning
//-add alpha and beta attributes, drawing intervals on the edges, pruning edges, highlighting
//Add the algorithms and animations


//the three types of nodes
const MINNIE = 0;
const MAXIE = 1;
const LEAF = 2;

const levelSpace = 100;
//const minSpacing;
const canvasWidth = 1260;
const nodeCircRadius = 20;
const leafHeight = 30;
const leafRatio = 1.5;
var canvasHeight = 675;

var numLeaves = 0;
var root;

function Node(){
  this.val = null;
  this.parent = null;
  this.x;
  this.y;
  this.type;//Minnie, maxie or leaf
  this.children = new Array();
  this.draw = drawNode;
  this.assign = writeValue;
  this.sprout = addChild;
  this.die = killSelf;
}

function killSelf(i){
  numLeaves -= countLeaves(this);
  this.parent.children.splice(i,1);
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
    //console.log("drawing edge from (" + rootNode.x + ", " + rootNode.y + ") to (" + curNode.x + ", " + curNode.y + ")");
    ctx.strokeStyle = "black";
    //console.log(ctx.strokeStyle);
    ctx.beginPath();
    ctx.moveTo(rootNode.x,rootNode.y);
    ctx.lineTo(curNode.x,curNode.y);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.stroke();
    drawEdges(curNode,canvasID);
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
  if(newChild.y > canvasHeight){
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
  switch (this.type){
    case MAXIE:
      //console.log(canvasID);
      var c = document.getElementById(canvasID);
      //console.log(c);
      var ctx = c.getContext("2d");
      var r = nodeCircRadius;

      ctx.strokeStyle = outlineColor;
      ctx.fillStyle = "#23E965";
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
      var c = document.getElementById(canvasID);
      var ctx = c.getContext("2d");
      var r = nodeCircRadius;
      ctx.fillStyle = "#E98D23";
      ctx.strokeStyle = outlineColor;
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
      //console.log(canvasID);
      var c = document.getElementById(canvasID);
      //console.log(c);
      var ctx = c.getContext("2d");
      ctx.strokeStyle = outlineColor;
      ctx.beginPath();
      ctx.rect(this.x-leafRatio*leafHeight/2,this.y-leafHeight/2,leafRatio*leafHeight,leafHeight);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.fill();
      break;
  }
  if(this.val != null){
    var valueStr = "" + this.val;
    ctx.fillStyle = "black";
  	ctx.font = "bold 13px 'Courier New'";
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

function isInMinnie(x, y, center_x, center_y) {
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
