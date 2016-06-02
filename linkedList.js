function $(id){
	return document.getElementById(id);
}

function linkNode(num,next) {
	this.num = num;
	this.nextNode = next;

}

function getLength(head){
	 var length = 1;
	 var currentNode = head;
	 while(currentNode.nextNode != null) {
	 	length++;
	 	currentNode = currentNode.nextNode;
	 };
	 console.log("length is: " + length);
	 return length;
}


//inserts a new  node into the link list and return ths head node.
function insertNode(head, newNode) {
	console.log("inside insertNode function");
//if the number in the first, head node, is smaller than the new node that's been made, the new node needs to be the new head. So the newNode's nextNode attribute is set to head. 

	if(head.num >= newNode.num){
		console.log("the newNode is smaller than or equal the head so making it the new head.");
		newNode.nextNode = head;
		console.log(newNode.nextNode);
		return newNode;
//if the number in the newNode is larger than the head's, then we have to get the nextNode and check it's number
// the head is not changing so the else statements belwo will return head. 
	}else {

		//make a new variable to hold the nextNode to be checked and set a variable for the previous node checked.
		if(head.nextNode != null){
			console.log("making variables for next and last node checked");
			var nextNodeToCheck = head.nextNode;
			console.log("nextNodeToCheck.num =" + nextNodeToCheck.num);
			console.log("newNode.num =" + newNode.num);

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
			return head;

		} else {
			// the head's nextnode is null. So insert NewNOde here by pointing the head at the new Node
			head.nextNode = newNode;
			return head;
		} // end else (head is !=null)
		
	} // end else (head is smaller)
}



function printList(head) {

	var nodeToPrint = head;
	console.log("head num is: " + head.num);

	var length = getLength(head);

	for(var i = 0; i < length; i++){
		console.log(nodeToPrint.num);
		nodeToPrint = nodeToPrint.nextNode;
	};// end for loop
} // end printList


var node1 = new linkNode(3, null);
var node2 = new linkNode(5, null);
var currentHead = insertNode(node1, node2);
console.log("currentHead is: " + currentHead.num);

console.log ($("nodeNumber"));
var node3 = new linkNode(2, null);
var node4 = new linkNode(10, null);
var node5 = new linkNode(7, null);


currentHead = insertNode(currentHead, node3);
currentHead = insertNode(currentHead, node4);
currentHead = insertNode(currentHead, node5);

printList(currentHead);

// need to put in event handler here! 
//window.onload = function () {
//	document.getElementById("addNode").onclick = insertNode("addNode");
	
//}
/*
// This function was to make a random linked list based on a user input, but too hard right now. 

function createInitialLinkList(initialNodes){
	var numNode = Math.floor(Math.random()*10);
	var nextNodeNum = numNode + Math.floor(Math.random()*10);

	createNode(numNode, nextNodeNum)


	linkNode(numNode)
	for(var i, i < initialNodes; i++){
		if(i != 0){

		}
		v


	}

	console.log(numNode + " and nextNode is: " + nextNodeNum )

}

createInitialLinkList(3);
*/

