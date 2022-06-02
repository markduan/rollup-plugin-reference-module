function someModuleInC() {
  import('./d').then((d) => d());
  console.log('hello world in module C');
}

export default someModuleInC;
