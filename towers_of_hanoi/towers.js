const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.stacks = [[1, 2, 3], [], []];
  }

  run(completionCallBack) {
    this.promptMove((start, end) => {
      if (!this.move(start, end)) {
        console.log("Invalid move.");
      }

      if (!this.isWon()) {
        this.run(completionCallBack);
      } else {
        console.log("You win!");
        completionCallBack();
      }
    });
  }

  promptMove(callback) {

    this.print();
    reader.question("Select a source tower", (sourceRes) => {
      let source = parseInt(sourceRes);
      reader.question("Select a destination tower", (desinationRes) => {
        let destination = parseInt(desinationRes);
        callback(source, destination);
      });
    });
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    if (startTowerIdx < 0 || startTowerIdx > 2 ||
        endTowerIdx < 0 || endTowerIdx > 2) {
      return false;
    }
    if (this.stacks[startTowerIdx].length === 0) {
      return false;
    }
    if (this.stacks[endTowerIdx].length > 0 &&
        this.stacks[endTowerIdx][0] < this.stacks[startTowerIdx][0]) {
      return false;
    }
    return true;
  }

  move(startTowerIdx, endTowerIdx) {
    if (!this.isValidMove(startTowerIdx, endTowerIdx)) {
      return false;
    } else {
      this.stacks[endTowerIdx].unshift(this.stacks[startTowerIdx].shift());
      return true;
    }
  }

  print() {
    console.log(`First stack: ${this.stacks[0]}`);
    console.log(`Second stack: ${this.stacks[1]}`);
    console.log(`Third stack: ${this.stacks[2]}`);
  }

  isWon() {
    return this.stacks[1].length == 3 || this.stacks[2].length == 3;
  }
}

const game = new Game();
game.run(function() {
  console.log("Congratulations! You won!");
  reader.close();
});
