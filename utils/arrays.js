export const isArrayUnique = (arr) => {
  let unique = []
  for (let i = 0; i < arr.length; i++) {
    if (!unique.includes(arr[i])) {
      unique.push(arr[i])
    }
  }
  return unique.length == arr.length
}
