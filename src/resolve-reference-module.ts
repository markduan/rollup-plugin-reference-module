import path from 'path';

function resolveModule(name: string, paths: string[], extensions: string[]): string | null {
  const testNames = [
    name,
    ...extensions.map((extension) =>
      extension.startsWith('.') ? `${name}${extension}` : `${name}.${extension}`,
    ),
  ];

  for (const request of testNames) {
    try {
      return require.resolve(request, { paths });
    } catch (e) {
      // empty
    }
  }

  return null;
}

const resolveReferenceModule = (state: State, source: string, importer?: string): string | null => {
  const match = source.match(state.options.pattern);
  if (!match) {
    return null;
  }

  const [, name] = match;
  let target: null | string = name;
  if (importer) {
    const paths = require.resolve.paths(importer) || [];
    paths.push(path.dirname(importer));
    target = resolveModule(name, paths, state.options.extensions);
  }

  if (!target) {
    return null;
  }

  const moduleID = `\0rollup-plugin-reference-module::module:${target}`;
  const outputName = `reference-module-${path.basename(target, path.extname(target))}.js`;
  state.idMap.set(moduleID, { outputName, target });

  return moduleID;
};

export default resolveReferenceModule;
