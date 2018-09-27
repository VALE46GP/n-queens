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

  var nextMove = (r = 0, c = 0, solution = new Board({n: n}), rookCount = 0) => {
    //debugger
    var solutionCount = 0;
    var rows = solution.rows();
    
    // loop through rows
    for (; r < n; r++) {

      // loop through columns
      for (; c < n; c++) {
        // make move
        rows[r][c] = 1;
        rookCount++;

        // if there is NOT a conflict...
        if (!solution.hasAnyRooksConflicts()) {
          if (rookCount === n) {
            return solutionCount + 1;
          }
          // if at end of grid...
          if (r === n - 1 && c === n - 1) {
            return solutionCount;
          }
          // try children
          solutionCount += nextMove(r, c + 1, solution, rookCount); //come back here   //could add depthCount
        }
        // if conflict, revert move to continue trying branches (try siblings)
        rows[r][c] = 0;
        rookCount--;
      }
      // if at end of grid...
      if (r === n - 1 && c === n - 1) {
        return solutionCount;
      }
      c = 0;
    }
    return solutionCount;
    // if (rookCount === n) {
    //   return solutionCount + 1;
    // }
  };
  solutionCount += nextMove();


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;






// window.countNRooksSolutions = function(n) {
//   var solutionCount = 0;

//   var nextMove = (r = 0, c = 0, solution = new Board({n: n}), rookCount = 0) => {
//     //debugger
//     var solutionCount = 0;
//     var rows = solution.rows();
    
//     // loop through rows
//     for (; r < n; r++) {

//       // check if at end of board
//       if (c === n) {
//         c = 0;
//         r++;
//         if (r >= n) {
//           if (rookCount === n) {
//             solutionCount++;
//           }
//           return solutionCount;
//         }
//       }

//       // loop through columns
//       for (; c < n; c++) {
//         // make move
//         rows[r][c] = 1;

//         // if there is NOT a conflict...
//         if (!solution.hasAnyRooksConflicts()) {
//           // // if at end of grid...
//           // if (c === n - 1 && r === n - 1 && rookCount === n) {
//           //   solutionCount++;
//           // }
//           // try children
          


//           solutionCount += nextMove(r, c + 1, solution, rookCount + 1); //come back here   //could add depthCount
//         }
//         // if conflict, revert move to continue trying branches (try siblings)
//         rows[r][c] = 0;
//       }
//     }
//     return solutionCount;
//   };
//   solutionCount += nextMove();


//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
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
