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
- A node whose children (from left to right) have strings S<sub>1</sub>, S<sub>2</sub>, ..., S<sub>n</sub> is represented by ```"(```S<sub>1</sub> S<sub>2</sub> ... S<sub>n</sub>```)"```.

## For CMU 15-150 Principles of Functional Programming

**Explicit Game Trees**

The explicit game tree datatype is defined as follows:
<pre>datatype gameTree
      = Outcome of string * Player.t
      | Esti of string * int
      | Node of string * gameTree list</pre>
**Copy SML:**
- The ```Copy SML``` button under ```Options``` copies to your clipboard the current tree, represented as a ```gameTree``` in SML text. (Note: The trees you create with this page do not make use of the ```Outcome``` constructor.)

**Load SML**
- The ```Load SML``` button under ```Options``` enables you to load a tree from SML text, allowing for easier sharing of test cases. (Note: The cases testSmall and testBig are examples 4 and 5, respectively).

**Use For Testing:**
If you want to run your ```AlphaBeta.fun``` implementation on a tree, do the following:
  1. Select ```Copy SML``` to copy the tree to your clipboard.
  2. Enter 
  <pre> > ./ smlnj -m sources.cm </pre> 
  into the REPL.
  3. Type 
  <pre>
  - structure Custom = CustomABTest(val tree = <paste tree here>);
  </pre>
  4. The structure ```Custom``` can be used to test your tree as follows:
  <pre>
  - Custom.testCustom ();
  </pre>
Alternatively, if you would like to avoid copying the same test cases repeatedly, you can follow these instructions:
  1. Go to ```ABTests.sml```. Navigate to the definition of ```structure ABTests```.
  Copy and paste the following, and fill in the information where indicated (here, name can be anything you would like to name the test case so long as it is a valid identifier):
  <pre>
  local
    structure Test*name* = AlphaBeta (
      struct
        structure Est = ExplicitEst
        val search_depth = (*height of your tree*)
      end
    )
    val tree*name* = (*your tree here*)
  in
    val test*name* = fn () => Test*name*.next_move (tree*name*,Player.Maxie,0)
  end</pre>
  Here we define a leaf to have height 0, and the height of a tree is 1 more than the maximum height of its children.
  
  2. Go to the page, copy the SML text to your clipboard, and paste it where it says ```(*your tree here*)```.
  
  3. In the signature for ```ABTests```, add the following line:
  <pre>val test*name* : unit -> ExplicitGame.Move.t</pre>
These can be used for testing as follows:
<pre>
> ./ smlnj -m sources.cm
- ABTests.test*name* ();
</pre>

- To load a saved tree from SML text, go to ```Load SML``` and paste the SML text once prompted.
---
If you have any questions or think there's a bug, feel free to email me at [sarose550@gmail.com](mailto:sarose550@gmail.com?subject=[GitHub]%20Minimax%20Visualizer).

Built with HTML, CSS, JavaScript.

GitHub Pages Link: https://sarose550.github.io/Minimax-Visualizer/
