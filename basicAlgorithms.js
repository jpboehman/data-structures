const maxSubArray = (nums) => {
	try {
		if (!nums) {
			throw new Error('Input must be a valid array of numbers');
		}

		let maxValue = 0;
		let sum = 0;

		for (let i = 0; i < nums.length; i++) {
			sum = sum + nums[i];
			if (sum > maxValue) {
				maxValue = sum;
			} else if (sum < 0) {
				sum = 0;
			}
		}
		return maxValue;
	} catch (e) {
		console.error(e);
	}
};

// console.log(maxSubArray([-2, 1, -3, 4, -1]));
// console.log(maxSubArray([-2, 1, -3, 4, -1, 7, 8, 3, -2]));
// console.log(maxSubArray(null));

// Maximum Product SubArray
// Given an integer array nums,
// find a contiguous non-empty subarray within the array that has the largest product, and return the product.
// Almost there, finish handling edge-cases in leetcode!
const maxProduct = (nums) => {
	if (nums.length === 1) return nums[0];

	let maximumProduct = 0;
	let product = 1;

	// Iterate over nums to check product value
	for (let value of nums) {
		product *= value;
		if (product > maximumProduct) {
			maximumProduct = product;
		} else if (product <= 0) {
			if (product === 0) {
				product = 1;
			} else {
				product = value;
			}
		}
	}
	return maximumProduct;
};

// console.log(maxProduct([3, 6, -2, 4]));
// console.log(maxProduct([5, 6, -2, 7]));

const productExceptSelf = (nums) => {
	let newNums = [...nums];
	const indexedValues = [];
	const finalValues = [];

	// Using rest operator to get all values except the value at the current index
	for (let i = 0; i < newNums.length; i++) {
		[newNums[i], ...restOfValues] = newNums;
		indexedValues.push(restOfValues);
		newNums = [...nums]; // re-assign so we start with the correct numbers each time
	}

	// Helper method to multiply all values of the array index
	const multiplier = (values) => {
		let product = 1;
		for (let number of values) {
			product *= number;
		}
		return product;
	};

	// Method to call and have multiply for each index
	for (let i = 0; i < indexedValues.length; i++) {
		const finalProduct = multiplier(indexedValues[i]);
		finalValues.push(finalProduct);
	}

	return finalValues;
};

// String questions
const longestSubstring = (s) => {
	try {
		// Check to see if input is valid
		if (!s || s.includes(' ')) {
			throw new Error('Input must be characters with no spaces');
		}

		// First, going to try to use a Map as it lends itself well for lookup operations in constant time
		const stringMap = new Map();
		let counter = 0;
		let maxLength = 0;

		for (let letter of s) {
			// Check of maxLength to see if we need to update it after duplicate is found
			if (counter > maxLength) {
				maxLength = counter;
			}

			if (stringMap.has(letter)) {
				// Handle duplicate logic
				// Reset counter and continue to iterate
				stringMap.delete(letter);
				counter = 1;
				// Handle edge case if the string is all one letter
				if (s[s.charAt(letter)] === s[s.length - 1]) {
					return 1;
				}
			} else {
				// Insert the letter into the map with a value of 1
				// Increment the counter - substring length increases
				stringMap.set(letter, 1);
				counter += 1;
			}
		}

		return maxLength;
	} catch (e) {
		console.error(e);
	}
};

// console.log(longestSubstring('pwwkew'));
// console.log(longestSubstring('abcabcbb'));

// const groupAnagrams = (strs) => {
//   try {
//       if (!strs || typeof strs === Number) {
//           throw new Error('The input must be an array of strings')
//       }
//     const wordMap = new Map();

//     for (let word of strs) {
//       let cleansed = word.split('').sort().join(''); // Puts the word in sorted alphabetical order, and returns a String
//       if (wordMap.has(cleansed)) {
//         // Add the word to the values for the key cleansed
//         wordMap.set(cleansed, [...wordMap.get(cleansed), word]);
//       } else {
//         // Set the initial value
//         wordMap.set(cleansed, [word]);
//       }
//     }

