$(document).ready(function(){
    $( "#xmlinputarea" ).click(function(){
		var sel = getSelStr();
		var str = getSelStart();
		var fin = getSelFinish();
		var PTree = buildTree($( "#xmlinputarea" ).val())
		
		//getXPath(str,fin,$( "#xmlinputarea" ).val());
        $("#xpathresulttextarea").append(PTree._root.data+'<br/>');
		//$("#xpathresulttextarea").append(str);
		//$("#xpathresulttextarea").append(fin);
    });
});

function buildTree(xmlString){
	if(xmlString[0]!='<'){
		return null;
	}
	var startPos = 0;
	var EndPos = xmlString.length;
	var rootnodeName = '';
	for(var i=1;i<xmlString.length;i++){
		if(xmlString[i]!='>' && xmlString[i]!=' '){
			rootnodeName+=xmlString[i]
		}
		else{
		startPos = i;
		break;
		}
	}
	var EndPos = xmlString.indexOf('</'+rootnodeName);
		
	var BuiltTree = new Tree(rootnodeName,xmlString.substring(startPos,EndPos),0,startPos,EndPos);
	
	
	return BuiltTree;
}

//Getting of XPath can be done by itterating through string from the selection to the top of the document, looking for the XML nodes and adding 
//unclosed nodes as prepending the string and counting siblings that appeared before the selection.
// Counting of siblings: It starts from selection and goes left.  If there are no siblings before next level tag, it checks right of the selection for siblings
// In case there are siblings, 0 is added as order of the node. Every parent has to be checked for siblings as well. 
// By doing this we won't support annotations of XML attributes, but for the first version it does not matter.
function getXPath(start,end,txt){
	var XPath = "";
	var substrStart = 0;
	var FirstTag = false;
	var siblingNodeName = '';
	var siblingOrder = 0;
	var isSibling = false;
	var prevSiblingOrder = 0;
	return XPath;
}

//This function will probably be recursive in the loop
function ReadSubTree(ParentNode,xmlSubstring,startPos,endPos)
{
	children = [];
}

//Making a tree probably need to be done recursevly. 
// Add a node. Look for the child (from tag begin to end). Inside text recursevly look for children. 

function TreeNode(data,Nodename,order,start,end,selected=false){
	this.data = data;
	this.start = start;
	this.end = end;
	this.nodeName = Nodename;
	this.order= order;
	this.parent = null;
	this.children = [];
	selected = selected;
}

function Tree(data,NodeName,order,start,end) {
    var pnode = new TreeNode(data,NodeName,order,start,end);
    this._root = pnode;
}



function getSelStr() // javascript
{
    // obtain the object reference for the <textarea>
    var txtarea = document.getElementById("xmlinputarea");
    // obtain the index of the first selected character
    var start = txtarea.selectionStart;
    // obtain the index of the last selected character
    var finish = txtarea.selectionEnd;
    // obtain the selected text
    var sel = txtarea.value.substring(start, finish);
    // do something with the selected content
	return sel;
}
function getSelStart() // javascript
{
    // obtain the object reference for the <textarea>
    var txtarea = document.getElementById("xmlinputarea");
    // obtain the index of the first selected character
    var start = txtarea.selectionStart;
	return start;
}
function getSelFinish() // javascript
{
    // obtain the object reference for the <textarea>
    var txtarea = document.getElementById("xmlinputarea");
    // obtain the index of the first selected character
    var start = txtarea.selectionStart;
    // obtain the index of the last selected character
    var finish = txtarea.selectionEnd;
	return finish;
}
