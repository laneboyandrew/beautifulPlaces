
export const currentMarkerIndex = '';
export const markers = [
    {
        coordinate: {
            latitude: 44.457673,
            longitude: 34.088370
        },
        title: "Beautiful place 1",
        description: "Beautiful place number one",
        images: [
            require("../assets/images/plohihK-348ca3c419.jpg"),
            require("../assets/images/image2.png"),
            require("../assets/images/Vector46.png"),
            require("../assets/images/zvezdopad.jpg"),
            require("../assets/images/Group119.png")
        ],
        rating: 4,
        reviews: 99
    },
    {
        coordinate: {
            latitude: 44.522114,
            longitude: 33.468124
        },
        title: "Beautiful place 2",
        description: "Beautiful place number one",
        images: [
            require("../assets/images/plohihK-348ca3c419.jpg"),
            require("../assets/images/image2.png"),
            require("../assets/images/Vector46.png"),
            require("../assets/images/zvezdopad.jpg"),
            require("../assets/images/Group119.png")
        ],
        rating: 5,
        reviews: 99
    },
    {
        coordinate: {
            latitude: 46.031474,
            longitude: 33.840075
        },
        title: "Beautiful place 3",
        description: "Beautiful place number one",
        images: [
            require("../assets/images/image64.png"),
            require("../assets/images/image2.png"),
            require("../assets/images/Vector46.png"),
            require("../assets/images/zvezdopad.jpg"),
            require("../assets/images/Group119.png")
        ],
        rating: 1,
        reviews: 99
    },
    {
        coordinate: {
            latitude: 45.035352,
            longitude: 36.190333
        },
        title: "Beautiful place 4",
        description: "Beautiful place number one",
        images: [
            require("../assets/images/image64.png"),
            require("../assets/images/image2.png"),
            require("../assets/images/Vector46.png"),
            require("../assets/images/zvezdopad.jpg"),
            require("../assets/images/Group119.png")
        ],
        rating: 3,
        reviews: 99
    },
    {
        coordinate: {
            latitude: 44.695316,
            longitude: 33.884410
        },
        title: "Beautiful place 5",
        description: "Beautiful place number one",
        images: [
            require("../assets/images/zvezdopad.jpg"),
            require("../assets/images/image2.png"),
            require("../assets/images/Vector46.png"),
            require("../assets/images/zvezdopad.jpg"),
            require("../assets/images/Group119.png")
        ],
        rating: 2,
        reviews: 99
    },

]

export const mapNightStyle =
    [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#263c3f"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6b9a76"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#38414e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#212a37"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9ca5b3"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#1f2835"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#f3d19c"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2f3948"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#515c6d"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        }
    ]

export const mapStandardStyle = [
    {
        "elementType" : "labels.icon",
        "stylers" : [
            {
                "visibility": "off"
            }
        ]
    }
]