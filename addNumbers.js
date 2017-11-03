const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Please enter a number: ", (res) => {
      let num = parseInt(res);
      sum += num;
      // console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    completionCallback(sum);
  }
}

addNumbers(0, 3, function(sum) {
  console.log(`Total Sum: ${sum}`);
  reader.close();
});
// let solution = addNumbers(0, 3, sum => sum);
// console.log(`The solution is: ${solution}`);
// console.log('end');
