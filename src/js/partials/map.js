(() => {
	"use strict";

	const hackSetter = (value) => () => {
		window.name = value;
		history.go(0)
	};

	/*const startBtn = document.querySelector('.start-hack');
	const stopBtn = document.querySelector('.stop-hack');

	startBtn.addEventListener('click', hackSetter(), false);
	stopBtn.addEventListener('click', hackSetter('nothacked'), false);

	if (name === 'nothacked') {
	  stopBtn.disabled = true;
	  return;
	}

	startBtn.disabled = true;
  */
	// Store old reference
	const appendChild = Element.prototype.appendChild;

	// All services to catch
	const urlCatchers = [
		"/AuthenticationService.Authenticate?",
		"/QuotaService.RecordEvent?"
	];

	// Google Map is using JSONP.
	// So we only need to detect the services removing access and disabling them by not
	// inserting them inside the DOM
	Element.prototype.appendChild = function (element) {
		const isGMapScript = element.tagName === 'SCRIPT' && /maps\.googleapis\.com/i.test(element.src);
		const isGMapAccessScript = isGMapScript && urlCatchers.some(url => element.src.includes(url));

		if (!isGMapAccessScript) {
			return appendChild.call(this, element);
		}

		// Extract the callback to call it with success data
		// (actually this part is not needed at all but maybe in the future ?)
		//const callback = element.src.split(/.*callback=([^\&]+)/, 2).pop();
		//const [a, b] = callback.split('.');
		//window[a][b]([1, null, 0, null, null, [1]]);

		// Returns the element to be compliant with the appendChild API
		return element;
	};
})();


var homepageMapObject = -1,
	markers = -1,
	markerCluster = -1,
	locations = -1


var mapDarkStylesContactsPage = [
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#a0ab7b"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#333333"
            },
            {
                "weight": "6.68"
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
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
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
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
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
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#a0ab7b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a0ab7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "weight": "0.09"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "1.59"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
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
var mapLightStylesContactsPage = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4F542D"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#ff0000"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "-81"
            },
            {
                "color": "#000000"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "6.00"
            },
            {
                "color": "#f0f0ed"
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
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#F0F0ED"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#4f542d"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f0f0ed"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#4f542d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "weight": "0.09"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#F0F0ED"
            }
        ]
    }
];

