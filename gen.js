const {createCorpus}=require("ksana-corpus-builder");
const fs=require("fs");
const sourcepath="xml/";
var files=fs.readFileSync("./file.lst","utf8").split(/\r?\n/);
//for (var i=0;i<24;i++) files.shift();
//files.length=5;

const bookStart=function(){}
const bookEnd=function(){}
const fileStart=function(fn,i){
	const at=fn.lastIndexOf("/");
	console.log(fn)
	fn=fn.substr(at+1);
	fn=fn.substr(0,fn.length-4);//remove .xml
	var kpos=this.kPos;
	if (this.kPos) kpos=this.nextLineStart(this.kPos); //this.kPos point to last char of previos file
	this.putField("file",fn,kpos);
}
var options={name:"taixu",inputFormat:"accelon3",
article:"文",subTree:"文",
bitPat:"taixu",
autoStart:true,textOnly:true}; //set textOnly not to build inverted

var corpus=createCorpus(options);
corpus.setHandlers(
	{},
	{},
	{bookStart,bookEnd,fileStart}  
);

files.forEach(fn=>corpus.addFile(sourcepath+fn));

corpus.writeKDB("taixu.cor",function(byteswritten){
	console.log(byteswritten,"bytes written")
});

//console.log("Max Article Length",maxArticle())


console.log(corpus.totalPosting,corpus.tPos);