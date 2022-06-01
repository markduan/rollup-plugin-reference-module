const path = require('path');
const { rollup } = require('rollup');
const referenceModule = require('../lib').default;

test('normal', async () => {
  const bundle = await rollup({
    input: path.join(__dirname, 'fixtures/samples/index.js'),

    plugins: [referenceModule({
      // outputOptions: {
      //   format: 'system',
      //   entryFileNames: '[name]-[hash].js',
      // }
    })]
  });

  const { output } = await bundle.write({
    dir: path.join(__dirname, 'dist'),
    // format: 'system',
    entryFileNames: '[name]-[hash].js',
    chunkFileNames: '[name]-[hash].js',
  })

  console.log(output[0].code.length)
  // expect(bundle).toBe(true);
})
