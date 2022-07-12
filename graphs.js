/* eslint-disable guard-for-in */
// Implementing a Graph class with an adjacency list
// create a graph class
class Graph {
	// defining vertex array and
	// adjacent list
	constructor(noOfVertices) {
		this.noOfVertices = noOfVertices;
		this.adjList = new Map();
	}

	// add vertex to the graph
	addVertex(v) {
		// initialize the adjacent list with a
		// null array
		this.adjList.set(v, []);
	}

	// add edge to the graph
	addEdge(src, dest) {
		// get the list for vertex v and put the
		// vertex w denoting edge between v and w
		if (!src) {
			this.addVertex(src);
		}
		if (!dest) {
			this.addVertex(dest);
		}
		this.adjList.get(src).push(dest);

		// Since graph is undirected,
		// add an edge from w to v also
		this.adjList.get(dest).push(src);
	}

	// Prints the vertex and adjacency list
	printGraph() {
		// get all the vertices
		const keys = this.adjList.keys();

		// iterate over the vertices
		for (let i of keys) {
			// get the corresponding adjacency list
			// for the vertex
			const values = this.adjList.get(i);
			let conc = '';

			// iterate over the adjacency list
			// concatenate the values into a string
			for (var j of values) conc += j + ' ';

			// print the vertex and its adjacency list
			console.log(i + ' -> ' + conc);
		}
	}

	// function to performs BFS
	bfs(startingNode) {
		// create a visited object
		const visited = {};

		// Create an object for queue
		const queue = [startingNode];
		const result = [];
		// add the starting node to the queue
		visited[startingNode] = true;

		// loop until queue is element
		while (queue.length) {
			// get the element from the queue
			const currentNode = queue.shift();
			result.push(currentNode);

			// get the adjacent list for current vertex
			const list = this.adjList.get(currentNode);

			// loop through the list and add the element to the
			// queue if it is not processed yet
			// Using an in loop to iterate over the vertex's
			for (let i in list) {
				let neighbor = list[i];
				if (!visited[neighbor]) {
					visited[neighbor] = true;
					queue.push(neighbor);
				}
			}
		}
		return result;
	}

	// Main DFS method
	dfs(startingNode) {
		const visited = {};
		this.dfsHelper(startingNode, visited);
	}

	// Recursive function which process and explore
	// all the adjacent vertex of the vertex with which it is called
	dfsHelper(vert, visited) {
		visited[vert] = true;
		console.log(vert);

		const neighbors = this.adjList.get(vert);

		for (let i in neighbors) {
			let node = neighbors[i];
			if (!visited[node]) {
				this.dfsHelper(node, visited);
			}
		}
	}
}

const graph = new Graph(6);
const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];

for (let i = 0; i < graph.noOfVertices; i++) {
	graph.addVertex(vertices[i]);
}

// adding edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'D');
graph.addEdge('A', 'E');
graph.addEdge('B', 'C');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
graph.addEdge('E', 'C');
graph.addEdge('C', 'F');

// console.log(graph);

// console.log(graph.bfs('A'));

// console.log(graph.dfs('A'));

const canFinish = (numCourses, prerequisites) => {

	const createAdjList = () => {
		const list = [];
		for (let i = 0; i < numCourses; i++) {
			list[i] = [];
		}
		for (let j = 0; j < prerequisites.length; j++) {
			const edge = prerequisites[j];

			// Directed graph, so we only do this once instead of both ways
			list[edge[0]].push(edge[1]);
		}
		return list;
	}

	const dfsCheckCycle = (sourceNode) => {
		// Book-keeping: keep track of the arrival time
		arrival[sourceNode] = time++;
		visited[sourceNode] = true;
		const currentList = adjList[sourceNode];

		// Iterate over the currentNode's adjacency list
		for (let neighbor of currentList) {
			if (!visited[neighbor]) {
				// tree-edge
				if (dfsCheckCycle(neighbor)) {
					return true
				}
			} else {
				if (!departure[neighbor]) {
					// In this case, there is a back-edge and therefore there is a cycle
					return true;
				}
			}
		}
		departure[sourceNode] = time++
		return false;
	}

	const visited = {};
	const adjList = createAdjList();
	let time = 0;
	const arrival = [];
	const departure = [];

	// Driver-code
	const checkCurriculum = () => {
		for (let node = 0; node < numCourses; node++) {
			if (!visited[node]) {
				if (dfsCheckCycle(node)) {
					return false;
				}
			}
		}
		return true
	}

	return checkCurriculum();
};