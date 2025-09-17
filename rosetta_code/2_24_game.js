function solve24(numStr) {
  const digits = numStr.split("").map(Number);
  const ops = ["+", "-", "*", "/"];

  function permutate(arr) {
    if (arr.length === 1) return [arr];
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = arr.slice(0, i).concat(arr.slice(i + 1));
      for (let p of permutate(rest)) {
        result.push([arr[i], ...p]);
      }
    }
    return result;
  }
  function is24(value) {
    return Math.abs(value - 24) < 1e-6;
  }
  function findExpressions(a, b, c, d) {
    const expressions = [];
    expressions.push(`((${a}${op1}${b})${op2}${c})${op3}${d}`);
    expressions.push(`((${a}${op1}${b})${op2}${c}${op3}${d})`);
    expressions.push(`(${a}${op1}${b})${op2}(${c}${op3}${d})`);
    expressions.push(`(${a}${op1}${b}${op2}(${c}${op3}${d}))`);
    expressions.push(`${a}${op1}(${b}${op2}(${c}${op3}${d}))`);
    return expressions;
  }

  const perms = permutate(digits);

  for (let [a, b, c, d] of perms) {
    for (var op1 of ops) {
      for (var op2 of ops) {
        for (var op3 of ops) {
          const expressions = findExpressions(a, b, c, d);
          for (let expr of expressions) {
              if (is24(eval(expr))) {
                return expr;
              }
          }
        }
      }
    }
  }

  return "no solution exists";
}