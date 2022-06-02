const path = require('path');
const { rollup } = require('rollup');

const referenceModule = require('../lib').default;

test('import_folder', async () => {
  const bundle = await rollup({
    input: path.join(__dirname, 'fixtures/import-folder.js'),

    plugins: [referenceModule()],
  });

  const { output } = await bundle.write({
    dir: path.join(__dirname, 'dist'),
    entryFileNames: '[name]-[hash].js',
    chunkFileNames: '[name]-[hash].js',
  });

  expect(output[0].code.length).toBeTruthy();
});
