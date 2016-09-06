$(document).ready(function(){
    $( "#xmlinputarea" ).click(function(){
		var sel = getSelStr();
		var str = getSelStart();
		var fin = getSelFinish();
		var PTree = buildTree($( "#xmlinputarea" ).val())
		
		//getXPath(str,fin,$( "#xmlinputarea" ).val());
		if(PTree !=null){
        $("#xpathresulttextarea").append(PTree._root.nodeName+'<br/>');
		}
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
		
	var BuiltTree = new Tree(xmlString.substring(startPos,EndPos),rootnodeName,0,startPos,EndPos);
	ReadSubTree(BuiltTree._root,xmlString.substring(startPos,EndPos),startPos,EndPos);
	
	
	return BuiltTree;
}

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
	originalXML = xmlSubstring;
	nodeName = '';
	children = [];
	tagstart = false;
	finalIndex = endPos;
	startIndex = startPos;
	var pos = 0;
	var offset = 0;
	order = 0
	hasChildNode = false;
	while(pos<(xmlSubstring.length)){
		nodeName = '';
		tagstart = false;
		hasChildNode = false;
	for(var i=pos;i<xmlSubstring.length;i++){
		if(xmlSubstring[i]=='<'){
		tagstart = true;
		continue;
		}
		if(tagstart == true && xmlSubstring[i]!='>' && xmlSubstring[i]!=' '){
			nodeName+=xmlSubstring[i]
		}
		if(tagstart == true && (xmlSubstring[i]=='>' || xmlSubstring[i]==' ')){
			while(xmlSubstring[i]!='>'){
				i++;
			}
		startPos = offset+i+1;
		hasChildNode = true;
		break;
		}
		pos = i+1;
	}
	if(hasChildNode){
	var endPos = offset+	xmlSubstring.indexOf('</'+nodeName);
	newNode = new TreeNode(originalXML.substring(startPos,endPos),nodeName,order,startIndex+startPos,startIndex+endPos,ParentNode);
	pos = endPos+nodeName.length+3;
	ParentNode.children.push(newNode);
	hasChildNode = false;
	order++;
	xmlSubstring = xmlSubstring.substring(endPos+nodeName.length+3,xmlSubstring.length);
	offset = endPos+nodeName.length+3;
	pos = 0;
	}
	}
	for(var j = 0;j<ParentNode.children.length;j++)
	{
		ReadSubTree(ParentNode.children[j],ParentNode.children[j].data,ParentNode.children[j].start,ParentNode.children[j].end);
	}
	
	
}

//Making a tree probably need to be done recursevly. 
// Add a node. Look for the child (from tag begin to end). Inside text recursevly look for children. 

function TreeNode(data,Nodename,order,start,end,parentNode,selected=false){
	this.data = data;
	this.start = start;
	this.end = end;
	this.nodeName = Nodename;
	this.order= order;
	this.parent = parentNode;
	this.children = [];
	this.selected = selected;
}

function Tree(data,NodeName,order,start,end) {
    var pnode = new TreeNode(data,NodeName,order,null,start,end);
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
