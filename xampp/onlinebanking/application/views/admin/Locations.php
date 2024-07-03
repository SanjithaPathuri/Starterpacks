
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>MarkerClusterer v3 Simple Example</title>
		<style>
		.main_title
		{
		font-size: 28px;
		font-weight: 600;
		text-align: center;
		}
		.padding_login
		{
		padding-top: 48px;
		}
		.verticalLine {
		border-left: thick solid #020202;
		font-size: 20px;
		font-weight: 700;,
		padding: 5px;

		}

		.main_div
		{
			padding-top : 50px
		}
		.view-modal-header
		{
			padding : 15px;
			border-bottom: 1px solid #67676d;
			background: #4c4c51;
			color: beige; 
		}	
		.view-modal-body 
		{
			position: relative;
			padding: 15px;
			background : #4c4c51;
			color : #f9f9f9 ;
		}
		.view-modal-footer {
			padding: 15px;
			text-align: right;
			border-top: 1px solid #67676d;
			background : #4c4c51;
			color : #f9f9f9 ;
		}
		.modal-open .modal {
			overflow-x: hidden;
			overflow-y: auto;
			padding-top: 103px;
		}
		.popup_bottom {
		height: 72px !important;
		background-color: #fff;
		}

		</style>
	 <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBM28JQxcwipPzJS2UfYw4gmiE3ctVFPn4&libraries=places&callback=initAutocomplete"
         async defer></script>
	<script> var base_url = "<?php echo base_url(); ?>" ; </script>
    <script src= "http://localhost:8080/smartenvironment//src/data.json"></script>
    <script type="text/javascript" src="http://localhost:8080/smartenvironment/src/markerclusterer.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<link rel="stylesheet" href="http://smartenvironment.thesmartbridge.com/css/leaflet.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2/leaflet.js"></script>
	
	<link rel="stylesheet" href="http://smartenvironment.thesmartbridge.com/css/screen.css" />

	<link rel="stylesheet" href="http://smartenvironment.thesmartbridge.com/dist/MarkerCluster.css" />
	<link rel="stylesheet" href="http://smartenvironment.thesmartbridge.com/dist/MarkerCluster.Default.css" />
	
	<script src="http://smartenvironment.thesmartbridge.com/dist/leaflet.markercluster-src.js"></script>
   
  </head>
  <body>
  <br><br><br><br><br><br>
   <div id="about" class="container-fluid">
		<div class="row">
			<div class="col-sm-2">
				<button class="btn btn-default btn-block">All Menus</button><br>
				<a  href="<?php echo base_url('admin/Locations'); ?>"  class="btn btn-warning btn-block"> Dashboard </a><br>
				<a  href="<?php echo base_url('admin/AdminDashboard'); ?>" class="btn btn-primary btn-block"> Charts </a><br>
				<a  href="<?php echo base_url('admin/Notifications'); ?>"  class="btn btn-primary btn-block">Notifications</a><br>
				<a  href="<?php echo base_url('admin/TrackRecords'); ?>"  class="btn btn-primary btn-block">TrackRecords</a><br>
				
				<a  href="<?php echo base_url('admin/ManageTrainRoutes'); ?>"  class="btn btn-primary btn-block">Manage Train Routes</a><br>
				<a  href="<?php echo base_url('admin/ManageTrains'); ?>"  class="btn btn-primary btn-block">Manage Trains</a><br>
				<a  href="<?php echo base_url('admin/ManageEmployees'); ?>"  class="btn btn-primary btn-block">Manage Employees</a><br>	
			</div>
			<div class ="col-sm-10">
				<div class="main_div">
					<div id="map"></div>
				</div>
			</div>
		</div>
	</div>
<!------------------------------------MAIN MODAL --------------------------------------------------------------->
<!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="view-modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title" style="color:white">View Bin data</h4>
        </div>
        <div class="view-modal-body">
		<center>
         <div class="row" id="show_data">
			<div class="row">
				
				
			</div>
		 </div>
		</center> 
        </div>
       <!-- <div class="view-modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div> -->
      </div>
    </div>
  </div>
<!------------------------------------MAIN MODAL --------------------------------------------------------------->

	<script type="text/javascript">
		
		/* var kits = [{"UserId":"1","FirstName":"Smart","LastName":"Waste Management","Email":"kit1@gmail.com","Password":"e10adc3949ba59abbe56e057f20f883e","KitID":"11935964677","MobileNo":"1234567890","Location":"Hyderabad, Telangana, India","Latitude":"17.3850","Longitude":"78.4867","Status":"1","CreatedOn":"2016-08-25 03:11:26","UpdatedOn":"25 Aug 2016"}] ; */
		
		var kits = <?php echo json_encode($kits); ?> ;
		// alert(kits.UserId);
		var tiles = L.tileLayer('http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
				maxZoom: 18
			}),
			latlng = L.latLng(17.3850, 78.4867);
		var img ='http://maps.google.com/mapfiles/ms/icons/green-dot.png';
		var map = L.map('map', {center: latlng, zoom: 5, layers: [tiles]});
		var markers = L.markerClusterGroup({spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false, icon:img });

		function populate() {
			$.each(kits,function(i){
				var row = kits[i];
				var Latitude_d = '';
				var Longitude_d = '' ;
				Latitude_d = row.field1 ;
				Latitude_d = Latitude_d.substring(0, 7);
				Longitude_d = row.field2 ;
				Longitude_d = Longitude_d.substring(0, 7);
				
				
				var latlog = L.latLng(Latitude_d , Longitude_d);
				//var latlog = getRandomLatLng(map);
				var m = L.marker(latlog);
				markers.addLayer(m);
				var design = '';
				var Status = '';
				var empname ='';
				Status = parseInt(row.Status);
				if(Status == 1)
				{
					empname = "Crack is Under Verification by "+row.FirstName+ ' ' +row.LastName;
				}
				if(Status == 0)
				{
					empname="";
				}
				
				design += '<div class="popup_top sck"><g class="popup_name">'+row.TrainName+' '+row.TrainNumber+'</g><br><g class="popup_kit">Railway Track</g><br><g class="popup_kit">Crack Detected Date : '+row.DetectedOn+'</g><br><g class="popup_kit">'+empname+'</g></div><div class="popup_bottom"><g class="popup_name"><i class="fa fa-map-marker"></i> '+row.address+'</g><br><g class="popup_status">Active</a> &nbsp;&nbsp </div>';
				 /* <a href="javascript:void(0)"><span class="badge" onclick="view_sensors('+row.recordID+')">View Sensors</span></a> */
				m.bindPopup(design).openPopup();
					
			})

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
		//**********************************************MAPPING CODE ENDS**********************************************
		function view_sensors(id)
		{
			
			$.ajax({
				url   : "",
				data  : {'Role':'GET_SENSORS','UserKey':id},
				type  : "POST",
				success : function (data)
				{
					$('#show_data').html(data);
					$('#myModal').modal('show');
				}
			})
			
		}
	
		
	</script>
  </body>
</html>
