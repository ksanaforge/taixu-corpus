var page,prevpage=0,pageKPos=0;
const 頁=function(tag,closing){
	const s=this.popBaseText();
	if (s) {
		const lines=s.trim().split("\n");

		for (var i=0;i<lines.length;i++) {
			const kpos=this.makeKPos(this.bookCount-1,prevpage-1,i,0);
			if (kpos==-1) {
				console.log("error kpos",this.bookCount-1,prevpage-1,i);
			}
			try{
				this.newLine(kpos, this.tPos);	
			} catch(e) {
				debugger;
				console.log(e)
			}
			
			this.putLine(lines[i]);
		}
	}


	const n=tag.attributes.id;
	if (!n || n.indexOf("p")==-1){
		return;
	}
	var pbn=n.split("p");
	page=parseInt(pbn[1],10);

	if (page===1) {
		this.addBook();
	} else if (page!==prevpage+1) {//newpage
		debugger;
		throw "wrong page number "+page+", prev:"+prevpage;		
	}
	prevpage=page;
	pageKPos=this.makeKPos(this.bookCount-1,page,0,0);
}
var maxarticlelen=0, prevtpos=0;
const 文=function(tag,closing){
	if (closing) {
		const caption=this.popText();
		this.putField("artical",caption,this.wenPos);
	} else {
		const tree=tag.attributes.t;
		this.wenPos=this.kPos;
		if (this.tPos-prevtpos>maxarticlelen) maxarticlelen=this.tPos-prevtpos;
		prevtpos=this.tPos;
		return true;
	}
}

module.exports={頁,文,maxArticle:()=>maxarticlelen};