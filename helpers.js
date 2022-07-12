const add = (a, b) => {
  return a + b;
};

const primString = 'hello';
// console.log(primString[0])
// console.log(primString['h'])
// console.log(primString.indexOf('l'))

const map = new Map();
map.set(1, ['hello']);
// console.log(map);
map.set(1, [...map.get(1), ['hey']]); // Adding onto a key of a Map value
// console.log(map);

const word = primString.split(''); // Splits the string into an array of separate elements
// console.log(word);
const sortedWord = primString.split('').sort(); // Remember, in JavaScript we can sort strings! That is what the normal 'sort()' function is for
// console.log(sortedWord);
const sortedAndJoined = primString.split('').sort().join(''); // join() is the opposite of split, putting the elements back together! However, not in array form, in string form
// console.log(sortedAndJoined);

const arrayToSort = [10, 3, -1, 4, 20];
arrayToSort.sort((a, b) => a - b);
// console.log(`sortedArray is: ${arrayToSort}`);

const values = [10, 2, 100, -3, 4];
const maxValue = Math.max.apply(Math, values);
// console.log(`maxValue is: ${maxValue}`);

// Cleaner way to do Math.max()
const spreadValues = [10, 3, -1, 4, 20];
const maxSpreadValue = Math.max(...spreadValues)
// console.log(`spreadMax is: ${maxSpreadValue}`)

// const functionOne = () => {
//   const clone = () => {
//     map.set(1, 'Jackson')
//     console.log(`we have access to ${JSON.stringify(map)}`)
//   }

//   const map = new Map();
//   return clone()
// }

// console.log(functionOne())

module.exports = {
  add,
};
