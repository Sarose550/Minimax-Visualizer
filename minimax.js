//TODO:

//the three types of nodes
const MINNIE = 0;
const MAXIE = 1;
const LEAF = 2;

const levelSpace = 50;
//const minSpacing;
const canvasWidth = 1260;
const nodeCircRadius = 20;
const leafHeight = 30;
const leafRatio = 1.5;
var canvasHeight = 650;

var nodeDict = new Object();
var leafDict = new Object();
var root = new Node();
root.type = LEAF;
root.x = canvasWidth/2;
root.y = levelSpace;

function initRoot(){
  //console.log("initRoot");
  document.getElementById("drawing").width = canvasWidth;
  document.getElementById("drawing").height = canvasHeight;
  root.draw("drawing");
  nodeDict[root.id] = root;
  leafDict[root.id] = root;
  nodesPerLevel.push(1);
  document.getElementById("drawing").addEventListener('mousedown', mouseClick, false);
}

function resizeHeight(){
  var c = document.getElementById("drawing");
  c.height += 100;
  canvasHeight += 100;
}

function Node(){
  this.id = "_";
  //if it's the root then the ID is the empty array, otherwise it specifys the node's path
  //ID is set by the parent when adding a child
  this.val = null;
  this.parent = null;
  this.x;
  this.y;
  this.type;//Minnie, maxie or leaf
  this.children = new Array();
  this.draw = drawNode;
  this.assign = writeValue;
  this.clear = erase;
  this.sprout;
  this.die;
}

//function addChild

function erase(canvasID){
  switch (this.type){
    case MINNIE:
      //console.log("MINNIE");
      //console.log(canvasID);
      var c = document.getElementById(canvasID);
      //console.log(c);
      var ctx = c.getContext("2d");
      var r = nodeCircRadius;
      ctx.beginPath();
      ctx.moveTo(this.x-leafRatio*Math.sqrt(3)*r/2, this.y+r/2);
      ctx.lineTo(this.x+leafRatio*Math.sqrt(3)*r/2, this.y+r/2);
      ctx.lineTo(this.x, this.y-r);
      ctx.closePath();

      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.lineWidth = 1;

      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      break;
    case MAXIE:
      //console.log("MAXIE");
      //console.log(canvasID);
      var c = document.getElementById(canvasID);
      //console.log(c);
      var ctx = c.getContext("2d");
      var r = nodeCircRadius;
      ctx.beginPath();
      ctx.moveTo(this.x-leafRatio*Math.sqrt(3)*r/2, this.y-r/2);
      ctx.lineTo(this.x+leafRatio*Math.sqrt(3)*r/2, this.y-r/2);
      ctx.lineTo(this.x, this.y+r);
      ctx.closePath();

      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      break;
    case LEAF:
      //console.log("LEAF");
      //console.log(canvasID);
      var c = document.getElementById(canvasID);
      //console.log(c);
      var ctx = c.getContext("2d");
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.rect(this.x-leafRatio*leafHeight/2,this.y-leafHeight/2,leafRatio*leafHeight,leafHeight);

      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      ctx.stroke();
      ctx.lineWidth = 1;
      break;
  }
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
  this.draw(canvasID);
	this.value = parseFloat(value);

  var c = document.getElementById(canvasID);
  //console.log(c);
  var ctx = c.getContext("2d");
  ctx.fillStyle = "black";
	ctx.font = "bold 13px 'Courier New'";
  letterwidth = 8;
  valueSize = letterwidth * value.length;
  ctx.fillText(value, this.x - valueSize/2, this.y + letterwidth/2);

}

function drawNode(canvasID,outlineColor="black"){
  switch (this.type){
    case MINNIE:
      //console.log("MINNIE");
      //console.log(canvasID);
      var c = document.getElementById(canvasID);
      //console.log(c);
      var ctx = c.getContext("2d");
      var r = nodeCircRadius;
      ctx.beginPath();
      ctx.moveTo(this.x-leafRatio*Math.sqrt(3)*r/2, this.y+r/2);
      ctx.lineTo(this.x+leafRatio*Math.sqrt(3)*r/2, this.y+r/2);
      ctx.lineTo(this.x, this.y-r);
      ctx.closePath();

      ctx.strokeStyle = outlineColor;
      ctx.stroke();

      ctx.fillStyle = "#23E965";
      ctx.fill();
      break;
    case MAXIE:
      //console.log("MAXIE");
      //console.log(canvasID);
      var c = document.getElementById(canvasID);
      //console.log(c);
      var ctx = c.getContext("2d");
      var r = nodeCircRadius;
      ctx.beginPath();
      ctx.moveTo(this.x-leafRatio*Math.sqrt(3)*r/2, this.y-r/2);
      ctx.lineTo(this.x+leafRatio*Math.sqrt(3)*r/2, this.y-r/2);
      ctx.lineTo(this.x, this.y+r);
      ctx.closePath();

      ctx.strokeStyle = outlineColor;
      ctx.stroke();

      ctx.fillStyle = "#E98D23";
      ctx.fill();
      break;
    case LEAF:
      //console.log("LEAF");
      //console.log(canvasID);
      var c = document.getElementById(canvasID);
      //console.log(c);
      var ctx = c.getContext("2d");
      ctx.strokeStyle = outlineColor;
      ctx.rect(this.x-leafRatio*leafHeight/2,this.y-leafHeight/2,leafRatio*leafHeight,leafHeight);

      ctx.fillStyle = "white";
      ctx.fill();

      ctx.stroke();
      break;
  }
}


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function mouseClick(e) {

	$(nodeOptions).hide();

	var selectedNode = null;
  for(const key in nodeDict){
    let node = nodeDict[key];
    if(detect(node,e.offsetX,e.offsetY)){
      selectedNode = node;
      break;
    }
  }

	if (selectedNode == null) {
		return;
	}

	nodeOptions.innerHTML = "";

	var div = document.createElement('div');
	div.innerHTML = "Add Child";
	$(div).bind('click', function(){
		$(nodeOptions).hide();
		//selectedNode.sprout();
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
			//selectedNode.die();
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
