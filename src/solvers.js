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
  }

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

  var nextMove = function(r, c, solution) {
    var solution = solution || new Board({n: n});
    // make next move
    solution.rows()[r][c] = 1;
    // check if choice creates a conflict...
    if (solution.hasAnyRooksConflicts()) {
      // if so, revert choice
      solution.rows()[r][c] = 0;
    } else {
      // if not, make nextMove (try children) <- I want to just continue the loops here (which will invoke nextMove)
      var nextC = c + 1;
      if (nextC === n) {
        var nextR = r + 1;
        if (nextR === n) {
          solutionCount++;
        } else {
          nextC = 0;
          nextMove(nextR, nextC, solution);
        }
      } else {
        nextMove(r, nextC, solution);
      }
      // revert choice to continue trying branches (try siblings)
      solution.rows()[r][c] = 0;
    }
  }

  // loop through rows
  for (var r = 0; r < n; r++) {
    // loop through columns
    for (var c = 0; c < n; c++) {
      nextMove(r, c);
    }
  }


  
  
  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of
// them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
