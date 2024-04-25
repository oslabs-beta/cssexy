
import fs, { readFileSync, writeFileSync } from 'node:fs'
export default function (source) {
 
    //If needed Use this to set the Loader in Webpack Config.js
// configModule.module.rules.push({
//   test: /\.jsx/,
//   loader: path.resolve(import.meta.dirname,'./base-path.js'),
// });


//convert file to an array with \r\n
const routerFile = fs.readFileSync(this.resourcePath, 'utf-8').split('\n')

 const sourceArray = routerFile.map((line, i)=>{
   
    if(line.match(/<Router/)){
        return line = `<Router basename = '/app' >`
       
        }else if(line.match(/<BrowserRouter/)){
        return line = `<BrowserRouter basename = '/app' >`
        }else{
            return line;
        }
})
//turn back to string
const sourceFile = sourceArray.join('\n')


//send back to file
return `${sourceFile}`;
}