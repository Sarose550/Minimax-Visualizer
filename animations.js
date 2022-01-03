var allSeqs;

function Frame(tree, tableInst=null){
  this.tree = tree;
  this.tableInst = tableInst;
  this.display;
}

function Sequence(frames){
  this.frames = frames;
  this.selectedFrame = null;
  if(frames.length > 0){
    this.selectedFrame = frames[0];
  }
  this.selectedFrameidx = 0;
  this.addFrame = function(newFrame){
                      this.frames.push(newFrame);
                      this.selectedFrame = this.frames[this.selectedFrameidx];
                    };
  this.play;
}

function SlideShow(sequences){
  this.sequences = sequences;
  this.selectedSeq = null;
  if(sequenes.length > 0){
    this.selectedSeq = sequenes[0];
  }
  this.selectedSeqidx = 0;
  this.addSeq = function(newSeq){
                      this.sequences.push(newSeq);
                      this.selectedSeq = this.sequenes[this.selectedSeqidx];
                    };
  this.present;
}

function compileMinimax(){
  return compileMinimaxHelper(root, root, new SlideShow([new Sequence([])]));
}

function compileMinimaxHelper(tree, selectedNode, slides){
  for(var i = 0; i < rootNode.children.length; i++){
    var nextTreeFeedback = cloneTree(tree, selectedNode);
    var nextTree = nextTreeFeedback[0];
    var nextSelectedNode = nextTreeFeedback[1];
    nextSelectedNode.searching = true;
    slides.selectedSeq.addFrame()
  }
  //If we've hit a leaf, add the frames for modifying the parent's value
  if(selectedNode.type == LEAF){
    return;
  }
}
