var steps;
var speed;//the user will be able to speed it up or slow it down, 0.25x to 4.0x

function initSteps(){
  steps = new Sequence([new Frame(root)]);
}

function Frame(tree, tableInstr=null){
  this.tree = cloneTree(tree);
  this.tableInstr = tableInstr;
  this.display = () => {
      root = this.tree;
      drawAll("drawing");
  };
}

function Sequence(frames){
  this.frames = frames;
  this.selectedFrame = null;
  if(frames.length > 0){
    this.selectedFrame = frames[0];
  }
  this.selectedFrameidx = 0;
  this.addFrame = (newFrame) => {
      this.frames.push(newFrame);
      this.selectedFrame = this.frames[this.selectedFrameidx];
    };
  this.loadFrame = () => {this.selectedFrame.display();};
  this.selectFirst = firstFrame;
  this.selectLast = lastFrame;
  this.selectPrev = prevFrame;
  this.selectNext = nextFrame;
  this.present;
}

function firstFrame(){
  this.selectedFrameidx = 0;
  this.selectedFrame = this.frames[this.selectedFrameidx];
  disableButton(0,1);
  enableButton(3,4);
}

function lastFrame(){
  this.selectedFrameidx = this.frames.length-1;
  this.selectedFrame = this.frames[this.selectedFrameidx];
  disableButton(3,4);
  enableButton(0,1);
}

function nextFrame(){
  this.selectedFrameidx++;
  this.selectedFrame = this.frames[this.selectedFrameidx];
  if(this.selectedFrameidx == this.frames.length-1){
    disableButton(3,4);
  }
  enableButton(0,1);
}

function prevFrame(){
  this.selectedFrameidx--;
  this.selectedFrame = this.frames[this.selectedFrameidx];
  if(this.selectedFrameidx == 0){
    disableButton(0,1);
  }
  enableButton(3,4);
}

function showFirst(){
  steps.selectFirst();
  steps.loadFrame();
}

function showLast(){
  steps.selectLast();
  steps.loadFrame();
}

function showNext(){
  steps.selectNext();
  steps.loadFrame();
}

function showPrev(){
  steps.selectPrev();
  steps.loadFrame();
}

function compileMinimax(){
  if(!isTree(root)){
    alert("Must assign values to all leaf nodes first.");
    return;
  }
  isEditing = false;
  showButtons();
  disableButton(0,1);
  enableButton(3,4);
  drawTreeCode(toTreeCode(root));
  initSteps();
  //console.log(steps);
  //steps.loadFrame();
  compileMinimaxHelper(root, root, steps);//the first frame holds the starting configuration
  root.status = SEARCHED;
  steps.addFrame(new Frame(root));
}

function compileMinimaxHelper(tree, selectedNode, frames){
  selectedNode.status = BOLD;
  if(selectedNode.parent != null){
    selectedNode.parent.status = SEARCHING;
  }
  frames.addFrame(new Frame(tree));
  for(var i = 0; i < selectedNode.children.length; i++){
    var nextNode = selectedNode.children[i];
    compileMinimaxHelper(tree,nextNode,frames);
    if(selectedNode.type == MAXIE){
      if(selectedNode.val == null){
        selectedNode.val = Number.NEGATIVE_INFINITY;
      }
      selectedNode.val = Math.max(selectedNode.val, nextNode.val);
    }
    if(selectedNode.type == MINNIE){
      if(selectedNode.val == null){
        selectedNode.val = Number.POSITIVE_INFINITY;
      }
      selectedNode.val = Math.min(selectedNode.val, nextNode.val);
    }
    nextNode.status = SEARCHED;
    selectedNode.status = BOLD;
    frames.addFrame(new Frame(tree));
  }
}
