# RichAnnotator

The tool is under development!

RichAnnotator is an annotation tool crafted for rich web documents written in XML-like format. One of the applications is supposed to be annotation of PubMedCentral documents,
including rich elements such as tables and figures.

Tool was proposed for development during [BLAHmuc](http://blahmuc.linkedannotation.org/). Original proposal that was accepted by BLAHmuc can be found [here](https://gist.github.com/nikolamilosevic86/c94382d4b52705e9ae75dab0eda6381e).

## Javascript XML parser

In order to make possible resolving XPath from XML, we created a new parser for XML documents in javascript that builds a tree of XML elements and also saves the 
original position of the element in the XML string.

Node datastructure is designed in the following manner: 

```javascript
function TreeNode(data,Nodename,order,start,end,parentNode,selected=false){
	this.data = data; // String between XML tags
	this.start = start; // Start position in the original string
	this.end = end; // End position in the original string
	this.nodeName = Nodename; // Name of the tag
	this.order= order; // order among the siblings
	this.parent = parentNode; //Pointer to the parent node
	this.children = []; // Array of the children nodes
	this.selected = selected; // Whether it was selected for annotation
}
```