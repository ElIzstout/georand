var canv;
var ctx;
var dev;
var test;
var testarr;
var cheight;
var cwidth;
var tempy;
var grids;
const georadius = 57;
var render=[];

//options
const chance=100; //represented by 1/chance
const maxr=20;

const schance=100;
const smaxr=5;

function pageInit(){
  
  var mcanv=document.getElementById('maincanvas');
  mcanv.height = 180*8;
  mcanv.width = mcanv.height*2;
  var mctx = mcanv.getContext('2d');
  
  for(let canvs=0;canvs<=6;canvs++){
    setTimeout(()=>{
    canv = new OffscreenCanvas((180*2)*2,180*2);
    //canv.height = 180*8;
    //canv.width = canv.height*2;
    cheight = canv.height;
    cwidth = canv.width;
    ctx = canv.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    dev = document.getElementById('dev');
    
    ctx.fillStyle="blue";
  
    ////grid
    //grids= grid();
    //dev.innerHTML= "x:"+ grids.xvals.length + " y:"+ grids.yvals.length;
    
    //drawarr(ctx,"blue",grids.xvals,grids.yvals);
    //let othergrid = equirectangular(grids,56);
    //drawarr(ctx,'pink',othergrid.xvals,othergrid.yvals);
  
    //circles
    try{
        for(let i=0;i<=5;i++){
          cellbased();
        }
      }catch(err){alert(err);}
    ctx.globalCompositeOperation = 'source-out';
    ctx.fillStyle="#00cc0077"//rgbcolor(0,(255-(canvs*25)),50,50);
    ctx.fillRect(0,0,cwidth,cheight);
    mctx.drawImage(canv,0,0,mcanv.width,mcanv.height);
    
    //canv.transferToImageBitmap());
    //document.write('<img src="'+render[canvs]+'"></img>');
    },0);
  }
  
}



function cellbased(){
  let detailx=36*2;
  let detaily=18*2;
  let sdetailx=36*5;
  let sdetaily=18*5;
  for(let gy=0;gy<=180;gy+=  180/detaily){
    for(let gx=0;gx<=360;gx+=360/detailx){
      if(randint(1,chance)<=2){
        let offx=randint(0,360/detailx) ;
        let offy=randint(0,180/detaily) ;
        //setTimeout(impact,0,gx+offx,gy+offy,randint(1,5));
       impact(gx+offx,gy+offy,randint(1,maxr));
      }
      
  }
  }
  for(let gy=0;gy<=180;gy+=  180/sdetaily){
    for(let gx=0;gx<=360;gx+=360/sdetailx){
      if(randint(1,schance)<=2){
        let offx=randint(0,360/detailx) ;
        let offy=randint(0,180/detaily) ;
        //setTimeout(impact,0,gx+offx,gy+offy,randint(1,5));
       impact(gx+offx,gy+offy,randint(1,smaxr));
      }
      
  }
  }
  
}

function grid(){
  let xvals=[];
  let yvals=[];
  let vert;
  for(let i=0;i<=cwidth; i+= cwidth/18){
    
    vert = line(i,0,i,cheight);
    xvals=xvals.concat(vert.xvals);
    yvals=yvals.concat(vert.yvals);
  }
  for(let i=0;i<=cheight; i+= cheight/9){
    vert = line(0,i,cwidth,i);
    xvals=xvals.concat(vert.xvals);
    yvals=yvals.concat(vert.yvals);
  }
  return new coord(xvals,yvals);
}

//test
function impact(x,y,s=10){
  
  let temp= circle(x,y,s);
  dev.innerHTML= "x:"+ temp.xvals.length + " y:"+ temp.yvals.length;
  //dev.innerHTML="?"
  wrapvals(temp);
  wrapvals(temp);
  wrapvals(temp);
  wrapvals(temp);
  ctx.beginPath();
  ctx.moveTo(temp.xvals[0]*(cwidth/360),temp.yvals[0]*(cheight/180));
  let last =0;
  let color= rgbcolor(randint(100,255),randint(100,255),randint(100,255),255);
  for(let i=0;i<temp.xvals.length;i++){
    
    if(Math.abs(temp.xvals[i]-temp.xvals[i+1])<10){
      ctx.lineTo((temp.xvals[i+1]*cwidth/360),(temp.yvals[i+1]*cheight/180));
    }
    else{
      let color= rgbcolor(randint(100,255),randint(100,255),randint(100,255),255);
      let pxsise=2;
      if((temp.xvals[i]-temp.xvals[i+1])>10){
        
          ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle="#000000";
        ctx.fillRect((temp.xvals[i]*cwidth/360),(temp.yvals[i]*cheight/180),pxsise,pxsise);
        ctx.fillRect((temp.xvals[i+1]*cwidth/360),(temp.yvals[i+1]*cheight/180),pxsise,pxsise);
        ctx.moveTo((temp.xvals[i+1]*cwidth/360),(temp.yvals[i+1]*cheight/180));
        
      }
      if((temp.xvals[i]-temp.xvals[i+1])<10){
    
        if(last!==0){
          ctx.lineTo(temp.xvals[last]*(cwidth/360),temp.yvals[last]*(cheight/180));
          ctx.fill();
          last=0;
        }
        else{
          
          //ctx.globalCompositeOperation = 'source-over';
          //ctx.fillStyle="#cccccc";
          //ctx.fillRect((temp.xvals[i]*cwidth/360),(temp.yvals[i]*cheight/180),pxsise,pxsise);
          //ctx.fillStyle=color;
          //ctx.fillRect((temp.xvals[0]*cwidth/360),(temp.yvals[0]*cheight/180),pxsise,pxsise);
          ctx.lineTo(temp.xvals[359-i]*(cwidth/360),temp.yvals[359-i]*(cheight/180));
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
          ctx.moveTo((temp.xvals[i+1]*cwidth/360),(temp.yvals[i+1]*cheight/180));
          
          
        }
      }
    }
  }
  
  //fillstyle for ocean
  ctx.fillStyle=rgbcolor(255,15,205,255);
  
  ctx.strokeStyle= color
  ctx.fill();
  ctx.lineWidth = 0;
  //ctx.stroke();
  
  //drawarr(ctx,'#00ffd0',temp.xvals,temp.yvals);
  
  
}
// | map convesions
// v

