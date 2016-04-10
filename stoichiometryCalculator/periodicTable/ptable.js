//ptable.js  a Periodic Table resource  Bob Hanson hansonr@stolaf.edu
//optional newelem.js after this file
//requires ptldata.js loaded AFTER this file

//s=PTgetTable()  or s=PTgetDiv()
//several callback options

//see ptable.txt for details

AtomNum=new Array()
Elements=new Array()
Cells=new Array()

imagedir="img/"
dblclickmaxtime=300
mclicklast=0
mclicklasttime=0
thisPT=0

PT=new Array()
PTE=0

PTtype=new Array()
PTname=new Array()
PTnpt=0
function PTsetElementPropertyTypes(){
 //type=1 integer, 2 float, 3 character, 4 string
 for(var i=0;i<arguments.length;i++)PTtype[i]=arguments[i]
}

function PTsetElementPropertyNames(){
 var s=""
 for(var i=0;i<arguments.length;i++){
		s=PTname[i]=arguments[i]
		if(s=="atomic number")PTnpt=i
 }
}

function PTnewElem(){
 var n=parseInt(arguments[PTnpt])
 Elements[n]=new Array()
 var E=Elements[n]
 var key=""
 var val=0
 for(var i=0;i<arguments.length;i++){
	val=arguments[i]
	if(PTtype[i]==1)val=parseInt(val)
	if(PTtype[i]==2)val=(val?parseFloat(val):"?")
	E[PTname[i]]=val
 }
 var row=E["row"]
 var col=E["col"]
 var sym=E["symbol"]
 AtomNum[sym]=Cells[row+"_"+col]=n
 E.atno=n
 E.atmass=E["atomic wt"]
 E.sym=sym
 E.color="#"+E.color
 E.icolor=""
 E.ocolor=""
 E.selected=0
 E.isselectable=1
 E.bgcolor="#CCCCCC"
}//PTnewElem(0)

function PTcreateNew(name,ismini){
	if(arguments<2)ismini=0	
	PTnew=new Array()
	PTsetDefaults(PTnew,"createNew: "+name,ismini)
	//alert(PTnew.largesymbols+" in createnew")
	return PTnew
}

function PTgetStyles(PT){
	//this function can be modified to suite the desired style
	if(arguments.length==0)PT=PTcreateNew("PTnew from PTgetStyles")
	var s="<style>a,a.visited{text-decoration:none;color:blue}"
	s+="hover{font-size:14pt}"
	s+="a.pta{color:black;font-size:"+(PT.largesymbols?12:8)+"pt}"
	s+="a.ptn{font-size:"+(PT.largesymbols?12:8)+"pt}"
	return s+"</style>"
}

function PTsetDefaults(PT,name,ismini){
 //this function may be modified to suite
 if(!name)name="periodic table defined at "+(new Date())
 PT.name=name
 PT.bgcolor="#CCCCCC"
 PT.tmbgcolor="#000000"
 PT.unselectablecolor="#000000"
 PT.nosuchpropertycolor="#FFFFFF"
 PT.miniversion=ismini
 PT.cellwidth=(ismini?3:36)
 PT.borderwidth=(ismini?1:3)
 PT.cellwidth2=PT.cellwidth-PT.borderwidth-1
 PT.defaultelementtitle="at.no. @atno@, @name@"
 PT.thisscheme=0
 PT.havemini=false
 PT.largesymbols=1
 PT.PickBtns=[]
 PT.Blockcolor=0
 PT.mouseenabled=(!PT.miniversion)
 PT.allowmultiple=1
 PT.rowcolbuttonsenabled=1
 PT.mouseoverCallback=""
 PT.mouseoutCallback=""
 PT.mouseclickCallback=""
 PT.clickColCallback=""
 PT.clickRowCallback=""
 PT.openCallback=""
 PT.closeCallback=""
//static properties:
 PT.divid=""
 PT.formid=""
 PT.lineardivid=""
 PT.linearformid=""
 PT.isdefined=1
//globals:
 thisPT=PT
}

function PTgetElementTitle(PT,n,stitle){
 if(arguments.length<3)stitle=PT.defaultelementtitle
 var S=stitle.split("@")
 for(var i=1;i<S.length;i+=2){
	S[i]=Elements[n][S[i]]
 }
 return S.join("")
}

