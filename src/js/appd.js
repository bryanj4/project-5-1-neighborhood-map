var locationData = {
    "rome-app": [ {
    "name": "Colosseum",
    "address": ["Piazza del Colosseo, Rome, Italy"],
    "website": "http://www.coopculture.it/en/the-colosseum.cfm",
    "wiki": "https://en.wikipedia.org/wiki/Colosseum",
    "type": 0,
    "keywords": [
        "gladiator",
        "fight",
        "ring",
        "games",
        "sport"
    ]
    }, {
    "name": "Pantheon, Rome",
    "address": ["Piazza della Rotonda Rome, Italy"],
    "website": "http://www.turismoroma.it/cosa-fare/pantheon?lang=en",
    "wiki": "https://en.wikipedia.org/wiki/Pantheon,_Rome",
    "type": 0,
    "keywords": [
        "church",
        "dome",
        "temple"
    ]
    }, {
    "name": "St. Peter's Basilica",
    "address": ["Piazza San Pietro, 00120 Città del Vaticano, Vatican City"],
    "website": "http://www.vaticanstate.va/content/vaticanstate/en/monumenti/basilica-di-s-pietro.html",
    "wiki": "https://en.wikipedia.org/wiki/St._Peter%27s_Basilica",
    "type": 0,
    "keywords": [
        "church",
        "basilica",
        "vatican",
        "pope",
        "peter",
        "saint"
    ]
    }, {
    "name": "Pyramid of Cestia",
    "address": ["Via Raffaele Persichetti, 00153 Roma, Italy"],
    "website": "http://www.coopculture.it/en/heritage.cfm?id=59",
    "wiki": "https://en.wikipedia.org/wiki/Pyramid_of_Cestius",
    "type": 0,
    "keywords": [
        "pyramid",
        "gaius",
        "cestius",
        "tomb",
        "ruins"
    ]
    }, {
    "name": "Underground Basilica of Porta Maggiore",
    "address": ["Piazzale Labicano angolo via Prenestina, Via Prenestina, Roma, Italy"],
    "website": "http://archeoroma.beniculturali.it/en/archaeological-site/underground-basilica-near-porta-maggiore",
    "wiki": "https://en.wikipedia.org/wiki/Underground_basilica_of_Porta_Maggiore",
    "type": 0,
    "keywords": [
        "basilica",
        "underground",
        "neopythagoreans"
    ]
    }, {
    "name": "Palazzo Delle Esposizioni",
    "address": ["Via Nazionale, 194, 00184 Roma, Italy"],
    "website": "http://english.palazzoesposizioni.it/Home.aspx",
    "wiki": "https://en.wikipedia.org/wiki/Palazzo_delle_Esposizioni",
    "type": 0,
    "keywords": [
        "exhibition",
        "hall",
        "cultural",
        "center",
        "museum"
    ]
    }, {
    "name": "Palatine Hill",
    "address": ["Via della Salara Vecchia, 5/6, Roma, Italy"],
    "website": "http://www.coopculture.it/en/heritage.cfm?id=4",
    "wiki": "https://en.wikipedia.org/wiki/Palatine_Hill",
    "type": 0,
    "keywords": [
        "palatine",
        "hill",
        "forum",
        "ruins",
        "ancient",
        "rome"
    ]
    }, {
    "name": "Tourist Information Centers",
    "address": [
        "Via Giovanni Giolitti 34, Roma, Italy",
        "Via di San Basilio 51, Roma, Italy",
        "Palazzo delle Esposizioni, Roma, Italy",
        "Via dei Fori Imperiali, Roma, Italy"
    ],
    "website": "http://www.turismoroma.it/info_viaggio/pit",
    "wiki": "none",
    "type": 1,
    "keywords": [
        "information",
        "center",
        "pit",
        "point"
    ]
    }, {
    "name":"Leonardo da Vinci–Fiumicino Airport",
    "address":["Via dell' Aeroporto di Fiumicino, 320, 00054 Fiumicino RM, Italy"],
    "website":"http://www.adr.it/fiumicino",
    "wiki":"https://en.wikipedia.org/wiki/Leonardo_da_Vinci%E2%80%93Fiumicino_Airport",
    "type": 3,
    "keywords": [
        "airport",
        "ryanair",
        "fiumicino",
        "neos",
        "alitalia",
        "airplanes"
    ]
    }, {
    "name":"Termini Station",
    "address": ["Roma Termini, Italy"],
    "website":"http://www.trenitalia.com/tcom-en",
    "type": 3,
    "keywords": [
        "trains",
        "station",
        "choo"
    ]
    }, {
    "name": "Trevi Fountain",
    "address": ["Piazza di Trevi, 00187 Roma, Italy"],
    "website": "http://www.trevifountain.net/",
    "wiki": "https://en.wikipedia.org/wiki/Trevi_Fountain",
    "type": 0,
    "keywords": [
        "trevi",
        "fountain",
        "wish",
        "salvi",
        "bracci"
    ]
    }
  ]
};