function equirectangular(coords,radius){
  //dev.innerHTML='rad:'+radius;
  let mapx=[];
  let mapy=[];
  let degx;
  let degy;
  for(i = 0; i < coords.xvals.length; i++){
    let radius2 = Math.sin(rads(coords.yvals[i]))*radius;
    degy = degrees(coords.yvals[i]/radius) ;
    degx = degrees(coords.xvals[i]/(radius*Math.cos(rads(34))));
    mapx.push(degx);
    mapy.push(degy);
  }
  
  return new coord(mapx,mapy);
}

function wrapvals(coords){
  for(i = 0; i < coords.xvals.length; i++){
    
    if(coords.yvals[i]>180){
      coords.xvals[i]=coords.xvals[i]-180;
      coords.yvals[i]= 180-(coords.yvals[i]-180)
    }
    if(coords.xvals[i]>360){
      coords.xvals[i]=coords.xvals[i]-360;
    }
    if(coords.xvals[i]<0){
      coords.xvals[i]=360-(Math.abs(coords.xvals[i]));
    }

  }
  
}

// | Array canv rework functs
// v

function circle(centerlong,centerlat,radius){
  let pxvals =[];
  let pyvals = [];
  let xvals =[];
  let yvals = [];
  let n;
  let m;
  for(let angle=1;angle<=360;angle+=1){
    n = dsin(angle) * radius;
    m = dcos(angle) * radius;
    pxvals.push(n);
    pyvals.push(m);
    
  }
  for(let i=0;i<pxvals.length;i+=1){
    let g = pyvals[i] + centerlong;
    let h = (dsin(centerlat)*pxvals[i])+centerlat;
    xvals.push(g);
    yvals.push(h);
    
  }
  
  return new coord(xvals,yvals);
  
}

function line(startx,starty,endx,endy){ //garbage
  let xvals = [];                       // |
  let yvals = [];                       // V
  let primex,primey,lowx,lowy;
  let rise;
  let run;
  let slope;
  let length;
  
  if(startx <= endx){ //fix first point if based x
    primex = endx;
    primey = endy;
    lowx = startx;
    lowy = starty;
  }
  else{
    lowx = endx;
    lowy = endy;
    primex = startx;
    primey = starty;
  }
  
  rise = primey-lowy;
  run = primex-lowx;
  
  if(run===0){ //test if based on y
    if(starty<=endy){
      primex = endx;
      primey = endy;
      lowx = startx;
      lowy = starty;
    }
    else{
      lowx = endx;
      lowy = endy;
      primex = startx;
      primey = starty;
    }
    rise = primey-lowy;
    run = primex-lowx;
    length = rise;
    for(let perx = 0; perx <= length; perx += 1){
      xvals.push( lowx );
      yvals.push( perx+lowy );
    }
  }
  else{
    length=run;
    slope = rise/run;
    for(let perx = 0; perx <= length; perx +=1){
      xvals.push( perx+lowx );
      yvals.push( (perx*slope)+lowy );
    }
  }
  
  //fin vals
  var vals = new coord(xvals,yvals);
  return vals;
}

function drawarr(ctx,color,xvals,yvals){
  
  for(let points = 0; points < (xvals.length); points++){
    ctx.fillStyle=color;
    let x = xvals[points]*cwidth/360;
    let y = yvals[points]*cheight/180;
    ctx.fillRect(x,y,1,1);
  }
}

// | classes
// v
class coord{
  constructor(xvals,yvals){
    this.xvals=xvals;
    this.yvals=yvals;
  }
}



// | util
// v

function rads(degrees){
	let rdegrees = degrees * Math.PI / 180;
	return rdegrees;
}
function degrees(rads){
  return rads*(180/3.1415);
}
function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function randarray(length,min,max){
  let array = [];
  for(let i=0 ;i<length;i++){
    array.push(randint(min,max));
  }
  return array
}

function dsin(angle){
  return Math.sin(rads(angle))
}
function dcos(angle){
  let cos = Math.cos(rads(angle));
  return cos;
}
function rgbcolor(r,g,b,a){
  return "rgba("+r+","+g+","+b+","+a+")"
}