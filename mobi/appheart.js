$(document).ready( function() {		
		var yourStartLatLng = new google.maps.LatLng(59.3426606750, 18.0736160278);
	    $('#map_canvas').gmap({'center': yourStartLatLng});

		//default selected country IN
		var selectedCountryCode = "IN";
		
		$("a[href=#countrylist]").live(
			"click", 
			function(e) {
			var queryString = "requestType=country";
			$.ajax({
			  type: "POST",
			  async:true,
			  url: "http://uat.money2anywhere.com/M2AV3/MobileService",
			  data: queryString,
			  dataType: 'json',
			  success: function(data) {				 		    
					var items=data;				 
					var list = $('#list');
					list.html("");
					var html = '';
					$.each(items, function(key, val) {  				    
						html += '<li ><a href="#searchAgent" data-identity="'+ val.countryCode +'">' + val.countryName + '</a></li>';
					}); 		
					list.append($(html));
					list.listview("destroy").listview();
				}
			});
		});
		
		$("a[href=#searchAgent]").live(
			"click", 
			function(e) {
				selectedCountryCode = $(this).data("identity");
				$("#searchAgent").page();                     
			}
       	);
		
		$("a[href=#branchlocator]").live(
			"click", 
			function(e) {
				var yourStartLatLng = new google.maps.LatLng(59.3426606750, 18.0736160278);
				$('#map_canvas').gmap({'center': yourStartLatLng});                    
			}
       	);

		$('#mapview').live("pageshow", function() { 		
			$('#map_canvas').gmap('refresh');
		});

		$("a[href=#mapview]").live(
			"click", 
			function(e) {				
				var element = $(this).data("identity").split(","); 
				$('#map_view').gmap('addMarker', { 'position': new google.maps.LatLng(element[0], element[1]), 'bounds': true });
				// Once the data is added to the DOM, make the transition
				$('#map_view').gmap('refresh');
				//$.mobile.changePage('#mapview',"slide",false,true);				
		});
		
		$('#search_button').live("click", function(event) {			   
			var langitude = 0.00, latitude = 0.00, distance = 0.00;
			var state = $('#state').val();
			var city = $('#city').val();
			var location = $('#location').val();
			var queryString = "requestType=agent&country=" + selectedCountryCode + "&state=" + state + "&city=" 
			+ city  + "&location=" + location + "&latitude=" + latitude + "&longitude=" + langitude + "&distance=" + distance + "&date=" + new Date();
			$.ajax({
			  type: "POST",
			  async:true,
			  url: "http://uat.money2anywhere.com/M2AV3/MobileService",
			  data: queryString,
			  dataType: 'json',
			  success: function(data) {
				var items=data;				 
				var list = $('#agentlist');
  			    list.html("");
				var html = '';
  				$.each(items, function(key, val) {  
					var temp = val.latitude + ',' +  val.longitude;
				    html += '<li><a href="#mapview" data-identity="' + temp +'">'
							+ '<h3>' + val.agentName + '</h3>'
							+ '<p><strong>' + val.googleAddress + '</strong></p>'
							+ '<p>' + val.agentWorkingHours + '</p>'
							+ '<p>' + val.agentPhone + '</p>'
							+ '</a></li>';
  				});				
				list.append($(html));				
				// Once the data is added to the DOM, make the transition
				$.mobile.changePage('#agentListPage',"slide",false,true);				
				$('#agentlist').listview('refresh');							
			  }
			});			 		
		});
});