function fixerio_update(currencies) {
    jQuery.getJSON('http://api.fixer.io/latest', function(data) { // EUR is the default base. See fixer.io
        var idTemplate = "#%CURRENCY%-data";
        var tempId;
        for (var i = 0; i < currencies.length; i++) {
            tempId = idTemplate.replace("%CURRENCY%", currencies[i]);
            $(tempId).text(data.rates[currencies[i]]);
        }
        setTimeout(fixerio_update, 300000, currencies);
    });
}

function fixerio_api(currencies) {
    jQuery.getJSON('http://api.fixer.io/latest', function(data) { // EUR is the default base. See fixer.io
        var currency = $('#currenciesTarget');
        var template = "<tr><td>%CURRENCY%</td><td id=\"%CURRENCY%-data\"></td></tr>";
        var template1 = "<tr><td>%CURRENCY%</td><td>%AMOUNT%</td></tr>";
        var idTemplate = "#%CURRENCY%-data";
        var temp = template1.replace("%CURRENCY%", data.base);
        var tempId = idTemplate;
        temp = temp.replace("%AMOUNT%", "1.00");
        currency.append(temp);
        for (var i = 0; i < currencies.length; i++) {
            temp = template.replace("%CURRENCY%", currencies[i]);
            temp = temp.replace("%CURRENCY%", currencies[i]);
            tempId = idTemplate.replace("%CURRENCY%", currencies[i]);
            currency.append(temp);
            $(tempId).text(data.rates[currencies[i]]);
        }
        setTimeout(fixerio_update, 300000, currencies);
    });
}

var Location = function( initData , map) {
    var self = this;
    self.name =  ko.observable(initData.name || '') ;
    self.address = ko.observableArray(initData.address || []);
    self.wiki = ko.observable(initData.wiki || '') ;
    self.type = ko.observable(initData.type || 5);
                                    /* 0 - Historical Marker
                                       1 - Information Center
                                       2 - Restaurant
                                       3 - Transportation Hub bus/train/airport
                                       4 - Church
                                       5 - Other
                                     */
    self.website = ko.observable(initData.website || '');
    self.keywords = ko.observable(initData.keywords || []);
    self.hasMarker = ko.observable(false);
    self.markers = ko.observableArray();
    self.hasInfoWindow = ko.observable(false);
    self.infoWindows = ko.observableArray()
    self.visible = ko.observable(true);
    self.wikiDisplay = ko.observable("");
    self.map = map;
};
Location.prototype = Object.create(Object.prototype);
Location.prototype.constructor = Location;

Location.prototype.addMarker = function (data) {
    var self = this;
    if (data.status == google.maps.GeocoderStatus.OK) {
        for (var i = data.results.length - 1; i >= 0; i--) {
            if (data.results[i].geometry.location_type == "ROOFTOP"){
                var marker = google.maps.Marker({
                    position: data.results.geometry.location,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    title: self.name()
                });
                self.addInfoWindow(marker);
                self.markers().push(marker);
                self.hasMarker(true);
                return 0;
            }
        }
    } else {
        console.log("Error trying to access the Geocoder. Status:", data.status);
    }

    return -1;
};

Location.prototype.addInfoWindow = function(marker) {
    var self = this;
    var infoWinder = new google.maps.InfoWindow({content: self.wikiDisplay()});
    marker.addListener('click', function() {
        infoWinder.open(self.map, marker);
    });
    infoWinder.addListener('closeclick', function() {
        infoWinder.setMarker(null);
    });
    self.infoWindows().push(infoWinder);

};

