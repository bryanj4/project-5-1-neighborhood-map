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

var Location = function( initData , marker) {
    var self = this;
    self.name =  initData.name || '' ;
    self.address = initData.address || [""] ;
    self.wiki = initData.wiki || '' ;
    self.type = initData.type || 5;
                                    /* 0 - Historical Marker
                                       1 - Information Center
                                       2 - Restaurant
                                       3 - Transportation Hub bus/train/airport
                                       4 - Church
                                       5 - Other
                                     */
    self.website = initData.website || '';
    self.keywords = initData.keywords || [];
    self.visible = true;
    self.marker = marker; // TODO: will be Marker object
    self.wikiDisplay = "";
};
Location.prototype = Object.create(Object.prototype);
Location.prototype.constructor = Location;

Location.prototype.search = function(partial) {
    var self = this;
    if (self.name.toLowerCase().includes(partial)) {
        self.visible(true);
        return true;
    } else {
        for (var i = self.keywords.length - 1; i >= 0; i--) {
            if(self.keywords[i].toLowerCase().includes(partial)) {
                return true;
            }
        }
        self.visible = false;
        return false;
    }
};

// Sets wikiDisplay in addition to website URL
Location.prototype.wikiGet = function() {
    var self = this;
    var baseurl = 'https://en.wikipedia.org/w/api.php';
    var content = '<h3>%TITLE%</h3><p>%DESCRIPTION</p><p>Find out more <a href="%WIKIURL%">here</a> at Wikipedia or <a href="%WEBURL%">here</a> at the home page.</p>';

    $.ajax({
        url: baseurl + '?action=opensearch&search=' + self.name + '&format=json',
        type: 'GET',
        dataType: 'jsonp'
        })
        .done(function(data) {
            // TODO: Look up format type and enter it to replace the Title, description, wikiurl, and website url
            // content = content.replace('%TITLE%', );
            content = content.replace('%WEBURL%', self.website);
            if (self.wiki != "none") {
                for (var i = data[3].length - 1; i >= 0; i--) {
                    if( data[3][i] == self.wiki ){
                        content = content.replace('%DESCRIPTION%', data[2][i]);
                        content = content.replace('%WIKIURL%', self.wiki);
                        self.wikiDisplay = content;
                        break;
                    }
                }
            } else {
                var failed = '<h3>%NAME%</h3><p>Could not find any data from Wikipedia from this location but you can go to the website <a href="%WEBURL%">here</a></p>';
                failed = failed.replace('%NAME%', self.name);
                failed = failed.replace('%WEBURL%', self.website);
                self.wikiDisplay = failed;
            }
        })
        .fail(function (data) {
            var failed = '<h3>%NAME%</h3><p>Could not find any data from Wikipedia from this location but you can go to the website <a href="%WEBURL%">here</a></p>';
            failed = failed.replace('%NAME%', self.name);
            failed = failed.replace('%WEBURL%', self.website);
            self.wikiDisplay = failed;
        })
        .always(function (data) {
            console.log("Complete");
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
    self.placeService = new google.maps.places.PlacesService(self.map);

    /*TODO: View part for marker*/



}

function initialize() {
    var main = new MainViewModel(locationData);
    fixerio_api(main.currencies);
    ko.applyBindings(main);
}
function initD() {
    google.maps.event.addDomListener(window, "load", initialize);
    console.log("Runs on ready!");
    console.log("BUTTHEAD");
}