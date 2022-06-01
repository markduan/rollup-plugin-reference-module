import type { Plugin } from 'rollup';
import loadReferenceModule from './load-reference-module';
import resolveReferenceModule from './resolve-reference-module';

const defaultOptions: RollupPluginReferenceModuleOptions = {
  pattern: /REF:(.+)/,
  extensions: ['js'],
  outputOptions: {
    format: 'iife',
  },
};

function referenceModulePlugin(options?: Partial<RollupPluginReferenceModuleOptions>): Plugin {
  const state: State = {
    idMap: new Map<string, { outputName: string; target: string }>(),
    options: Object.assign({}, defaultOptions, options),
    plugins: [],
  };

  return {
    name: 'rollup-plugin-reference-module',

    options(options) {
      state.plugins = (options.plugins || []).filter((p): p is Plugin => !!p);

      return null;
    },

    resolveId(source, importer) {
      return resolveReferenceModule(state, source, importer);
    },

    load: function (id: string) {
      if (id?.startsWith('\0rollup-plugin-reference-module')) {
        const referenceID = this.emitFile({
          type: 'chunk',
          id: id.split(':').pop() || '',
        });

        console.log('referenceID', referenceID)
        return `export default import.meta.ROLLUP_FILE_URL_${referenceID};`;
      }

      return null;
      // return loadReferenceModule(state, this.addWatchFile, id);
    },

    generateBundle(options, bundle, isWrite) {
      state.idMap.forEach(({ outputChunk }, id) => {
        if (outputChunk) {
          // bundle[id] = outputChunk;
        }
      });
    },
  };
}

export default referenceModulePlugin;
