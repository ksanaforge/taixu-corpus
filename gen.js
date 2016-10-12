const {createCorpus}=require("ksana-corpus-builder");
const fs=require("fs");
const sourcepath="xml/";
var files=fs.readFileSync("./file.lst","utf8").split(/\r?\n/);
//for (var i=0;i<24;i++) files.shift();
//files.length=2;

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
var options={name:"taixu",inputFormat:"xml",bitPat:"taixu",
autostart:true,textOnly:true}; //set textOnly not to build inverted

const {文,頁,maxArticle}=require("./format");
const toc=require("./toc");
const div=require("./div");
const note=require("./note");

const openhandlers=Object.assign({文,頁},div,toc,note);
const closehandlers=Object.assign({文},div,toc,note);

var corpus=createCorpus(options);
corpus.setHandlers(
	openhandlers,
	closehandlers,
	{bookStart,bookEnd,fileStart}  
);

files.forEach(fn=>corpus.addFile(sourcepath+fn));

corpus.writeKDB("taixu.cor",function(byteswritten){
	console.log(byteswritten,"bytes written")
});

console.log("Max Article Length",maxArticle())


console.log(corpus.totalPosting,corpus.tPos);