var mapDarkStyles = [

	/*{
		"featureType": "all",
		"elementType": "labels.icon",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},*/
	{
		"featureType": "all",
		"elementType": "labels.text",
		"stylers": [
			{
				"visibility": "on"
			}
		]
	},
	{
		"featureType": "all",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#a0ab7b"
			}
		]
	},
	{
		"featureType": "all",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"color": "#333333"
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
	/*{
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
	},*/

	{
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
	{
		"featureType": "transit",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
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
		"elementType": "geometry.fill",
		"stylers": [
			{
				"weight": "2.00"
			}
		]
	},
	{
		"featureType": "all",
		"elementType": "geometry.stroke",
		"stylers": [
			{
				"color": "#4F542D"
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
		"featureType": "all",
		"elementType": "labels.text",
		"stylers": [
			{
				"visibility": "on"
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "all",
		"stylers": [
			{
				"color": "#f2f2f2"
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#F0F0ED"
			}
		]
	},
	{
		"featureType": "landscape.man_made",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#F0F0ED"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			}

		]
	},

	{
		"featureType": "transit",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "all",
		"stylers": [
			{
				"color": "#46bcec"
			},
			{
				"visibility": "on"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#c8d7d4"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#070707"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"color": "#F0F0ED"
			}
		]
	}
];

var mapIconLabelColor = {
	'color-theme-dark': "rgba(255,255,255,0.9)",
	//'color-theme-light': "rgba(37, 41, 36, 1)"
	'color-theme-light': "rgba(160, 171, 123, 1)"
};



var mapStyles = {
	'color-theme-dark': mapDarkStylesContactsPage,
	'color-theme-light': mapLightStylesContactsPage
};

if(typeof(isSimpleMapStyle)!=='undefined' && isSimpleMapStyle===true){
	mapStyles = {
		'color-theme-dark': mapDarkStyles,
		'color-theme-light': mapLightStyles
	};
}

function initMarkers() {

	markers = locations.map((position) => {
		const marker = new google.maps.Marker({
			position,
			map: homepageMapObject,
			icon: {
				url: mapIconSource[globalColorThemeName],
				scaledSize: {
					height: 92,
					width: 74
				},
				anchor: new google.maps.Point(37, 63),
			},
		});

		return marker;
	});


	class customClusterRenderer extends markerClusterer.DefaultRenderer {
		render(
			{ count, position },
			stats
		) {
			/*// change color if this cluster has more markers than the mean cluster
			const color =
				count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#910022";

			// create svg url with fill color
			const svg = window.btoa(`
			<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
				<circle cx="120" cy="120" opacity=".6" r="70" />
				<circle cx="120" cy="120" opacity=".3" r="90" />
				<circle cx="120" cy="120" opacity=".2" r="110" />
			</svg>`);*/

			// create marker using svg icon
			return new google.maps.Marker({
				position,
				/*icon: {
					url: `data:image/svg+xml;base64,${svg}`,
					scaledSize: new google.maps.Size(45, 45),
				},*/
				icon: {
					url: mapIconSource[globalColorThemeName],
					scaledSize: {
						height: 92,
						width: 74
					},
					anchor: new google.maps.Point(37, 63),
					labelOrigin: new google.maps.Point(38, 22),
				},
				label: {
					text: String(count),
					color: mapIconLabelColor[globalColorThemeName],
					fontSize: "14px",
					fontFamily: 'Ubuntu,sans-serif',
					fontWeight: '700'
				},
				//title: `Cluster of ${count} markers`,
				// adjust zIndex to be above other markers
				zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
			});
		}
	}

	markerCluster = new markerClusterer.MarkerClusterer({
		map: homepageMapObject,
		markers: markers,
		renderer: new customClusterRenderer()
		/*{
			styles: [{
				url: './images/map_icon_v2t.png',
				textColor: 'white',
				height: 92,
				width: 74
			} ]

		}*/

	});
}

function clearMarkers() {
	markerCluster.setMap(null);
}
/*
function refreshMarkersColorTheme() {
	markers.forEach(function (element) {
		element.setIcon({
			url: mapIconSource[globalColorThemeName],
			scaledSize: {
				height: 92,
				width: 74
			},
			anchor: new google.maps.Point(37, 63),
		});
	});

	homepageMapObject.setZoom(homepageMapObject.getZoom() + 1);
	setTimeout(function () {
		homepageMapObject.setZoom(homepageMapObject.getZoom() - 1);
		markerCluster = new markerClusterer.MarkerClusterer({
			map: homepageMapObject,
			markers: markers,
			renderer: new customClusterRenderer()

		});
	}, 300);


}*/

window.addEventListener('load', () => {
	const mapMain = document.getElementById('map');
	const mapContacts = document.getElementById('map-contacts');
	if ($('#map, #map-contacts').length === 0) {
		return;
	}
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
		{ lat: 56.311376, lng: 44.022641 },
	]
	const locationsContacts = [
		{ lat: 55.768976, lng: 37.670347 }
	]

	function initMap(el, lat, lng, zoom, newLocs) {

		colorThemeName = 'color-theme-dark';
		if (localStorage.hasOwnProperty('colorThemeName')) {
			let lsThemeName = localStorage.getItem('colorThemeName');
			if (lsThemeName && lsThemeName.length > 0) {
				colorThemeName = lsThemeName;
			}
		}
		globalColorThemeName = colorThemeName;

		locations = newLocs;


		const options = {
			center: { lat, lng },
			zoom,
			disableDefaultUI: true,
			styles: mapStyles[colorThemeName]

		};

		homepageMapObject = new google.maps.Map(el, options);

		const infoWindow = new google.maps.InfoWindow({
			content: "",
			disableAutoPan: true,
		});

		//initMarkers(map, all_locations, image);
		initMarkers();
	}

	if (mapMain) {
		initMap(mapMain, 65.061313, 101.477485, 3, locationsMain);
	}

	if (mapContacts) {
		initMap(mapContacts, 55.768741, 37.672267, 17, locationsContacts);
	}
});