function organizeFn(directoryPath){
    // console.log("Organize command implemented for ",directoryPath);
    //1. input -> directory path given
    let destinationPath;
    if(directoryPath==undefined){
     destinationPath= process.cwd();
     //console.log("kindly enter the path"); -->making global by adding the line above, thats why commented this one
     return;
    }else{
      let doesExist=fs.existsSync(directoryPath);
      if(doesExist){
             //2. create -> organized files -> directory
         destinationPath=path.join(directoryPath,"organized_files");
         if(fs.existsSync(destinationPath)==false){
             fs.mkdirSync(destinationPath);
         }else{
             console.log("File already exists");
         }
         
      }
    }
    organizedHelper(directoryPath,destinationPath);
    
    //3. identify categories of all the files present in that input directory ->
    //4. copy / cut files to that organized directory inside of any of category folder
 }
 function organizedHelper(directoryPath,destinationPath){
         // we need to read (basically know all the extensions) all the files from the directory (I have taken downloads)
         let childName=fs.readdirSync(directoryPath);
         //console.log(childName);
         for(let i=0;i<childName.length;i++){
             let childAddress = path.join(directoryPath,childName[i]);
            let isFile= fs.lstatSync(childAddress).isFile();
            if(isFile){
             //console.log(childName[i]);
            let category= getCategory(childName[i]);
            console.log(childName[i],"belongs to --> ",category);
             //4. copy / cut files to that organized directory inside of any of category folder
             sendFiles(childAddress,destinationPath,category);
            }
         }
         
         
 }
 function getCategory(name){
     let ext=path.extname(name);
     ext=ext.slice(1);
     for(let type in types){
         let cTypeArray=types[type];
         for(let i=0;i<cTypeArray.length;i++){
             if(ext==cTypeArray[i]){
                 return type;
             }
         }
     }
     return "others";
 }
 function sendFiles(srcFilePath,dest,category){
     let categoryPath= path.join(dest,category);
     if(fs.existsSync(categoryPath)==false){
         fs.mkdirSync(categoryPath);
     }
     // let fileName=path.join(srcFilePath,category);
     let fileName=path.basename(srcFilePath);
 
     let destFilePath=path.join(categoryPath,fileName);
     fs.copyFileSync(srcFilePath,destFilePath);
     //fs.unlinkSync(srcFilePath); ---> this will move all your data from source to the destination folder, and the whole content from the source will be removed/moved
     console.log(fileName, " copied to ", category);
 }
module.exports={
    organizeKey:organizeFn
} 