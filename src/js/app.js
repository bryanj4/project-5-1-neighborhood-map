/* Observable model for each Location/Marker*/
var Location = function( initData ) {
    this.name = ko.observable( initData.name || '' );
    this.address = ko.observable( initData.addr || '' );
    this.wiki = ko.observable( initData.wiki || '' );
    this.type = ko.observable( initData.type || 5 );
                                    /* 0 - Historical Marker
                                       1 - Information Center
                                       2 - Restaurant
                                       3 - Transportation Hub bus/train/airport
                                       4 - Church
                                       5 - Other
                                     */
    this.yelp = ko.observable( this.type == 2 );
    this.europeana = ko.observable( this.type() === 0 );
    this.website = ko.observable( initData.site || '' );
};
/* TODO: Container of Markers to filter through the markers */



/*TODO: Router part of the program*/



/*TODO: View part for marker*/



/*TODO: View part for the Map*/



/*TODO: Part of the app that starts everything*/
