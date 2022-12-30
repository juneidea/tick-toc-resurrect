import {red, white, yellow, blue, black, gray} from './util'

export const wireCount = ['3', '4', '5', '6']

export const wireCountCases = {
  '3': [
    {
      colors: [red, white, blue],
      correct: 2
    },
    {
      colors: [red, blue, red],
      correct: 2
    },
    {
      colors: [white, white, blue],
      correct: 1
    },
    {
      colors: [blue, blue, red],
      correct: 1
    },
    {
      colors: [blue, white, white],
      correct: 1
    },
    {
      colors: [blue, red, white],
      correct: 2
    }
  ],
  '4': [
    {
      colors: [white, white, blue, yellow],
      correct: 0
    },
    {
      colors: [red, yellow, blue, red],
      correct: 0
    },
    {
      colors: [yellow, black, yellow, red],
      correct: 3
    },
    {
      colors: [red, black, yellow, red],
      correct: 1
    }
  ],
  '5': [
    {
      colors: [white, yellow, blue, yellow, red],
      correct: 0
    },
    {
      colors: [red, red, yellow, blue, red],
      correct: 1
    },
    {
      colors: [black, red, yellow, blue, red],
      correct: 0
    }
  ],
  '6': [
    {
      colors: [white, red, blue, white, yellow, gray],
      correct: 0
    },
    {
      colors: [white, yellow, blue, yellow, white, gray],
      correct: 5
    },
    {
      colors: [red, yellow, red, yellow, white, gray],
      correct: 3
    }
  ]
}
