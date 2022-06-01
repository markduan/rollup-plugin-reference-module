import someModuleInC from './c';

function someModuleInB() {
  console.log('hello world in module B')
  someModuleInC();
}

someModuleInB()
