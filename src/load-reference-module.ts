import { LoadResult, rollup, RollupOptions } from 'rollup';

const loadReferenceModule = (
  state: State,
  addWatchFile: (dep: string) => void,
  id: string,
): Promise<LoadResult> => {
  const referencedModule = state.idMap.get(id);
  if (!referencedModule) {
    return Promise.resolve(null);
  }

  const { target } = referencedModule;

  const options: RollupOptions = {
    input: target,
    plugins: state.plugins,
  };

  return rollup(options)
    .then((bundle) => {
      return bundle.generate(state.options.outputOptions);
    })
    .then(({ output }) => {
      const chunk = output[0];
      if (!chunk) {
        return null;
      }

      Object.keys(chunk.modules).forEach((dep) => {
        addWatchFile(dep);
      });

      referencedModule.outputChunk = chunk;

      return 'some_path_relative_to_importer';
    })
    .catch(() => {
      return null;
    });
};

export default loadReferenceModule;
