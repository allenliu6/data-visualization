var mapContainer = getId("mapContainer");
var contentMap = getId("contentMap");

var getMarker = function(){
	var div = mapContainer.getElementsByTagName("div"),
		arr = [];
		console.log(div);
	for(var i = 0; i< div.length; i++){
		if(div[i].className == "amap_lib_placeSearch_poi"){
			console.log(div[i]);
		}
	}
	return arr;
}