//     // Iterate over Map so we return answer in the correct format
//     const result = [];
//     for (const [k] of wordMap) {
//       result.push(wordMap.get(k));
//     }
//     return result;
//   } catch (e) {
//     console.error(e);
//   }
// };

// console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));

// GRAPH questions
// cloneGraph
// const cloneGraph = (node) => {
//   const clone = (node) => {
//     if (!node) return null;
//     if (map.has(node.val)) return map.get(node.val);

//     const newNode = { val: node.val, neighbors: [] };
//     map.set(node.val, newNode);
//     for (let n of node.neighbors) {
//       newNode.neighbors.push(clone(n));
//     }
//     return newNode;
//   };

//   const map = new Map();
//   return clone(node);
// };

// console.log(
//   cloneGraph([
//     [2, 4],
//     [1, 3],
//     [2, 4],
//     [1, 3],
//   ])
// );

const longestConsecutive = (nums) => {
	if (nums.length === 0) return 0;
	let longestSequence = 1;
	const values = [];

	// Iteratively
	for (let i = 0; i < nums.length; i++) {
		values.push(nums[i]);
	}

	// Sort the array for the sequence
	const sorted = values.sort((a, b) => a - b);
	// console.log(sorted);

	// Iterate and check to see if the valus are sequential
	for (let i = 0; i < sorted.length; i++) {
		let current = sorted[i];
		let next = sorted[i + 1];
		if (next === current + 1) {
			longestSequence++;
		}
	}

	return longestSequence;
};

// RECURSION PRACTICE - yay :)
const recursiveReverse = (string) => {
	if (string.length < 2) return string;

	return recursiveReverse(string.slice(1, string.length)) + string[0];
};

// console.log(recursiveReverse('Jackson'));
// console.log(recursiveReverse('The Daily Byte'));
// console.log(recursiveReverse('Civic'));

const reverseArray = (array) => {
	if (array.length < 2) return array;

	// One step simpler
	return reverseArray(array.slice(1, array.length)) + array[0];
};

// console.log(reverseArray([1, 2, 3, 4, 5, 7, 6, 9]));

const twoSum = (values, target) => {
	// Can use a map to see if a the values exist or not
	const pureValues = [...values];
	const valueMap = new Map();

	for (let value of pureValues) {
		if (valueMap.has(target - value)) {
			return true;
		} else {
			// Enter values into the Map
			valueMap.set(value, 1);
		}
	}
	return false;
};

export const isSameTree = (p, q) => {
	if (!p && !q) {
		// If they are both null at this point, then they are the same tree
		return true;
	} else if (!p || !q) {
		// If one is null and the other is not, it cannot be the same tree
		return false;
	} else if (p.val !== q.val) {
		// In this case, both of the initial nodes are valid, but their values don't match up
		return false;
	} else {
		// Now we are reaching our recursive case
		return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
	}
};

export const maxDepth = (root) => {
	let maxDepthBST = 0;

	// This is a recursive question as we can check for the same condition over and over
	// Counting the depth here - we will use DFS
	const DFS = (node, level) => {
		if (!node) return;

		if (level > maxDepthBST) maxDepthBST = level;

		// Recursive calls - call for node.left and node.right
		DFS(node.left, level + 1);
		DFS(node.right, level + 1);
	};

	DFS(root, 1);
	return maxDepthBST;
};

const isSubtree = (s, t) => {
	if (s == null) {
		return false;
	}
	if (isSameTree(s, t)) {
		return true;
	}
	// Because if the tree is a subtree of the left and right child nodes, it is still a valid subtree
	return isSubtree(s.left, t) || isSubtree(s.right, t);
};

const isSameTree = (s, t) => {
	if (s && t) {
		return (
			s.val === t.val &&
			isSameTree(s.left, t.left) &&
			isSameTree(s.right, t.right)
		);
	}
	return s === t;
};

