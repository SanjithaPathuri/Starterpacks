
<!DOCTYPE html>
<html>
<head>
	<title>Leaflet debug page</title>

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2/leaflet.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2/leaflet.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="<?php echo base_url() ; ?>css/screen.css" />

	<link rel="stylesheet" href="<?php echo base_url() ; ?>dist/MarkerCluster.css" />
	<link rel="stylesheet" href="<?php echo base_url() ; ?>dist/MarkerCluster.Default.css" />
	
	<script src="<?php echo base_url() ; ?>dist/leaflet.markercluster-src.js"></script>
	<style>
	.ccvs_add{
		color:red ;
		width : 200px;
		height : 200px;
	}
	</style>
</head>
<body>

	<div id="map"></div>
	
	<script type="text/javascript">
		var base_url  = "<?php echo base_url(); ?>" ;
	
		
		
		
		var tiles = L.tileLayer('http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '<a href="'+base_url+'">Smart Envionment</a>'
			}),
			latlng = L.latLng(50.5, 30.51);

		var map = L.map('map', {center: latlng, zoom: 2, layers: [tiles]});

		var markers = L.markerClusterGroup({spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false});

		function populate() {
			for (var i = 0; i < 100; i++)
			{
				var latlog = getRandomLatLng(map);
				var m = L.marker(latlog);
				markers.addLayer(m);
				var design = '<p class="ccvs_add">Hai every one</p> '+i ; 
				
				
				
				
				
				
				
				
				m.bindPopup(design).openPopup();
			}
			return false;
		}
		function getRandomLatLng(map) {
			var bounds = map.getBounds(),
				southWest = bounds.getSouthWest(),
				northEast = bounds.getNorthEast(),
				lngSpan = northEast.lng - southWest.lng,
				latSpan = northEast.lat - southWest.lat;

			return L.latLng(
					southWest.lat + latSpan * Math.random(),
					southWest.lng + lngSpan * Math.random());
		}

		markers.on('clusterclick', function (a) {
			a.layer.zoomToBounds();
		});

		populate();
		map.addLayer(markers);

	</script>
</body>
</html>
