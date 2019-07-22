type OperatorFuncs = (a: number | string, b: number | string) => number;

type Operator = "+" | "-" | "*" | "/" | "%" | "^";

const operatorFunctions: {
  "+": OperatorFuncs;
  "-": OperatorFuncs;
  "*": OperatorFuncs;
  "/": OperatorFuncs;
  "%": OperatorFuncs;
  "^": OperatorFuncs;
} = {
  "+": (a, b) => Number(a) + Number(b),
  "-": (a, b) => Number(a) - Number(b),
  "*": (a, b) => Number(a) * Number(b),
  "/": (a, b) => Number(a) / Number(b),
  "%": (a, b) => Number(a) % Number(b),
  "^": (a, b) => Math.pow(Number(a), Number(b))
};

/**
 * @description 字符串计算
 */
function evalStr(str: string) {
  const afterExpressArr = translateMidExpress2AfterExpressArr(str);
  const stack = new Stack([]);
  let i = 0;
  let length = afterExpressArr.length;
  while (i < length) {
    const currentWord = afterExpressArr[i];
    const currentType = checkWordType(currentWord);
    if (currentType === "number") {
      stack.push(currentWord);
    } else {
      let top = stack.pop();
      let top2 = stack.pop();
      const result = operatorFunctions[currentWord as Operator](top2, top);
      stack.push(result);
    }
    i++;
  }
  return stack.top || "";
}

/**
 * @description 转换中缀表达式为后缀表达式
 */
function translateMidExpress2AfterExpressArr(str: string): string[] {
  let arr = str.match(/((\d|\.)+|[^\d|\s])/g);
  if (arr === null) {
    return [];
  }
  let i = 0;
  let length = arr.length;
  const stack = new Stack([]);
  let afterExpressArr = [];

  while (i < length) {
    const currentWord = arr[i];
    switch (checkWordType(currentWord)) {
      case "number":
        afterExpressArr.push(currentWord);
        break;
      case "leftParentheses":
        stack.push("(");
        break;
      case "rightParentheses":
        while (stack.top !== "(") {
          const poped = stack.pop();
          afterExpressArr.push(poped);
        }
        stack.pop();
        break;
      case "operator":
        let stackTop = stack.top;
        if (stackTop === "(" || stack.length === 0) {
          stack.push(currentWord);
        } else {
          stack
            .popUntil(
              stackOperator =>
                isHigherPriority(currentWord, stackOperator) ||
                stackOperator === "("
            )
            .forEach(operator => afterExpressArr.push(operator));
          stack.push(currentWord);
        }
        break;
    }
    i++;
  }
  while (stack.length) {
    afterExpressArr.push(stack.pop());
  }
  return afterExpressArr;
}

function checkWordType(str: string): string {
  if (str === "(") {
    return "leftParentheses";
  }
  if (str === ")") {
    return "rightParentheses";
  }
  if (/^(\d|\.)+$/.test(str)) {
    return "number";
  }
  if (/^(\+|-|\*|\/|%|\^)$/.test(str)) {
    return "operator";
  }
  throw new Error("Error, Unknown Symbols: " + str);
}

const priorityMap = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "%": 2,
  "^": 3
};
function isHigherPriority(a: string, b: string): boolean {
  if (!priorityMap.hasOwnProperty(a) || !priorityMap.hasOwnProperty(b)) {
    return false;
  }
  if (priorityMap[a as Operator] > priorityMap[b as Operator]) {
    return true;
  } else {
    return false;
  }
}

class Stack {
  stack: any[];
  constructor(arr: any[]) {
    this.stack = arr;
  }
  get top() {
    const { stack } = this;
    return stack[stack.length - 1];
  }
  get length() {
    const { stack } = this;
    return stack.length;
  }
  get native() {
    const { stack } = this;
    return stack;
  }
  push = (...args: any[]) => this.stack.push.call(this.stack, ...args);
  pop = () => this.stack.pop.call(this.stack);
  get = (number: number) => this.stack[number];
  popUntil = (func: (top: any) => boolean) => {
    let poped = [];
    const { stack } = this;
    while (stack.length) {
      if (!func(this.top)) {
        poped.push(stack.pop());
      } else {
        break;
      }
    }
    return poped;
  };
}
export default evalStr;