function PTgetScheme(PT,i){
 //color schemes for different blocks (alkali, alkaline earths, transition metals, main-group metal, metaloids, nonmetals, halogens, nobel gases, lanthanides, actinides
 //however those are defined in the table data
 //options for other schemes could go here.
 if(!PT.isdefined)PTsetDefaults(PT,"from getScheme")
 if(!i)i=0
 PT.Blockcolor=new Array()
 var B=PT.Blockcolor
 if(i==0){
	B["al"]="#CC6633"
	B["ae"]="#FF9933"
	B["tm"]="#FFFF00"
	B["ml"]="#99CC66"
	B["mm"]="#99CC66"
	B["ml"]="#99CC66"
	B["nm"]="#99CC66"
	B["ha"]="#99CC66"
	B["ng"]="#99CCFF"
	B["la"]="#CC99CC"
	B["ac"]="#BBBBBB"
 }else if(i==1){
	B["al"]="#CC6633"
	B["ae"]="#FF9933"
	B["tm"]="#FFFF00"
	B["mm"]="#FFFF66"
	B["nm"]="#99CCAA"
	B["ha"]="#99CCAA"
	B["ng"]="#99CCFF"
	B["la"]="#CC99CC"
	B["ac"]="#BBBBBB"
 }else{
//use your imagination
 }
 for(var i=1;i<Elements.length;i++)Elements[i].blockcolor=B[Elements[i].type]
}

function PTgetTable(PT,islinear,ismini){
 var s=""
 if(arguments.length<3)ismini=false
 if(arguments.length==0||!PT){
	PT=PTcreateNew("PTnew from PTgetTable",ismini)
	s+=PTgetStyles(PT)
 }
 if(!PT.Blockcolor)PTgetScheme(PT)
 s+="<table border=0><tr><td><table border=0 cellpadding=0 cellspacing=0>"
 if(islinear){
	s+="<tr>"
 	for(i=1;i<Elements.length;i++)s+=PTtableCell2(PT,i)
	s+="</tr>"
 }else{
	for(var r=0;r<=10;r++){
		s+="<tr>";for(var c=0;c<=19;c++){s+=PTtableCell(PT,r,c)};s+="</tr>"
	}
 }
 s+="</table></td></tr></table>"
 return s
}

function PTtableCell(PT,r,c){
 var s=""
 var bgcolor=""
 var n=(Cells[r+"_"+c])
 var td="<td bgcolor="+PT.bgcolor+" "
 var ismini=PT.miniversion
 if(!n){
	if(r==3 && c==3)return "<td align=center colspan=10 bgcolor="+(ismini?PT.bgcolor+">":PT.tmbgcolor+"><a class=ptn href=javascript:PTmouseclickRow(-3) title=\"click for all transition metals\"><font color="+PT.Blockcolor["tm"]+">transition metals</font></a>")+"</td>" 
	if(r==3 && c>3 && c<13)return ""
	if(r==9 && c==2)return td+" colspan=3 align=right>"+(ismini?"":"<a class=ptn href=javascript:PTmouseclickRow(9) title=\"click for full row\">lanthanides</a>&nbsp;&nbsp;")+"</td>" 
	if(r==9 && (c==3||c==4))return ""
	if(r==10 && c==2)return td+" colspan=3 align=right>"+(ismini?"":"<a class=ptn href=javascript:PTmouseclickRow(10) title=\"click for full row\">actinides</a>&nbsp;&nbsp;")+"</td>" 
	if(r==10 && (c==3||c==4))return ""

	if(r==0 && c>0 && c<19)return td+"align=center><a class=ptn href=javascript:PTmouseclickCol("+c+") title=\"click for full column\">"+c+"</a></td>" 
	if(c==0 && r>0 && r<8)return td+"valign=center><a class=ptn href=javascript:PTmouseclickRow("+r+") title=\"click for full row\">"+r+"</a>&nbsp;&nbsp;</td>" 
	return td+"></td>"
 }else{
	s="<td valign=center align=center id=id"+r+"_"+c
	+" width="+(PT.cellwidth)
	bgcolor=Elements[n].bgcolor
	Elements[n].ocolor=bgcolor
	s+=" bgcolor="+bgcolor+">"
 	+"<table border="+PT.borderwidth+"><tr><td valign=center align=center id=idi"+r+"_"+c
	+" width="+(PT.cellwidth2)
	bgcolor=Elements[n].blockcolor
	Elements[n].icolor=bgcolor
	s+=" bgcolor="+bgcolor+">"+PTtableCellContents(PT,r,c,n)+"</td></tr></table>"
 }
 s+="</td>"
 return s
}

