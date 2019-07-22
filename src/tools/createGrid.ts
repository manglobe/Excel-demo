const createEmptyGrid = (x: number, y: number, item: any) =>
  Array(y)
    .fill("")
    .map(() =>
      Array(x)
        .fill("")
        .map(() => item)
    );
export default createEmptyGrid;
