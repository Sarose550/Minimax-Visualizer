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
