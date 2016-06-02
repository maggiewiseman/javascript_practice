var currentHead = null;

function $(id){
	return document.getElementById(id);
}


function linkNode(num,next) {
	this.num = num;
	this.nextNode = next;

}

function getLength(){
	 if(currentHead != null){
	 var length = 1;
	 var currentNode = currentHead;
	 while(currentNode.nextNode != null) {
	 	length++;
	 	currentNode = currentNode.nextNode;
	 };
	 console.log("length is: " + length);
	 return length;
	} else { 
		return 0;
	}
}


//inserts a new  node into the link list and return ths head node.
function insertNode(head, newNode) {
	console.log("inside insertNode function");
//if the number in the first, head node, is smaller than the new node that's been made, the new node needs to be the new head. So the newNode's nextNode attribute is set to head. 

	if(head.num >= newNode.num){
		console.log("the newNode is smaller than or equal the head so making it the new head.");
		newNode.nextNode = head;
		console.log(newNode.nextNode);
		currentHead = newNode;
//if the number in the newNode is larger than the head's, then we have to get the nextNode and check it's number
// the head is not changing so the else statements belwo will return head. 
	}else {

		//make a new variable to hold the nextNode to be checked and set a variable for the previous node checked.
		if(head.nextNode != null){
			console.log("making variables for next and last node checked");
			var nextNodeToCheck = head.nextNode;

			var lastNodeChecked = head;
			var nodeInserted = false;	

			while(!nodeInserted){
				if(nextNodeToCheck.num >= newNode.num) {
					//found insertion spot. Set newNode's nextNode to the one we just checked and change that one to the previous one
					newNode.nextNode = nextNodeToCheck;
					lastNodeChecked.nextNode = newNode; 
					nodeInserted = true;
				//reset nextNodeToCheck and lastNodeChecked to continue looking for insertion spot.
				} else if (nextNodeToCheck.num < newNode.num) {
					// check to make sure the end of the list has not been reached
					if(nextNodeToCheck.nextNode != null){
						lastNodeChecked = nextNodeToCheck;
						nextNodeToCheck = nextNodeToCheck.nextNode;
					} else {
						//End of line has been reached, newNode goes at the end!
						nextNodeToCheck.nextNode = newNode;
						nodeInserted = true;
					}
				} 	// end else if
			} // end while
			currentHead = head;

		} else {
			// the head's nextnode is null. So insert NewNOde here by pointing the head at the new Node
			head.nextNode = newNode;
			currentHead = head;
		} // end else (head is !=null)
		
	} // end else (head is smaller)
}



function printList() {

	var nodeToPrint = currentHead;
	console.log("head num is: " + currentHead.num);

	var length = getLength();

	for(var i = 0; i < length; i++){
		console.log(nodeToPrint.num);

		this.nextElementSibling.innerHTML = this.nextElementSibling.innerHTML + " " + nodeToPrint.num;
		this.insertAdjacentHTML("afterend", nodeToPrint.num);
		nodeToPrint = nodeToPrint.nextNode;
	};// end for loop


} // end printList

function addNode(){
	//make a node

	var nodeToAdd = new linkNode($("addNodeInput").value, null);
	console.log("addNodeInput is: " + $("addNodeInput").value);
	//insert the node into the list
	insertNode(currentHead, nodeToAdd);
	$("linkList").innerHTML = "";
}

// This function was to make a random linked list based on a user input, but too hard right now. 

function createInitialLinkList(){
	console.log("submit clicked." + $("initialNodeInput").value);

	var numberOfNodes = $("initialNodeInput").value;
	
	for(i = 0; i < numberOfNodes; i++){
		var node = [];
		node[i] = new linkNode(Math.floor(Math.random()*10), null);
	
		if(currentHead != null){
			insertNode(currentHead, node[i]);
		} else {
			currentHead = node[i];
		}

		console.log(node[i].num);
	}

	$("initalizeListDiv").className += "listInitialized";

} 


//adding event handlers to buttons here! 
window.onload = function () {

	$("nodeNumberSubmit").onclick = createInitialLinkList;
	$("addNode").onclick = addNode;
	$("printList").onclick = printList;
	$("lengthButton").onclick = function(){
			$("listLengthButton").value = getLength();
		}
}

