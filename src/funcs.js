const obj = {};

function func1 () {
  obj.func2 && console.log('111');
  return 'func';
}

function func2 () {
  obj.func2 = true; // 副作用，对摇树优化不友好
  return 'func2';
}

function func3 () {
  return 'func3';
}

export {
  func1,
  func2,
  func3
};
