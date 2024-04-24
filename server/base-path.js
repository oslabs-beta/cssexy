
import fs, { readFileSync, writeFileSync } from 'node:fs'
export default function (source) {
 



//convert file to an array with \r\n
const routerFile = fs.readFileSync(this.resourcePath, 'utf-8').split('\n')

 const sourceArray = routerFile.map((line, i)=>{
   
    if(line.match(/<Router/)){
        return line = `<Router basename = '/app' >`
       
        }else{
            return line;
        }
})
//turn back to string
const sourceFile = sourceArray.join('\n')


//send back to file
return `${sourceFile}`;
}