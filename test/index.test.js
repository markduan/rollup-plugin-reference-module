const path = require('path');
const { rollup } = require('rollup');

const referenceModule = require('../lib').default;

test('emit_expected_chunk', async () => {
  const bundle = await rollup({
    input: path.join(__dirname, 'fixtures/samples/index.js'),

    plugins: [referenceModule()],
  });

  const { output } = await bundle.write({
    dir: path.join(__dirname, 'dist'),
    entryFileNames: '[name]-[hash].js',
    chunkFileNames: '[name]-[hash].js',
  });

  expect(output[0].code.length).toBeTruthy();
});

test('import_same_reference_module_multiple_times', async () => {
  const bundle = await rollup({
    input: path.join(__dirname, 'fixtures/import-multiple-times.js'),

    plugins: [referenceModule()],
  });

  const { output } = await bundle.write({
    dir: path.join(__dirname, 'dist'),
    entryFileNames: '[name]-[hash].js',
    chunkFileNames: '[name]-[hash].js',
  });

  expect(output[0].code.length).toBeTruthy();
});

test('import_node_module', async () => {
  const bundle = await rollup({
    input: path.join(__dirname, 'fixtures/import-node-module.js'),

    plugins: [referenceModule()],
  });

  const { output } = await bundle.write({
    dir: path.join(__dirname, 'dist'),
    entryFileNames: '[name]-[hash].js',
    chunkFileNames: '[name]-[hash].js',
  });

  expect(output[0].code.length).toBeTruthy();
});
