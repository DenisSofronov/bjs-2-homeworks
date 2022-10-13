function compareArrays(arr1, arr2) {
  let result;
  result = arr1.length === arr2.length && arr1.every((v,i)=>v === arr2[i])

  return result; // boolean
}

function advancedFilter(arr) {
  let resultArr;
  resultArr = arr
    .filter((number) => number > 0)
    .filter((number) => number % 3 === 0)
    .map((number) => number * 10);

  return resultArr; // array
}
