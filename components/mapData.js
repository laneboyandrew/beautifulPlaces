const Images = [
    {image: require("../assets/images/image64.png")},
    {image: require("../assets/images/image2.png")},
    {image: require("../assets/images/Vector46.png")},
    {image: require("../assets/images/zvezdopad.jpg")},
    {image: require("../assets/images/Group119.png")}
]

export const markers = [
    {
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486
        },
        title: "Beautiful place 1",
        description: "Beautiful place number one",
        image: Images[0].image,
        rating: 4,
        reviews: 99
    },
    {
        coordinate: {
            latitude: 22.6345648,
            longitude: 88.4377279
        },
        title: "Beautiful place 2",
        description: "Beautiful place number one",
        image: Images[1].image,
        rating: 5,
        reviews: 99
    },
    {
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486
        },
        title: "Beautiful place 3",
        description: "Beautiful place number one",
        image: Images[2].image,
        rating: 1,
        reviews: 99
    },
    {
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486
        },
        title: "Beautiful place 4",
        description: "Beautiful place number one",
        image: Images[3].image,
        rating: 3,
        reviews: 99
    },
    {
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486
        },
        title: "Beautiful place 5",
        description: "Beautiful place number one",
        image: Images[4].image,
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