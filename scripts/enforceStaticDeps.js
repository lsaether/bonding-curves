const test = (dep) => {
  Object.keys(dep).forEach((key) => {
    if (dep[key].startsWith('^')) {
      throw `${key} has inexact dependency, please make it static`;
    }
  })
}

(() => {
  const { dependencies, devDependencies } = require('../package.json');
  test(dependencies);
  test(devDependencies);
})();
