class TestPlugin {
    apply(compiler) {
      compiler.hooks.compilation.tap('TestPlugin', (compilation) => {
        compilation.hooks.buildModule.tap('TestPlugin', (module) => {
          console.log('Module being processed:', module.resource); // Log the path to see if modules are being caught
        });
      });
    }
  }

  module.exports = TestPlugin;


 