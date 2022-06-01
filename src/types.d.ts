interface RollupPluginReferenceModuleOptions {
  pattern: RegEx;
  extensions: string[];
  outputOptions: import('rollup').OutputOptions;
}

interface ReferencedModule {
  outputName: string;
  target: string;
  outputChunk?: import('rollup').OutputChunk;
}

interface State {
  idMap: Map<string, ReferencedModule>;
  options: RollupPluginReferenceModuleOptions;
  plugins: import('rollup').Plugin[];
}