// Correct way:
// BFS, and return each pair of nodes at each level
const levelOrder = (root) => {
	// For BFS, we want to utilize a queue -> Runtime is O(N+M)
	const levels = [];

	if (!root) return levels;
	// Place the BST in an array
	const queue = [root];

	// while() loop is where we setup the individual level traversal
	while (queue.length) {
		const queueLength = queue.length;
		const level = [];

		// for loop here adds the sibling nodes to the queue
		for (let i = 0; i < queueLength; i++) {
			// .shift() remove the first element of the array
			const currentNode = queue.shift();
			if (currentNode.left) {
				queue.push(currentNode.left);
			}
			if (currentNode.right) {
				queue.push(currentNode.right);
			}

			// Push the value of the currentNode onto to the current level array
			level.push(currentNode.val);
		}
		// Push the array into the result arrau
		levels.push(level);
	}
	return levels;
};

// Tree DFS
const levelOrderDFS = (root) => {
	if (!root) return;

	const paths = [];
	// Add the root node to the stack
	const stack = [root];
	while (stack.length) {
		const stackLength = stack.length;
		const path = [];

		for (let i = 0; i < stackLength; i++) {
			// Popping off the node from the stack
			const currentNode = stack.pop();

			// Process the node by checking for its children
			if (currentNode.right) {
				stack.push(currentNode.right);
			}
			if (currentNode.left) {
				stack.push(currentNode.left);
			}

			path.push(currentNode.val);
		}
		paths.push(path);
	}
	// Result may look the same, but look at the order - it is performing DFS in preorder traversal order!
	return paths;
};

const object = {
	username: 'Jackson',
	password: 'Boehman',
};

console.log(twoSum([1, 3, 8, 2], 10));
console.log(twoSum([3, 9, 13, 7], 8));
console.log(twoSum([4, 2, 6, 5, 2], 4));

const modeHelper = (root, values) => {
	if (!root) return;

	values.push(root.val);
	// Recursive calls to get all values within the tree and populate them into an array
	if (root.left) {
		return modeHelper(root.left, values);
	} else if (root.right) {
		return modeHelper(root.right, values);
	}

	return values;
};

const findMode = (root) => {
	const values = [];

	modeHelper(root, values);

	let mode = {};
	let maxCount = 1;
	let maxElements = [];
	maxElements.push(values[0]);
	for (let value of values) {
		if (!mode[value]) {
			mode[value] = 1;
		} else {
			mode[value]++;
		}

		if (mode[value] >= maxCount) {
			maxCount = mode[value];
			maxElement = value;
		}
	}
	return [maxElement];
};
findMode([1, null, 2, 2]);

const lowestCommonAncestorBST = (root, p, q) => {
	// Determine the side of the tree for the ancestor node
	if (p.val < root.val && q.val < root.val) {
		// We are on the left-side
		return lowestCommonAncestorBST(root.left, p, q);
	} else if (p.val > root.val && q.val > root.val) {
		// We are on the right side
		return lowestCommonAncestorBST(root.right, p, q);
	} else {
		// We have found the lowest common ancestor
		return root;
	}
};

const insertIntoBST = (root, val) => {
	// If we've reached the place for insertion, return the new Node to insert
	if (!root) {
		root = new TreeNode(val);
	} else if (root.val > val) {
		root.left = insertIntoBST(root.left, val);
	} else {
		root.right = insertIntoBST(root.right, val);
	}
	return root;
};

const invertTree = (root) => {
	// Tree problem lends themselves well to recursion

	if (!root) return null;

	const left = invertTree(root.left);
	const right = invertTree(root.right);

	// Going to reset as each funciton call returns out!
	root.left = right;
	root.right = left;

	return root;
};

module.exports = {
	maxSubArray,
	maxProduct,
	productExceptSelf,
	longestSubstring,
	// groupAnagrams,
	// cloneGraph,
	longestConsecutive,
	twoSum,
};