function PTtableCell2(PT,n){
	var s="<td valign=center align=center id=pm"+n+" width=6 bgcolor="+Elements[n].bgcolor+">"
 	+"<table cellpadding=0 cellspacing=0><tr><td valign=center align=center id=pmi"+n+" width=3 bgcolor="+Elements[n].blockcolor+">"
	+PTtableCellContents2(PT,n)
	+"</td></tr></table></td>"
	return s
}

function PTtableCellContents(PT,r,c,n){
	if(PT.miniversion)return "<img src=img/t1.gif width=10 height=10>"
	var s="<a class=pta id=tc"+n
	+" title=\""+PTgetElementTitle(PT,n)+"\""
	+" onmouseover=PTmouseover("+n+")"
	+" onclick=PTmouseclick("+n+")"
	+" ondblclick=PTmouseclick("+n+",1)"
	+" onmouseout=PTmouseout("+n+")>"
	+(PT.largesymbols?"":Elements[n].atno+"<br>")+Elements[n].sym+"</a>"
	return s
}

function PTtableCellContents2(PT,n){
	var s="<a href=javascript:void(PTmouseclick("+n+"))"
	+" title=\"at.no. "+n+", "+Elements[n].name+"\""
	+" onmouseover=PTmouseover("+n+")"
	+" onmouseout=PTmouseout("+n+")>"
	+"&nbsp;</a>"
	return s
}

function PTgetDiv(PT,divid,formid,islinear,topinfo,rthandinfo){
 if(arguments.length==0){
	PTnew=new Array()
	PT=PTnew
	divid="tableplace"
	formid="tablep"
 }

 s="<div id="+divid+"><form id="+formid+" name="+formid+">"


 if(islinear){
	PT.lineardivid=divid
	PT.linearformid=formid
	var st="This is a linear table of the elements. Click on an element to add it to the group of selected atoms, or double-click it to select just that single element."
	s+="<table cellpadding=0 cellspacing=0><tr><td width=800 bgcolor="+PT.bgcolor+"><table border=1 cellpadding=10><tr>"
	+"<td align=right valign=top width=800 bgcolor="+PT.bgcolor+">"
	+"<table cellpadding=0 cellspacing=0><tr><td>"
	s+=PTgetTable(PT,1)
	s+="</td>"
	s+="<td>&nbsp;&nbsp;<a href=javascript:PTdoOpenTable()>periodic table&nbsp;<img border=0 src="+imagedir+"b_.gif title=maximize the periodic table></a></td>"
	+"</tr><tr><td colspan=2 align=right><table><tr><td width=600><a href=\"javascript:alert('"+st+"')\" title=\""+st+"\">What's this?</a></td><td align=right><table><tr><td>&nbsp;"+PT.PickBtns.join("</td></tr><tr><td>&nbsp;")+"</td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr>"
 	+"</table>"
 }else{
	PT.divid=divid
	PT.formid=formid
	s+="<table border=1 cellspacing=0><tr><td width=800 bgcolor="+PT.bgcolor+"><table cellpadding=10><tr>"
	+"<td rowspan=2 bgcolor="+PT.bgcolor+">"+PTgetTable(PT,0)+"</td>"
	+"<td width=85 valign=top align=right><a href=javascript:PTdoCloseTable()><img border=0 src="+imagedir+"bx.gif title=minimize the periodic table></a></td></tr>"
	+"<tr><td align=right valign=bottom>"+(rthandinfo?rthandinfo:"")
	+"<p>"+PT.PickBtns.join("<br>&nbsp;")
	+"</td></tr></table></td></tr></table>"
 }
 s+="</form></div>"
 return s
}

function PTsetColors(i,icolor,ocolor){

 if(Elements[i].icolor==icolor && Elements[i].ocolor==ocolor)return
 if(icolor)Elements[i].icolor=icolor
 if(ocolor)Elements[i].ocolor=ocolor
 var r=Elements[i].row
 var c=Elements[i].col
 var d=divfind("id"+r+"_"+c)
 if(!d)alert(i+Elements[i].name+" is not defined! (PTsetColors)")

 if(ocolor && d)d.bgColor=ocolor
 var d=divfind("idi"+r+"_"+c)
 if(icolor && d)d.bgColor=icolor

 var d=divfind("pm"+i)
 if(ocolor && d)d.bgColor=ocolor
 var d=divfind("pmi"+i)
 if(icolor && d)d.bgColor=icolor
 //status=i+" "+ocolor+" "+icolor+" "+d
}

