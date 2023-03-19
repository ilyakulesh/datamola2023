function add(a, b) {
  if (arguments.length === 2) {
    return a + b;
  } else if (arguments.length === 1) {
    return (val) => val + a;
  }
}

function sub(a, b) {
  if (arguments.length === 2) {
    return a - b;
  } else if (arguments.length === 1) {
    return (val) => val - a;
  }
}

function mul(a, b) {
  if (arguments.length === 2) {
    return a * b;
  } else if (arguments.length === 1) {
    return (val) => val * a;
  }
}

function div(a, b) {
  if (arguments.length === 2) {
    return a / b;
  } else if (arguments.length === 1) {
    return (val) => val / a;
  }
}

const pipe =
  (...fns) =>
  (arg) =>
    fns.reduce((result, fn) => {
      return fn(result);
    }, arg);

const a = add(1, 2); // 3
console.log(a);

const b = mul(a, 10); // 30
console.log(b);

const sub1 = (arg1) => sub(arg1, 1);
const c = sub1(b); // 29
console.log(c);

const d = mul(sub(a, 1))(c); // 58
console.log(d);

const doSmth = pipe(add(d), sub(c), mul(b), div(a));
const result = doSmth(0); // (((0 + 58) - 29) * 30) / 3 = 290
console.log(result);

const x = pipe(add(1), mul(2))(3); // 8
console.log(x);
