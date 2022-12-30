// Bomb source
// 410 - 471 mod loader
// 738 - 782 onDocumentMouseDown

export const mazeCases = {
  '1': {
    CircleOne: 'Pos21',
    CircleTwo: 'Pos36',
    Maze: [
      [[1, 2], [1, 3], [2, 3], [1, 2], [1, 3], [3]],
      [[0, 2], [1, 2], [0, 3], [0, 1], [1, 3], [2, 3]],
      [[0, 2], [0, 1], [2, 3], [1, 2], [1, 3], [0, 2, 3]],
      [[0, 2], [1], [0, 1, 3], [0, 3], [1], [0, 2, 3]],
      [[0, 1, 2], [1, 3], [2, 3], [1, 2], [3], [0, 2]],
      [[0, 1], [3], [0, 1], [0, 3], [1], [0, 3]]
    ]
  },
  '2': {
    CircleOne: 'Pos25',
    CircleTwo: 'Pos42',
    Maze: [
      [[1], [1, 2, 3], [3], [1, 2], [1, 2, 3], [3]],
      [[1, 2], [0, 3], [1, 2], [0, 3], [0, 1], [2, 3]],
      [[0, 2], [1, 2], [0, 3], [1, 2], [1, 3], [0, 2, 3]],
      [[0, 1, 2], [0, 3], [1, 2], [0, 3], [2], [0, 2]],
      [[0, 2], [2], [0, 2], [1, 2], [0, 3], [0, 2]],
      [[0], [0, 1], [0, 3], [0, 1], [1, 3], [0, 3]]
    ]
  },
  '3': {
    CircleOne: 'Pos44',
    CircleTwo: 'Pos46',
    Maze: [
      [[1, 2], [1, 3], [2, 3], [2], [1, 2], [2, 3]],
      [[0], [2], [0, 2], [0, 1], [0, 3], [0, 2]],
      [[1, 2], [0, 2, 3], [0, 2], [0, 1, 2], [0, 2, 3], [0, 2]],
      [[0, 2], [0, 2], [0, 2], [0, 2], [0, 2], [0, 2]],
      [[0, 2], [0, 1], [0, 3], [0, 2], [0, 2], [0, 2]],
      [[0, 1], [1, 3], [1, 3], [0, 3], [0, 1], [0, 3]]
    ]
  },
  '4': {
    CircleOne: 'Pos11',
    CircleTwo: 'Pos41',
    Maze: [
      [[1, 2], [2, 3], [1], [1, 3], [1, 3], [2, 3]],
      [[0, 2], [0, 2], [1, 2], [1, 3], [1, 3], [0, 2, 3]],
      [[0, 2], [0, 1], [0, 3], [1, 2], [3], [0, 2]],
      [[0, 2], [1], [1, 3], [0, 1, 3], [1, 3], [0, 2, 3]],
      [[0, 1, 2], [1, 3], [1, 3], [1, 3], [2, 3], [0, 2]],
      [[0, 1], [1, 3], [3], [1], [0, 3], [0]]
    ]
  }
}

export const CreateCellCheck = array => {
  const newCell = {}
  newCell.GoUp = array.includes(0)
  newCell.GoRight = array.includes(1)
  newCell.GoDown = array.includes(2)
  newCell.GoLeft = array.includes(3)
  newCell.array = array
  return newCell
}
export const randomProperty = function(obj) {
  var keys = Object.keys(obj)
  return obj[keys[(keys.length * Math.random()) << 0]]
}

export function CanMove(position, mazeCase, desiredDirection) {
  const currentPositionRules = mazeCase[position[0] - 1][position[1] - 1]
  const positionRules = CreateCellCheck(currentPositionRules)
  return positionRules[desiredDirection]
}

//selectedMazeCase.Maze
