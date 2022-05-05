window.addEventListener('load', () => {
	const locations = [
		{ lat: 62.037112, lng: 129.729814 },
		{ lat: 62.025972, lng: 129.709701 },
		{ lat: 62.026514, lng: 129.741825 },
		{ lat: 62.018559, lng: 129.717276 },
		{ lat: 56.321337, lng: 43.994564 },
		{ lat: 56.314863, lng: 44.030613 },
		{ lat: 56.294864, lng: 44.019455 },
		{ lat: 56.310769, lng: 44.002289 },
		{ lat: 56.325525, lng: 44.018254 },
		{ lat: 56.311376, lng: 44.022641 }
	]

	function initMap() {
		const mapEl = document.getElementById('map');
		const options = {
			center: { lat: 65.061313, lng: 101.477485 },
			zoom: 3,
			disableDefaultUI: true,
			styles: [
				{
					"featureType": "all",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"saturation": 36
						},
						{
							"color": "#000000"
						},
						{
							"lightness": 40
						}
					]
				},
				{
					"featureType": "all",
					"elementType": "labels.text.stroke",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#000000"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "all",
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"lightness": 17
						},
						{
							"weight": 1.2
						}
					]
				},
				{
					"featureType": "administrative.country",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#a0ab7b"
						}
					]
				},
				{
					"featureType": "administrative.province",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"weight": "1.00"
						},
						{
							"color": "#a0ab7b"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 29
						},
						{
							"weight": 0.2
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 18
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 19
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#151814"
						}
					]
				}
			]
		};
		const map = new google.maps.Map(mapEl, options);

		/*const marker = new google.maps.Marker({
			position: new google.maps.LatLng(55.762886, 37.577924),
			map: map,
			icon: {
				url: './images/marker.svg',
				scaledSize: new google.maps.Size(66, 76)
			}
		});*/
		const markers = locations.map((position) => {
			const marker = new google.maps.Marker({
				position,
				map: map,
				icon: {
					url: './images/marker.svg'
				}
			});

			return marker;
		});

		const markerCluster = new markerClusterer.MarkerClusterer( map, markers, {
			styles: [{
				url: './images/marker.svg',
				textColor: 'white',
				height: 58,
				width: 43
			}]
		});
	}

	window.initMap = initMap();
});