function PTchangeColor(n,isentry){
 if(isentry && Elements[n].selected==0||Elements[n].selected>0){
	if(Elements[n].isselectable)PTsetColors(n,"#FFFFFF",Elements[n].color)
 }else{
	PTsetColors(n,Elements[n].blockcolor,Elements[n].bgcolor)
 }
}

function PTmouseover(n){
	if(!thisPT.mouseenabled)return
	PTchangeColor(n,1)
	if(thisPT.mouseoverCallback)thisPT.mouseoverCallback(n)
}

function PTmouseout(n){
	if(!thisPT.mouseenabled)return
	if(Elements[n].selected<0)Elements[n].selected=0
	PTchangeColor(n,0)
	if(thisPT.mouseoutCallback)thisPT.mouseoutCallback(n)
}
function PTmouseclick(n,isdblclick){
	if(!thisPT.mouseenabled)return
	if(!isdblclick)isdblclick=0

	if(!thisPT.allowmultiple){
		for(var i=1;i<Elements.length;i++){
			if(Elements[i].selected){
				Elements[i].selected=0
				PTchangeColor(i,0)
			}
		}
	}
	if(Elements[n].isselectable){
		Elements[n].selected=(Elements[n].selected>0?-1:Elements[n].selected<0?0:1)
		//-1 turns off
		PTchangeColor(n,0)
	}
	if(PTE&&isdblclick)PTE=0
	if(thisPT.mouseclickCallback){
		if(isdblclick){
			setTimeout("thisPT.mouseclickCallback("+n+",1)",dblclickmaxtime)
		}else{
			PTE=setTimeout("if(PTE)thisPT.mouseclickCallback("+n+",0)",dblclickmaxtime)
		}
	}
}

function PTmouseclickCol(c){
	if(!thisPT.mouseenabled)return
	PTselectElements(0,c)
	if(thisPT.clickColCallback)thisPT.clickColCallback(c)
}

function PTmouseclickRow(r){
	if(!thisPT.mouseenabled)return
	PTselectElements(r,0)
	if(thisPT.clickRowCallback)thisPT.clickRowCallback(r)
}

function PTdoCloseTable(){
 thisPT.islineartable=true
 divsetvisibility(thisPT.divid,false)
 divsetvisibility(thisPT.lineardivid,true)
 if(thisPT.closeCallback)thisPT.closeCallback()
}

function PTdoOpenTable(){
 thisPT.islineartable=false
 divsetvisibility(thisPT.divid,true)
 divsetvisibility(thisPT.lineardivid,false)
 if(thisPT.openCallback)thisPT.openCallback()
}

function PTselectElements(thisr,thisc,atomlist){
	if((thisr||thisc)&&(!thisPT.rowcolbuttonsenabled||!thisPT.allowmultiple))return
	var r=0
	var c=0
	var TF=-1
	var noff=1
	if(!atomlist){
		atomlist=0
		noff=PTtoggleAtom(thisr,thisc,0,-2)
	}
	return PTtoggleAtom(thisr,thisc,atomlist,(noff>0))
}

function PTtoggleAtom(thisr,thisc,atomlist,mode){
	var n_turnedon=0
	var n_turnedoff=0
	var n_on=0
	var n_off=0
	var isall=(atomlist=="*")
	var isnone=(atomlist=="_")
	var ison=0

	if(isnone && mode==1)mode=0
	//	mode=0 turn off
	//	mode=1 turn on
	//	mode=-1 just count n_on
	//	mode=-2 just count n_off
	if(atomlist){
		if(atomlist.indexOf(";")<0)atomlist=atomlist.replace(/\,/g,";")
		atomlist=";"+atomlist+";"
	}
	for(var i=1;i<Elements.length;i++){
		r=Elements[i].row
		c=Elements[i].col
		ison=Elements[i].selected
		if(0
		 ||thisr==-1 && i!=1 && (Elements[i].type=="nm"|| Elements[i].type=="ha")
		 ||thisr==-3 && Elements[i].type=="tm"
		 ||thisr==-7 && Elements[i].type=="ml"
		 ||(isall||isnone) && Elements[i].isselectable
		 ||atomlist && atomlist.indexOf(";"+Elements[i].sym+";")>=0
		 ||thisc==0 && r==thisr 
		 ||thisr==0 && c==thisc && r<8
		){
			if(ison||isnone){
				if(mode==0){
					n_turnedoff++
					Elements[i].selected=0
					PTchangeColor(i,0)
				}else{
					n_on++
				}
			}else if(Elements[i].isselectable){
				if(mode==1){
					n_turnedon++
					Elements[i].selected=1
					PTchangeColor(i,1)
				}else{
					n_off++
				}
			}
		}else if(ison){
			n_on++
		}else if(mode!=-2){
			n_off++
		}
	}
	return (mode==-2?n_off:mode==-1?n_on:n_turnedon+n_on)
}

