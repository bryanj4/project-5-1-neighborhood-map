/* Observable model for each Location/Marker*/
var Location = function( initData ) {
    this.name = ko.observable( initData.name || '' );
    this.address = ko.observableArray( initData.address || [""] );
    this.wiki = ko.observable( initData.wiki || '' );
    this.type = ko.observable( initData.type || 5 );
                                    /* 0 - Historical Marker
                                       1 - Information Center
                                       2 - Restaurant
                                       3 - Transportation Hub bus/train/airport
                                       4 - Church
                                       5 - Other
                                     */
    this.website = ko.observable( initData.website || '' );
    this.keywords = ko.observableArray( initData.keywords || []);
    this.visible = ko.observable(true);
};
Location.prototype = Object.create(Object.prototype);
Location.prototype.constructor = Location;

Location.prototype.search = function(partial) {
    if (this.name().toLowerCase().includes(partial)) {
        return true;
    } else {
        for (var i = this.keywords().length - 1; i >= 0; i--) {
            if(this.keywords()[i].toLowerCase().includes(partial)) {
                return true;
            }
        }
        this.visible(false);
        return false;
    }
};



/* TODO: Container of Markers to filter through the markers */
var LocContainer = function ( jsonFile ) {
    var self = this;
    self.locations = ko.observableArray();
    jsonFile["rome-app"].forEach(function (item)  {
        self.locations.push(new Location(item));
    });
};
LocContainer.prototype = Object.create(Object.prototype);
LocContainer.prototype.constructor = LocContainer;

LocContainer.prototype.search = function(word) {
    this.locations().forEach(function (item) {
        if (item.visible) {
            if (item.search(word.toLowerCase())) {

            } else {}
        }

    });
};

LocContainer.prototype.setTypeVisible = function( type ) {
    this.locations().forEach(function (item) {
        if( item.type() != type ) {
            item.visible(false);
        } else {
            item.visible(true);
        }

    });
    console.log("SetTypeVisible " + String(type));
};

LocContainer.prototype.allVisible = function () {
    this.locations().forEach(function (item) {
        item.visible(true);
    });
    console.log("All Visible");
};
function fixerio_update(currencies) {
    jQuery.getJSON('http://api.fixer.io/latest', function(data) { // EUR is the default base. See fixer.io
        var idTemplate = "#%CURRENCY%-data";
        var tempId;
        for (var i = 0; i < currencies.length; i++) {
            tempId = idTemplate.replace("%CURRENCY%", currencies[i]);
            $(tempId).text(data.rates[currencies[i]]);
        }
        setTimeout(fixerio_update, 300000, root);
    });
}
/*DONE: Fixer.io Currency Conversion*/
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

/*TODO: marker data */
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

function CreateMarker(place, map) {
    var marker, infowindow;
    marker = new google.maps.Marker({
        map: map,
        position: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
        title: place.name
    });
}

/*TODO: Part of the app that starts everything*/
function MainViewModel(jsonFile) {
    // TODO: Connect everything....
    var self = this;
    self.container = new LocContainer(jsonFile);
    self.currencies = ['USD', 'CHF', 'GBP', 'AUD', 'CAD', 'CZK'];

    /*TODO: View part for the Map*/
    self.Rome = {lat: 41.9, lng: 12.5};
    self.map = new google.maps.Map(document.getElementById('romeMap'), {
        zoom: 12,
        center: self.Rome
    });
    self.placeService = new google.maps.places.PlacesService(self.map);

    /*TODO: View part for marker*/



}
function initialize() {
    var main = new MainViewModel(locationData);
    fixerio_api(main.currencies);
    ko.applyBindings(main);
    main.container.allVisible();
}
function init() {
    google.maps.event.addDomListener(window, "load", initialize);
    console.log("Runs on ready!");
}