function getSunData() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
    	var csvData = createArray(xhr.responseText);
			var scene = viewer.scene;
			var instances = [];
			for (var lon = 0; lon < 360; lon += 1) {
			  for (var lat = 0; lat < 180; lat += 1) {
					var color = ( csvData[lat][lon] - 818.503941 ) / 3603.149639 / 2.0
					//console.log(color)
			    instances.push(new Cesium.GeometryInstance({
			      geometry : new Cesium.RectangleGeometry({
			        rectangle : Cesium.Rectangle.fromDegrees(lon-180, lat-90, lon-180 + 1.0, lat-90 + 1),
			        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
			      }),
			      attributes : {
			        color : Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0.5, color, 0, 0.8))
			      }
			    }));
			  }
			}

			scene.primitives.add(new Cesium.Primitive({
			  geometryInstances : instances,
			  appearance : new Cesium.PerInstanceColorAppearance()
			}));
    };

    xhr.open("get", "data/yearly_sunlight.csv", true);
    xhr.send(null);
}

function createXMLHttpRequest() {
    var XMLhttpObject = null;
    XMLhttpObject = new XMLHttpRequest();
    return XMLhttpObject;
}

function createArray(csvData) {
    var tempArray = csvData.split("\n");
    var csvArray = new Array();
    for(var i = 0; i<tempArray.length;i++){
    	csvArray[i] = tempArray[i].split(",");
    }
    return csvArray
}

$(document).ready(function(){

  /*$.ajax({
		url: "http://services.swpc.noaa.gov/text/aurora-nowcast-map.txt"
	}).then(function(data){ //ajaxの通信に成功した場合
		alert("data retrieved");
		var array = data.split("\n");
		array = array.filter(function(line){ return line[0] != '#' })
		//array = array.slice(0, 512)
		if( !view_north )
		  array = array.slice(0, 93); //南極
		else
		  array = array.slice(419,512);
		drawGrid(array, viewer);
	}, function(data){ //ajaxの通信に失敗した場合
		alert("error!");
	});*/

	/*for (var lon = -180.0; lon < 180.0; lon += 1.0) {
	  for (var lat = -89.0; lat < 89.0; lat += 1.0) {
	    instances.push(new Cesium.GeometryInstance({
	      geometry : new Cesium.RectangleGeometry({
	        rectangle : Cesium.Rectangle.fromDegrees(lon, lat, lon + 1.0, lat + 1.0),
	        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
	      }),
	      attributes : {
	        color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({alpha : 0.5}))
	      }
	    }));
	  }
	}*/

	getSunData()

});
