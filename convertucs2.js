const fs=require("fs");
const files=fs.readFileSync("file.lst","utf8").split(/\r?\n/)
const sourcepath="accelon3/";
const targetpath="genxml/";

const convert=function(fn){
	var content=fs.readFileSync(sourcepath+fn,"ucs2");
	content=content.replace(/\r?\n/g,"\n");
	fs.writeFileSync(targetpath+fn,content,"utf8");
}
files.forEach(convert);
