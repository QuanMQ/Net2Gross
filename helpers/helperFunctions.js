export function insertComma(numStr) {
  if (numStr && numStr.length > 3) {
    const numArr = numStr
      .split("")
      .filter((num) => num !== ",")
      .reverse();
    const newArr = [];
    let counter = 0;
    numArr.forEach((digit, index, arr) => {
      counter++;
      newArr.push(digit);
      if (counter === 3 && arr[index + 1]) {
        newArr.push(",");
        counter = 0;
      }
    });
    const result = newArr.reverse().join("");
    return result;
  } else {
    return numStr;
  }
}