function PTgetSelectedList(assymbols){
 var s=""
 for(var i=1;i<Elements.length;i++){
	if(Elements[i].selected>0)s+=","+(assymbols?Elements[i].sym:i)
 }
 return s.substring(1,s.length)
}

function PTsetSelectable(atomlist){
	var n=0
	var isall=(atomlist=="*")
	var isnone=(atomlist=="_")
	if(atomlist.indexOf(";")<0)atomlist=atomlist.replace(/\,/g,";")
	atomlist=";"+atomlist+";"
	for(var i=1;i<Elements.length;i++){
		if(isall||atomlist.indexOf(";"+Elements[i].sym+";")>=0){
			n++
			if(!Elements[i].isselectable || Elements[i].selected){
				Elements[i].isselectable=1
				Elements[i].selected=0
				Elements[i].bgcolor=thisPT.bgcolor
				PTchangeColor(i,0)
			}
		}else if(isnone||Elements[i].isselectable){
				Elements[i].isselectable=0
				Elements[i].selected=0
				Elements[i].bgcolor=thisPT.unselectablecolor
				PTchangeColor(i,0)
		}
	}
	return n
}

function PTsetColorInRange(i,x,xmin,xmax){
 var c=""
 if(!isNaN(x) && x>=xmin && x<=xmax){
	var m=255
	var rc=xmax
	var gc=xmin+0.5*(xmax-xmin)
	var bc=xmin
	var rw=1.9*(xmax-xmin)
	var gw=0.7*(xmax-xmin)
	var bw=0.9*(xmax-xmin)
	var r=(m-Math.max(0,Math.floor(m*(1-Math.abs(x-rc)/rw))))
	var g=(m-Math.max(0,Math.floor(m*(1-Math.abs(x-gc)/gw))))
	var b=(m-Math.max(0,Math.floor(m*(1-Math.abs(x-bc)/bw))))
	c=hexof(256*256*256-((r*256+g)*256+b)-1)
 }else{	
	c=thisPT.nosuchpropertycolor
 }
 Elements[i].blockcolor=c
 Elements[i].color=c
 PTsetColors(i,c,0)
}

function PTshowElementsByProperty(prop,xmin,xmax){
 if(!isNaN(prop)){
	PTgetScheme(thisPT,prop)
	for(var i=1;i<Elements.length;i++)PTchangeColor(i)
	return
 }
 var x=""
 var d=""
 if(arguments.length<2){
	xmin=1e99
	xmax=-1e99
	for(var i=1;i<Elements.length;i++){
		x=Elements[i][prop]
		if(!isNaN(x))xmin=Math.min(x,xmin)
		if(!isNaN(x))xmax=Math.max(x,xmax)
	}
 }
 for(var i=1;i<Elements.length;i++){
	PTsetColorInRange(i,Elements[i][prop],xmin,xmax)
	d=divfind("tc"+i)
	if(d)d.title=PTgetElementTitle(thisPT,i,thisPT.defaultelementtitle+", "+prop+"="+Elements[i][prop])
 }
 return [xmin,xmax]
}

function PTshowElementsByScheme(n){
 PTgetScheme(thisPT,n)
 for(var i=1;i<Elements.length;i++)PTsetColors(i,Elements[i].blockcolor,0)
}

function PTtest(){
 return "just testing--put anything you want here"
}

function hexof(n,format){
 if(!format)format="000000"
 var s=""
 var H="0123456789ABCDEF"
 var i=0
 while(n){
   i=n%16
   n=(n-i)/16
   s=H.charAt(i)+s
 }
 s=format+s
 return "#"+s.substring(s.length-format.length,s.length)
}