Location.prototype.isVisible = function(isIt) {
    var self = this;
    self.visible(isIt);
    if (isIt) {
        for (var i = self.markers().length - 1; i >= 0; i--) {
            self.markers()[i].setMap(self.map);
        }
    } else {
        for (var it = self.markers().length - 1; it >= 0; it--) {
            self.markers()[it].setMap(null);
        }
    }
};

Location.prototype.search = function(partial) {
    var self = this;
    if (self.name().toLowerCase().includes(partial)) {
        self.isVisible(true);
        return true;
    } else {
        for (var i = self.keywords().length - 1; i >= 0; i--) {
            if(self.keywords()[i].toLowerCase().includes(partial)) {
                self.isVisible(true);
                return true;
            }
        }
        self.isVisible(false);
        return false;
    }
};

// Sets wikiDisplay in addition to website URL
Location.prototype.wikiGet = function(geo) {
    var self = this;
    var baseurl = 'https://en.wikipedia.org/w/api.php';
    var content = '<h3>%TITLE%</h3><p>%DESCRIPTION</p><p>Find out more <a href="%WIKIURL%">here</a> at Wikipedia or <a href="%WEBURL%">here</a> at the home page.</p>';

    $.ajax({
        url: baseurl + '?action=opensearch&search=' + self.name() + '&format=json',
        type: 'GET',
        dataType: 'jsonp'
        })
        .done(function(data) {
            // TODO: Look up format type and enter it to replace the Title, description, wikiurl, and website url
            // content = content.replace('%TITLE%', );
            content = content.replace('%WEBURL%', self.website);
            if (self.wiki() != "none") {
                for (var i = data[3].length - 1; i >= 0; i--) {
                    if( data[3][i] == self.wiki() ){
                        content = content.replace('%DESCRIPTION%', data[2][i]);
                        content = content.replace('%WIKIURL%', self.wiki);
                        self.wikiDisplay(content);
                        break;
                    }
                }
            } else {
                var failed = '<h3>%NAME%</h3><p>Could not find any data from Wikipedia from this location but you can go to the website <a href="%WEBURL%">here</a></p>';
                failed = failed.replace('%NAME%', self.name());
                failed = failed.replace('%WEBURL%', self.website());
                self.wikiDisplay(failed);
            }
        })
        .fail(function (data) {
            var failed = '<h3>%NAME%</h3><p>Could not find any data from Wikipedia from this location but you can go to the website <a href="%WEBURL%">here</a></p>';
            failed = failed.replace('%NAME%', self.name());
            failed = failed.replace('%WEBURL%', self.website());
            self.wikiDisplay(failed);
        })
        .always(function (data) {

            // for (var i = self.address().length - 1; i >= 0; i--) {
            //     geo.geocode({ address: self.address()[i]}, self.addMarker);
            // }
            console.log("Complete:", self.wikiDisplay());
        });
};

function MainViewModel(jsonFile) {
    // TODO: Connect everything....
    var self = this;

    self.currencies = ['USD', 'CHF', 'GBP', 'AUD', 'CAD', 'CZK'];


    /*TODO: View part for the Map*/
    self.Rome = {lat: 41.9, lng: 12.5};
    self.map = new google.maps.Map(document.getElementById('romeMap'), {
        zoom: 12,
        center: self.Rome
    });
    self.latLngFinder = new google.maps.Geocoder();
    // TODO: Create ObservableArray of each Location from the jsonFile
    self.locale = new Location(jsonFile['rome-app'][0],self.map);

    // for (var i = self.Locations.length - 1; i >= 0; i--) {
    //     self.Locations[i].wikiGet();
    // }
    console.log("before wikiGet()");
    self.locale.wikiGet(self.latLngFinder);
    console.log("after wikiGet()");

    self.setView = function (view) {
        if (true) {
            var bounds = new google.maps.LatLngBounds();
            for (var y = self.locale.markers.length - 1; y >= 0; y--) {
                bounds.extend(self.locale.markers[y].position);
            }
            self.locale.isVisible(true);
            self.map.fitBounds(bounds);
        }
    };

    self.setView();



}

function initialize() {
    var main = new MainViewModel(locationData);
    fixerio_api(main.currencies);
    ko.applyBindings(main);
}
function initD() {
    google.maps.event.addDomListener(window, "load", initialize);
}