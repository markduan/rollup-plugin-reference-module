const path = require('path');
const { rollup } = require('rollup');

const referenceModule = require('../lib').default;

test('multiple_inputs', async () => {
  const bundle = await rollup({
    input: {
      multipleTimes: path.join(__dirname, 'fixtures/import-multiple-times.js'),
      inputInput: path.join(__dirname, 'fixtures/samples/index.js'),
    },

    plugins: [referenceModule()],
  });

  const { output } = await bundle.write({
    dir: path.join(__dirname, 'dist'),
    entryFileNames: '[name]-[hash].js',
    chunkFileNames: '[name]-[hash].js',
  });

  expect(output[0].code.length).toBeTruthy();
});
