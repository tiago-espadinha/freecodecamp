function getFinalOpenedDoors(numDoors) {
  let arr = Array(numDoors).fill(false);
  for (let i = 1; i <= numDoors; i++) {
    for (let j = i - 1; j < numDoors; j = j + i) {
      arr[j] = !arr[j];
    }
  }
  const result = arr
    .map((value, index) => (value ? index + 1 : null))
    .filter((value) => value);
  return result;
}
