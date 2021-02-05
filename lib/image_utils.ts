// find closest resized element
export default function findClosestSize(width: number, list: number[]) {
  return list.reduce((prev: number, curr: number) => {
    const prevDiff = Math.abs(prev - width);
    const currDiff = Math.abs(curr - width);

    if (prevDiff == currDiff) {
      return prev > curr ? prev : curr;
    } else {
      return currDiff < prevDiff ? curr : prev;
    }
  });
}
