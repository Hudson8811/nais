var homepageMapObject = -1;



var mapDarkStyles = [
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
];


var mapLightStyles = [
	{
		"featureType": "all",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"saturation": 36
			},
			{
				"color": "#F0F0ED"
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
				"color": "#F0F0ED"
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
				"color": "#F0F0ED"
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
				"lightness": 20
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
				"color": "#4F542D"
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
				"color": "#4F542D"
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#F0F0ED"
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
				"color": "#F0F0ED"
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
				"color": "#F0F0ED"
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
				"color": "#F0F0ED"
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
				"color": "#F0F0ED"
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
				"color": "#F0F0ED"
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
				"color": "#F0F0ED"
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
				"color": "#4F542D"
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
				"color": "#F0F0ED"
			}
		]
	}
];

var mapStyles = {
	'color-theme-dark':mapDarkStyles,
	'color-theme-light':mapLightStyles
};


window.addEventListener('load', () => {
	const mapMain = document.getElementById('map');
	const mapContacts = document.getElementById('map-contacts');
	const locationsMain = [
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
	const locationsContacts = [
		{ lat: 55.768976, lng: 37.670347 }
	]

	function initMap(el, lat, lng, zoom, locations) {

		colorThemeName='color-theme-dark';
		if (localStorage.hasOwnProperty('colorThemeName')) {
			let lsThemeName = localStorage.getItem('colorThemeName');
			if(lsThemeName && lsThemeName.length>0){
				colorThemeName=lsThemeName;
			}
		}

		const options = {
			center: { lat, lng },
			zoom,
			disableDefaultUI: true,
			styles: mapStyles[colorThemeName]

		};

		homepageMapObject = new google.maps.Map(el, options);

		const markers = locations.map((position) => {
			const marker = new google.maps.Marker({
				position,
				map: homepageMapObject,
				icon: {
					url: './images/marker.svg'
				}
			});

			return marker;
		});

		const markerCluster = new markerClusterer.MarkerClusterer(homepageMapObject, markers, {
			styles: [{
				url: './images/marker.svg',
				textColor: 'white',
				height: 58,
				width: 43
			}]
		});
	}

	if (mapMain) {
		initMap(mapMain, 65.061313, 101.477485, 3, locationsMain);
	}

	if (mapContacts) {
		initMap(mapContacts, 55.768741, 37.672267, 17, locationsContacts);
	}
});