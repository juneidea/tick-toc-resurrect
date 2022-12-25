export const generateRandomIndex = number => {
  if (typeof number !== 'number') parseInt(number)
  return Math.floor(Math.random() * number)
}

export const sortByKey = (a, b, key) => {
  if (a[key] < b[key]) return -1
  else if (a[key] > b[key]) return 1
  else return 0
}

export const calcSingleGameTime = time => {
  const minute = Math.floor(time / 60)
  const seconds = time % 60
  const tenSecond = Math.floor((seconds % 60) / 10)
  const singleSecond = seconds % 10
  return `${minute}:${tenSecond}${singleSecond}`
}
