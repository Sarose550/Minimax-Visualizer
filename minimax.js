//the three types of nodes
const MINNIE = 0;
const MAXIE = 1;
const LEAF = 2;

var nodeDict = new Object();
var leafDict = new Object();
var root = new Node();
root["type"] = MAXIE;
root["id"] = [0];

function Node(){
  this.id;
  this.val = null;
  this.parent = null;
  this.x;
  this.y;
  this.type;//Minnie, maxie or leaf
  this.children = new Array();
  this.draw = drawNode;
}

function isInMinnie(x, y, center_x, center_y, circRadius) {
	var dx = x-center_x;
  var dy = y-center_y;
  return (dy <= radius / 2) && ((Math.sqrt(3)/2) * dx - dy/2 <= radius / 2) && ((-1*Math.sqrt(3)/2) * dx - dy/2 <= radius / 2);
}

function isInMaxie(x,y,center_x,center_y, circRadius){
  return isInMinnie(x,2*center_y-y,center_x,center_y, circRadius);
}

function isInLeaf(x, y,center_x,center_y, sidelength){
  var dx = x-center_x;
  var dy = y-center_y;
  return Math.abs(dx) <= sideLength/2 && Math.abs(dy) <= sideLength/2;
}


function drawNode(canvasID,outlineColor="black"){
  switch (this.type){
    case MINNIE:
      console.log("MINNIE");
      console.log(canvasID);
      var c = document.getElementById(canvasID);
      console.log(c);
      var ctx = c.getContext("2d");
      var r = 20;
      ctx.beginPath();
      ctx.moveTo(this.x-Math.sqrt(3)*r/2, this.y+r/2);
      ctx.lineTo(this.x+Math.sqrt(3)*r/2, this.y+r/2);
      ctx.lineTo(this.x, this.y-r);
      ctx.closePath();

      ctx.strokeStyle = outlineColor;
      ctx.stroke();

      ctx.fillStyle = "#E98D23";
      ctx.fill();
      break;
    case MAXIE:
      console.log("MAXIE");
      console.log(canvasID);
      var c = document.getElementById(canvasID);
      console.log(c);
      var ctx = c.getContext("2d");
      var r = 20;
      ctx.beginPath();
      ctx.moveTo(this.x-Math.sqrt(3)*r/2, this.y-r/2);
      ctx.lineTo(this.x+Math.sqrt(3)*r/2, this.y-r/2);
      ctx.lineTo(this.x, this.y+r);
      ctx.closePath();

      ctx.strokeStyle = outlineColor;
      ctx.stroke();

      ctx.fillStyle = "#23E965";
      ctx.fill();
      break;
    case LEAF:
      console.log("LEAF");
      console.log(canvasID);
      var c = document.getElementById(canvasID);
      console.log(c);
      var ctx = c.getContext("2d");
      ctx.strokeStyle = outlineColor;
      ctx.rect(this.x-15,this.y-15,30,30);
      ctx.stroke();
      break;
  }
}


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/* class Node {
    constructor(value=null) {
        this.value = value
        this.children = []
        this.pos = { x: 0 , y: 0}
        this.sidelength = 20
        this.isHighlighted = false
    }

    get children(){
      return this.children
    }

    set position(position){ this.pos = position }

    get position(){ return this.pos }

    get sidelength() { return this.sidelength }

    isLeaf(){
      return this.children.length == 0
    }

    isNode(){
      if(this.isLeaf()){
        return this.value == null
      }
      else{
        return this.value != null
      }
    }
}


class Tree{
    constructor(){
        this.root = null
    }
}
*/
