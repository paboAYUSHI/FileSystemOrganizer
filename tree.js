function treeFn(directoryPath){
    //console.log("Tree command implemented for ",directoryPath);
   // let destinationPath;
   if(directoryPath==undefined){
    //console.log("kindly enter the path");  
    //for making it GLOBAL
    process.cwd();
    treeHelper(process.cwd(),"");
    return;
   }else{
     let doesExist=fs.existsSync(directoryPath);
     if(doesExist){
            //2. create -> organized files -> directory
        treeHelper(directoryPath,"");
        }else{
            console.log("File already exists");
        }
        
     }
   }
function treeHelper(dirPath,indent){
    //is File or Folder
    //if File -> simply print
    //if Folder -> go inside, and search for more folders (if any) and print the content
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let fileName=path.basename(dirPath);
        console.log(indent+"---------- "+fileName);
    }else{
        let dirName=path.basename(dirPath);
        console.log(indent+"|------ "+dirName);
        let children=fs.readdirSync(dirPath);
        for(let i=0;i<children.length;i++){
           let childPath= path.join(dirPath,children[i]);
            treeHelper(childPath,indent+"\t");
        }
        
    }
}
module.exports={
    treeKey:treeFn
}