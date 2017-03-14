var createCorpus=null
try {
	createCorpus=require("ksana-corpus-builder").createCorpus;
} catch(e){
	createCorpus=require("ksana-corpus-lib").createCorpus;
}
const fs=require("fs");
const sourcepath="xml/";
var files=fs.readFileSync("./file.lst","utf8").split(/\r?\n/);
//for (var i=0;i<24;i++) files.shift();
//files.length=5;

var composes=["第零編"],categories=[], groupid;

const on_compose=function(tag,closing,kpos,tpos,start,end){
	if (closing){
		const compose=this.substring(start,end);
		composes.push(compose);		
	}
}

const on_category=function(tag,closing,kpos,tpos,start,end){
	if (closing){
		const cat=this.substring(start,end);
		this.putGroup(groupid+";"+(composes.length-1)+"@"+cat,kpos,tpos);		
	}
}

const bookStart=function(){}
const bookEnd=function(){}
const fileStart=function(fn,i){
	const at=fn.lastIndexOf("/");
	console.log(fn)
	fn=fn.substr(at+1);
	groupid=fn.substr(0,fn.length-4);//remove .xml
}

var options={name:"taixu",inputFormat:"accelon3",
article:"文",
toc:"文",
bitPat:"taixu",
groupPrefix:composes,
articleFields:["head","ptr","def","p"],
title:"太虛大師全書",
autoStart:true}; //set textOnly not to build inverted

var corpus=createCorpus(options);
corpus.setHandlers(
	{"類":on_category,"編":on_compose},
	{"類":on_category,"編":on_compose},
	{bookStart,bookEnd,fileStart}  
);
console.time("build")
files.forEach(fn=>corpus.addFile(sourcepath+fn));

corpus.writeKDB("taixu.cor",function(byteswritten){
	console.log(byteswritten,"bytes written")
});

//console.log("Max Article Length",maxArticle())

console.timeEnd("build")
console.log(corpus.totalPosting,corpus.tPos);