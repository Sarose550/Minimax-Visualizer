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
  - Otherwise, select ```Reset``` to return to the editing interface.

## Features
**Text Representations of Trees:**
The string representations for trees are unique, and can be defined recursively as follows (here, a tree is regarded as its root node):
- A leaf node with value *x* is represented by ```(x)```.
- A node with children *T<sub>1</sub>*

Built with HTML, CSS, JavaScript.

GitHub Pages Link: https://sarose550.github.io/Minimax-Visualizer/
