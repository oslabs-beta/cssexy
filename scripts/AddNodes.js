
import {parse} from '@babel/parser';
// const traverse = await import('@babel/traverse').default;
import traverse from '@babel/traverse';
const traversed = traverse.default;
import generate from '@babel/generator';
import * as t from '@babel/types';

export default class ASTTransformPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ASTTransformPlugin', (compilation, callback) => {
        Object.keys(compilation.assets).forEach((filename) => {
            if (filename.endsWith('.js')) {
              const originalSource = compilation.assets[filename].source();
              const ast = parse(originalSource, { sourceType: 'module', plugins: ['jsx'] });
          // Traverse and modify the AST here
       
          traversed(ast, {
            CallExpression(path) {
               
              // Check if it's a call to document.createElement
              if (path.get('callee').isMemberExpression() &&
                  path.get('callee.object').isIdentifier({ name: 'document' }) &&
                  path.get('callee.property').isIdentifier({ name: 'createElement' })) {
                
                // After creating the element, set an attribute
                // Assuming the created element is stored or used directly
                const elementVar = path.parentPath.node.id || path.node;
                const setAttributeCall = t.expressionStatement(
                  t.callExpression(
                    t.memberExpression(
                      elementVar,
                      t.identifier('setAttribute')
                    ),
                    [t.stringLiteral('id'), t.stringLiteral('newElement')]
                  )
                );
                
                // Insert after the createElement line if it's a variable declaration
                // Otherwise, you might need to adjust where this is inserted based on your specific use case
                if (path.parentPath.isVariableDeclarator()) {
                  path.parentPath.parentPath.insertAfter(setAttributeCall);
                } else {
                  path.insertAfter(setAttributeCall);
                }
              }
            }
          });

          // Generate the modified code
          const { code } = generate(ast);
          compilation.assets[filename] = {
            source: () => code,
            size: () => code.length
          };
        }
      });
      callback();
    });
  }
}
