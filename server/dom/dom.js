import express from 'express';

export const domRouter = express.Router();


domRouter.use((req, res, next)=>{
    function getChildren(node){
        console.log("Document Object Model=====>", node)
        node.childNodes.forEach((child)=>{
            getChildren(child)
        })
    }
    getChildren(req.body)
  
    res.send("Received Dom")
})
export class Dom {
   
    constructor(domTree){
        this.domTree = domTree;
    }

}