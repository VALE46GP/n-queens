/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n 
// rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});

  var nextMove = function(r, c) {
    // make next move
    solution.rows()[r][c] = 1;
    // checks if choice creates conflict
    if (solution.hasAnyRooksConflicts()) {
      // revert choice if conflict is created
      solution.rows()[r][c] = 0;
    } 
  };

  // loop through rows
  for (var r = 0; r < n; r++) {
    // loop through columns
    for (var c = 0; c < n; c++) {
      nextMove(r, c);
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, 
// with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  if (n === 1) {
    return 1;
  }

  var nextMove = (r) => {
    var solutionCount = 0;
    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c);
      // if NO conflict...
      if (!board.hasAnyRooksConflicts()) {
        // if at end...
        if (r === n - 1) {
          board.togglePiece(r, c);
          return solutionCount + 1;
        }
        solutionCount += nextMove(r + 1);
        board.togglePiece(r, c);
      } else {
        board.togglePiece(r, c);
      }
    }
    return solutionCount;
  };

  solutionCount += nextMove(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of
// them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  var queens = 0;
  var starterC = 0;
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [[1]];
  }

  var nextMove = (r) => {
    var solutionCount = 0;
    for (var c = 0; c < n; c++) {
      // TOGGLE
      if (board.rows(r, c) === 0) {
        queens++;
      } else {
        queens--;
      }
      board.togglePiece(r, c);

      // if NO conflict...
      if (!board.hasAnyQueensConflicts()) {
        // if at end...
        if (r === n - 1) {
          if (queens = n) {
            return board.rows();
          }
          // TOGGLE
          if (board.rows(r, c) === 0) {
            queens++;
          } else {
            queens--;
          }
          board.togglePiece(r, c);
          return solutionCount + 1;
        }
        solutionCount += nextMove(r + 1);
        // TOGGLE
        if (board.rows(r, c) === 0) {
          queens++;
        } else {
          queens--;
        }
        board.togglePiece(r, c);
      } else {
        // TOGGLE
        if (board.rows(r, c) === 0) {
          queens++;
        } else {
          queens--;
        }
        board.togglePiece(r, c);
      }
    }
    return solutionCount;
  };


  
  

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));
  return nextMove(0);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  if (n === 0 || n === 1) {
    return 1;
  } else if (n === 2 || n === 3) {
    return 0;
  }

  var nextMove = (r) => {
    var solutionCount = 0;
    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c);
      // if NO conflict...
      if (!board.hasAnyQueensConflicts()) {
        // if at end...
        if (r === n - 1) {
          board.togglePiece(r, c);
          return solutionCount + 1;
        }
        solutionCount += nextMove(r + 1);
        board.togglePiece(r, c);
      } else {
        board.togglePiece(r, c);
      }
    }
    return solutionCount;
  };

  solutionCount += nextMove(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
