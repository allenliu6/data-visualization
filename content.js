var getId = function(id){
	return document.getElementById(id);
};

var nasd = 1;

var list = {
  paperSource: getId("paperSource"),
  paperSubject: getId("paperSubject"),
  paperClass: getId("paperClass"),
  paperArea: getId("paperArea"),
  secondSource: getId("secondSource")

};

list.paperSource.addEventListener("click",function(){
  this.className = " list_mouse";
  list.secondSource.style.display = "block";
  list.secondSource.className =" list_mouse";
  list.paperClass.className = list.paperSubject.className = list.paperArea.className = "";
});

list.paperSubject.addEventListener("click",function(){
  this.className = " list_mouse";
  list.secondSource.style.display = "none";
  list.paperClass.className = list.paperSource.className = list.paperArea.className = "";
});

list.paperArea.addEventListener("click",function(){
  this.className = " list_mouse";
  list.secondSource.style.display = "none";
  list.paperClass.className = list.paperSource.className = list.paperSubject.className = "";
});

list.paperClass.addEventListener("click",function(){
  this.className = " list_mouse";
  list.paperSubject.className = list.paperSource.className = list.paperArea.className = "";
  list.secondSource.style.display = "none";
});


//maptree
(function(){
  var contentLeft = getId( "contentLeft" ),
      width= contentLeft.clientWidth,
      height = contentLeft.clientHeight;

  var margin = {top: 30, right: 10, bottom: 10, left: 10};
      width = width - margin.left - margin.right-10;
      height = height - margin.top - margin.bottom-70;

  var color = d3.scale.category20c();

  var treemap = d3.layout.treemap()
      .size([width, height])
      .sticky(true)
      .value(function( d ) { return d.size; });

  var div = d3.select( "#mapTree" ).append("div")
      .style("position", "relative")
      .style("width", (width + margin.left + margin.right) + "px")
      .style("height", (height + margin.top + margin.bottom) + "px")
      .style("left", margin.left + "px")
      .style("top", margin.top + "px");


  d3.json("flare.json", function(error, root) {
    if (error) throw error;
    var node = div.datum(root).selectAll(".node")
        .data(treemap.nodes)
      .enter().append("div")
        .attr("class", "node")
        .call(position)
        .style("background", function(d) { return d.children ? color(d.name) : null; })
        .text(function(d) { return d.children ? null : d.name; });

});

  function position() {
    this.style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; })
        .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
        .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
  }
})();


//饼图
(function(){
  var picContainer = getId("picContainer"),
      width = picContainer.clientWidth < picContainer.clientHeight ? picContainer.clientWidth : picContainer.clientHeight,
      height = width;
  

  var svg=d3.select("#picContainer")  
              .append("svg")  
              .attr("width",width)  
              .attr("height",height);

  var dataset=[ ["小米",60.8] , ["三星",58.4] , ["联想",47.3] , ["苹果",46.6] ,  
                          ["华为",41.3] , ["酷派",40.1] , ["其他",111.5] ];  
    
  //转换数据  
  var pie=d3.layout.pie() //创建饼状图  
              .value(function(d){  
                  return d[1];  
              });//值访问器  
  //dataset为转换前的数据 piedata为转换后的数据  
  var piedata=pie(dataset);  

  //绘制  
  var outerRadius=width/3;  
  var innerRadius=0;//内半径和外半径  
    
  //创建弧生成器  
  var arc=d3.svg.arc()  
              .innerRadius(innerRadius)  
              .outerRadius(outerRadius);  
  var color=d3.scale.category20();  
  //添加对应数目的弧组  
  var arcs=svg.selectAll("g")  
              .data(piedata)  
              .enter()  
              .append("g")  
              .attr("transform","translate("+(width/2)+","+(height/2)+")");  
  //添加弧的路径元素  
  arcs.append("path")  
      .attr("fill",function(d,i){  
          return color(i);  
      })  
      .attr("d",function(d){  
          return arc(d);//使用弧生成器获取路径  
      });  
  //添加弧内的文字  
  arcs.append("text")  
      .attr("transform",function(d){  
          var x=arc.centroid(d)[0]*1.4;//文字的x坐标  
          var y=arc.centroid(d)[1]*1.4;  
          return "translate("+x+","+y+")";  
      })  
      .attr("text-anchor","middle")  
      .text(function(d){  
          //计算市场份额的百分比  
          var percent=Number(d.value)/d3.sum(dataset,function(d){  
              return d[1];  
          })*100;  
          //保留一位小数点 末尾加一个百分号返回  
          return percent.toFixed(1)+"%";  
      });  
  //添加连接弧外文字的直线元素  
  arcs.append("line")  
      .attr("stroke","black")  
      .attr("x1",function(d){  
          return arc.centroid(d)[0]*2;  
      })  
      .attr("y1",function(d){  
          return arc.centroid(d)[1]*2;  
      })  
      .attr("x2",function(d){  
          return arc.centroid(d)[0]*2.2;  
      })  
      .attr("y2",function(d){  
          return arc.centroid(d)[1]*2.2;  
      });  
  //添加弧外的文字元素  
  arcs.append("text")  
      .attr("transform",function(d){  
          var x=arc.centroid(d)[0]*2.5;  
          var y=arc.centroid(d)[1]*2.5;  
          return "translate("+x+","+y+")";  
      })  
      .attr("text-anchor","middle")  
      .text(function(d){  
          return d.data[0];  
      });
})();
  