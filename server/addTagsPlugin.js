import  {parse} from '@babel/parser';
import traverse  from '@babel/traverse';
import  generate from '@babel/generator';
import  t from '@babel/types';

export default class AddTagsPlugin {
    constructor(){
        this.metaDataMap = {};
    }
    apply(compiler){

        compiler.hooks.compilation.tap('AddTagsPlugin', (compilation) => {
            compilation.hooks.buildModule.tap('AddTagsPlugin', (module) => {
                // console.log(module._source, module.resource)
                if(!module._source) return;
                const originalSource = module._source._value;
                const filename = module.resource;
                console.log(originalSource,filename)

                const ast = parse(originalSource, {
                    sourceType: 'module',
                    plugins: ['jsx']
                });
                traverse(ast, {
                    enter: (path) => {
                        console.log(path)
                        if(path.isCallExpression() && path.get('callee').isMemberExpression() && path.node.callee.object.name === 'document'
                    && path.node.calee.property.name === 'createElement'){
                        console.log("Line 27 AddTagsPlugin")
                        const newAttr = t.callExpression(
                            t.memberExpression(path.node, t.identifier('setAttribute')),
                            [t.stringLiteral('data-source-file'), t.stringLiteral(filename)]
                        );
                        path.insertAfter(newAttr);
                    }
                    }
                });
                const output = generate(ast);
                module._source._value = output.code;
                this.metaDataMap[filename] = output.code;
            });
            compilation.hooks.additionalAssets.tapAsync('AddMetaTagsPlugin', (callback) => {
                const content = JSON.stringify(this.metaDataMap, null, 2);
                compilation.assets['metaDataMap.json'] = {
                  source: () => content,
                  size: () => content.length
                };
                callback();
              });
        })
     
    }
  
}

