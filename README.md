# [Minimax Visualizer](https://sarose550.github.io/Minimax-Visualizer/)
Minimax, and in particular alpha-beta pruning, can be very confusing topics for students.

This page serves as a tool to help students visualize, and better understand these algorithms.

## How To Use
- To start, create a tree. You can click on the nodes and use the resulting menu to change their values, or add/remove children. 
  - Alternatively, go to ```View Example``` and select one of the options to load a sample tree.
- If you would like to save a tree for future use, go to ```Options``` and select ```Copy Tree```. A text encoding of your tree will be automatically copied to your clipboard (all leaves must be assigned values first).
  - To load a saved tree, go to ```Load Tree``` and paste the encoding once prompted.
- Once all leaf nodes have been assigned values, select ```Run``` to view either ```Minimax``` or ```Alpha-Beta Pruning```.
  - You can control the speed and press ```Pause```/```Play``` to stop or resume the animation.
  - Alternatively, use the two inner buttons, or the left/right arrow keys, to move forwards or backwards step by step.
  - Use the two outer buttons to jump to the start or end.
- Once you're finished animating, go to ```Edit```.
  - Select ```Clear Parents``` if you wish to edit the tree. This will clear any changes made by the animation, and display the tree in its original form.
  - Otherwise, select ```Reset``` to return to the default editing interface.

## Features
**Animations**

- **Nodes:**
  - See the key in the top-right corner to learn the symbolic representations for nodes.
  - A node outlined in black indicates that it has not been searched.
  - A node highlighted in red indicates that it is being searched / updated.
  - A node outlined in red indicates that it is being evaluated, and awaits an update from one of its subtrees.
  - A node outlined in blue indicates that it has already been searched, and it will contain its assigned value.
- **Edges:**
  - A black edge indicates that it has not been traversed.
  - A red edge indicates that it has been traversed down, but not up.
  - A blue edge indicates that it has been traversed both ways.
- **Alpha-Beta Pruning:**
  - When an edge is traversed, it is labeled with the *(α, β)*-interval it is originally passed.
  - An interval highlighted in blue indicates that it is being compared to a value.
  - When a node recieves an update, its action is indicated by the highlighted cell of the table in the top-left corner.
  - Once a node has pruned, its value is preceeded by "≥" if it's a Maxie node, and "≤" if it's a Minnie node. This indicates a bound on the node's value, were a full minimax search to be performed.
  - A node with gray font or a light interior indicates that it has been discarded as a result of pruning.
  - A gray edge indicates that it has been discarded as a result of pruning.
  - A severed gray edge indicates that its lower node has been pruned, and the corresponding subtree discarded.

**Text Representations of Trees**

The string representations for trees are unique, and can be defined recursively as follows (here, a tree is regarded as its root node):
- A leaf node with value *v* is represented by ```"(v)"```.
- A node whose children (from left to right) have strings *S[1]*, *S[2]*, ..., *S[n]* is represented by ```"(S[1]S[2]...S[n])"```.
---
Built with HTML, CSS, JavaScript.

GitHub Pages Link: https://sarose550.github.io/Minimax-Visualizer/
