mapContainer.style.height = parseInt(contentMap.offsetHeight)-104+"px";

//时间轴绑定onclick事件
var timePoint = getId("timeLine").children;
for(var i = 0; i < timePoint.length; i++){
	timePoint[i].addEventListener("click" , function(){
		for(var j = 0; j < timePoint.length; j++){
			if(timePoint[j].className == "timePoint select")
				timePoint[j].className = "timePoint";
		}
		this.className += " select";
	});
}

//新建map对象并设置中心点和层级
var map = new AMap.Map("mapContainer",{
	resizeEnable: true
});
map.setZoom(10);
map.setCenter([116.39,39.9]);


//添加三个插件
AMap.plugin(["AMap.ToolBar","AMap.Scale","AMap.MapType"],function(){
	var toolbar = new AMap.ToolBar(),
	scale = new AMap.Scale(),
	maptype = new AMap.MapType();
	map.addControl(toolbar);
	map.addControl(scale);
	map.addControl(maptype);
});

//新建InfoWindow对象
var infoWindow = new AMap.InfoWindow({
	offset: new AMap.Pixel(3, -30)
});

//添加marker覆盖物 设置坐标 绑定信息窗体
var addMarker = function(result){
	var poi = result.poiList.pois[0];
	var marker = new AMap.Marker({
		position: [poi.location.lng,poi.location.lat],
		map: map,
		zIndex: 102
	});

	marker.content = '';
	marker.content += '<div>'+poi.name+'</div><br/>';
	marker.content += '<div>地址：'+poi.pname + poi.cityname + poi.adname + poi.address+'</div>';

	AMap.event.addListener(marker, "click", function(e){
		infoWindow.setContent(e.target.content);
		infoWindow.open(map, e.target.getPosition());
	});
};

//添加侧边栏信息列表
var addSideList = function (result) {
	
};


//地点搜索服务 为addMarker函数提供搜索地点的详细信息
AMap.service(["AMap.PlaceSearch"], function() {
	arr = ["上海集成电路科技研发中心有限公司","展讯通信（上海）有限公司","上海华虹NEC电子有限公司","复旦大学","上海交通大学","上海高性能集成电路设计中心","上海汽车集团股份有限公司","上海高清数字科技产业有限公司","万达信息股份有限公司","普华基础软件股份有限公司","上海大学","上海贝岭股份有限公司"];
	for (var i = 0; i < arr.length; i++) {
		var placeSearch = new AMap.PlaceSearch({
            pageSize: 1,
            map: map
        });
        placeSearch.search(arr[i], function (status,result) {
	        if(status === 'complete' && result.info === 'OK'){
		       	addMarker(result);
		       	addSideList(result);
		    }
        });
    }
});

