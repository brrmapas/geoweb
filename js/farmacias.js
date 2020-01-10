var layerFarmacias;
var urlFarmacias = "datos/farmacias.geojson";

function addDatosFarmacias() {

    var puntosCluster = L.markerClusterGroup(); //la variable que crea los clusters

        layerFarmacias  = new L.GeoJSON.AJAX(urlFarmacias, {//concatenamos el texto que queremos ver en las ventanas
            onEachFeature: function (feature, layer) {
                popupContent = "<b>" + feature.properties.EQUIPAMENT + "</b>"+
                "<br>" + feature.properties.TIPUS_VIA +
                ". " + feature.properties.NOM_CARRER +
                " " + feature.properties.NUM_CARRER_1 + "</b>";
                layer.bindPopup(popupContent);
            },
            pointToLayer: function (feature, latlng) {//cambiamos el estilo del punto
                //podríamos intervenir con excepcioes (funciones),  con true or false
                
                puntosCluster.addLayer(L.marker(latlng));//intervenimos generando los clusters
                
                return L.circleMarker(latlng, {
                    radius: 6,
                    fillColor: "#00ff00",
                    color: "#ffffff",
                    weight: 3,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        }).addTo(map);

        map.setView([41.399733,2.168598],13); //cambiamos el zoom de inicio
        
        controlCapas.addOverlay(layerFarmacias,"Farmacias");// son los puntos de las farmacias

        controlCapas.addOverlay(puntosCluster,"Cluster");// son los puntos de los clusters

        var searchControl = new L.Control.Search({
            layer: layerFarmacias,
            initial:false,
            propertyName: 'EQUIPAMENT',
            circleLocation: true,
            moveToLocation: function (latlng) {
                map.setView(latlng, 17);
            }
        });

        searchControl.on('search:locationfound', function(e) { //es el pluggin de búsqueda y zoom a lo selecionado
            e.layer.openPopup();
        });
        map.addControl(searchControl);
}