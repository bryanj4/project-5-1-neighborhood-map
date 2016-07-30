function fixerio_update(e){jQuery.getJSON("http://api.fixer.io/latest",function(i){for(var a,t="#%CURRENCY%-data",o=0;o<e.length;o++)a=t.replace("%CURRENCY%",e[o]),$(a).text(i.rates[e[o]]);setTimeout(fixerio_update,3e5,e)})}function fixerio_api(e){jQuery.getJSON("http://api.fixer.io/latest",function(i){var a=$("#currenciesTarget"),t='<tr><td>%CURRENCY%</td><td id="%CURRENCY%-data"></td></tr>',o="<tr><td>%CURRENCY%</td><td>%AMOUNT%</td></tr>",n="#%CURRENCY%-data",r=o.replace("%CURRENCY%",i.base),s=n;r=r.replace("%AMOUNT%","1.00"),a.append(r);for(var l=0;l<e.length;l++)r=t.replace("%CURRENCY%",e[l]),r=r.replace("%CURRENCY%",e[l]),s=n.replace("%CURRENCY%",e[l]),a.append(r),$(s).text(i.rates[e[l]]);setTimeout(fixerio_update,3e5,e)})}function MainViewModel(e){var i=this;i.currencies=["USD","CHF","GBP","AUD","CAD","CZK"],i.searchTerm=ko.observable(""),i.Rome={lat:41.9,lng:12.5},i.map=new google.maps.Map(document.getElementById("romeMap"),{zoom:13,center:i.Rome,clickableIcons:!1}),i.latLngFinder=new google.maps.Geocoder,i.container=ko.observable(new LocContainer(e,i.map)),i.container().wikiGets(i.latLngFinder),i.setView=function(e){i.container().setView(e)},i.searchIt=function(){i.container().search(i.searchTerm()),console.log(i.searchTerm())},i.setView(0)}function initialize(){main=new MainViewModel(locationData),fixerio_api(main.currencies),ko.applyBindings(main)}function initMap(){google.maps.event.addDomListener(window,"load",initialize)}var locationData={"rome-app":[{name:"Colosseum",address:["Piazza del Colosseo, Rome, Italy"],website:"http://www.coopculture.it/en/the-colosseum.cfm",wiki:"https://en.wikipedia.org/wiki/Colosseum",type:0,keywords:["gladiator","fight","ring","games","sport"]},{name:"Pantheon, Rome",address:["Piazza della Rotonda, 00186 Roma, Italy"],website:"http://www.turismoroma.it/cosa-fare/pantheon?lang=en",wiki:"https://en.wikipedia.org/wiki/Pantheon,_Rome",type:0,keywords:["church","dome","temple"]},{name:"St. Peter's Basilica",address:["Piazza San Pietro, 00120 Città del Vaticano, Vatican City"],website:"http://www.vaticanstate.va/content/vaticanstate/en/monumenti/basilica-di-s-pietro.html",wiki:"https://en.wikipedia.org/wiki/St._Peter%27s_Basilica",type:0,keywords:["church","basilica","vatican","pope","peter","saint"]},{name:"Pyramid of Cestia",address:["Via Raffaele Persichetti, 00153 Roma, Italy"],website:"http://www.coopculture.it/en/heritage.cfm?id=59",wiki:"https://en.wikipedia.org/wiki/Pyramid_of_Cestius",type:0,keywords:["pyramid","gaius","cestius","tomb","ruins"]},{name:"Underground Basilica of Porta Maggiore",address:["Piazzale Labicano angolo via Prenestina, Via Prenestina, Roma, Italy"],website:"http://archeoroma.beniculturali.it/en/archaeological-site/underground-basilica-near-porta-maggiore",wiki:"https://en.wikipedia.org/wiki/Underground_basilica_of_Porta_Maggiore",type:0,keywords:["basilica","underground","neopythagoreans"]},{name:"Palazzo Delle Esposizioni",address:["Via Nazionale, 194, 00184 Roma, Italy"],website:"http://english.palazzoesposizioni.it/Home.aspx",wiki:"https://en.wikipedia.org/wiki/Palazzo_delle_Esposizioni",type:0,keywords:["exhibition","hall","cultural","center","museum"]},{name:"Palatine Hill",address:["Via della Salara Vecchia, 5/6, Roma, Italy"],website:"http://www.coopculture.it/en/heritage.cfm?id=4",wiki:"https://en.wikipedia.org/wiki/Palatine_Hill",type:0,keywords:["palatine","hill","forum","ruins","ancient","rome"]},{name:"Tourist Information Centers",address:["Via Giovanni Giolitti 34, Roma, Italy"],website:"http://www.turismoroma.it/info_viaggio/pit",wiki:"none",type:1,keywords:["information","center","pit","point"]},{name:"Termini Station",address:["Roma Termini, Italy"],website:"http://www.trenitalia.com/tcom-en",wiki:"none",type:3,keywords:["trains","station","choo"]},{name:"Trevi Fountain",address:["Piazza di Trevi, 00187 Roma, Italy"],website:"http://www.trevifountain.net/",wiki:"https://en.wikipedia.org/wiki/Trevi_Fountain",type:0,keywords:["trevi","fountain","wish","salvi","bracci"]}]},Location=function(e,i){var a=this;a.name=i.name||"",a.address=i.address||[],a.wiki=i.wiki||"",a.type=i.type||0,a.website=i.website||"",a.keywords=i.keywords||[],a.hasMarker=!1,a.markers=[],a.hasInfoWindow=!1,a.visible=!0,a.wikiDisplay="",a.map=e};Location.prototype=Object.create(Object.prototype),Location.prototype.constructor=Location,Location.prototype.addMarker=function(e,i){var a=this;if(i==google.maps.GeocoderStatus.OK){for(var t=-1,o=-1,n=-1,r=0,s=e.length-1;s>=0;s--){var l=e[s].geometry.location_type;"ROOFTOP"==l?t=s:"GEOMETRIC_CENTER"==l?n=s:"APPROXIMATE"==l&&(o=s)}t>=0?r=t:o>=0?r=o:n>=0&&(r=n),a.markers.push(new google.maps.Marker({position:{lat:e[r].geometry.location.lat(),lng:e[r].geometry.location.lng()},draggable:!1,animation:google.maps.Animation.DROP,map:a.map,title:a.name})),a.hasInfoWindow||(a.infoWindow=new google.maps.InfoWindow({content:a.wikiDisplay}),a.hasInfoWindow=!0);var c=a.markers.length-1;return a.markers[c].addListener("click",function(){null!==a.markers[c].getAnimation()?(a.markers[c].setAnimation(null),a.infoWindow.close()):(a.markers[c].setAnimation(google.maps.Animation.BOUNCE),a.infoWindow.open(a.map,a.markers[c]))}),a.infoWindow.addListener("closeclick",function(){a.infoWindow.close(),a.markers[c].setAnimation(null)}),a.hasMarker=!0,0}return console.log("Error trying to access the Geocoder. Status:",i),-1},Location.prototype.isVisible=function(e){var i=this;if(i.visible=e,e)for(var a=i.markers.length-1;a>=0;a--)i.markers[a].setMap(i.map);else for(var t=i.markers.length-1;t>=0;t--)i.markers[t].setMap(null)},Location.prototype.search=function(e){var i=this,a=e.toLowerCase();if(0===a.length)return i.isVisible(!0),!0;if(i.name.toLowerCase().includes(a))return i.isVisible(!0),!0;for(var t=i.keywords.length-1;t>=0;t--)if(i.keywords[t].toLowerCase().includes(a))return i.isVisible(!0),!0;return i.isVisible(!1),!1},Location.prototype.wikiGet=function(e){var i=this,a="https://en.wikipedia.org/w/api.php";$.ajax({url:a+"?action=opensearch&search="+i.name+"&format=json",type:"GET",dataType:"jsonp"}).done(function(e){var a='<h3>%TITLE%</h3><p>%DESCRIPTION%</p><p>Find out more <a href="%WIKIURL%">here</a> at Wikipedia or <a href="%WEBURL%">here</a> at the home page.</p>';if(a=a.replace("%WEBURL%",i.website),"none"!=i.wiki){for(var t=e[3].length-1;t>=0;t--)if(e[3][t]==i.wiki){a=a.replace("%TITLE%",e[1][t]),a=a.replace("%DESCRIPTION%",e[2][t]),a=a.replace("%WIKIURL%",i.wiki),i.wikiDisplay=a;break}}else{var o='<h3>%NAME%</h3><p>Could not find any data from Wikipedia from this location but you can go to the website <a href="%WEBURL%">here</a></p>';o=o.replace("%NAME%",i.name),o=o.replace("%WEBURL%",i.website),i.wikiDisplay=o}}).fail(function(e){console.log("Failed AJAX request");var a='<h3>%NAME%</h3><p>Could not find any data from Wikipedia from this location but you can go to the website <a href="%WEBURL%">here</a></p>';a=a.replace("%NAME%",i.name),a=a.replace("%WEBURL%",i.website),i.wikiDisplay=a}).always(function(a){for(var t=i.address.length-1;t>=0;t--)e.geocode({address:i.address[t]},function(e,a){i.addMarker(e,a),"ZERO_RESULTS"==a&&console.log(e.toString())})})};var LocContainer=function(e,i){var a=this;a.map=i,a.locations=ko.observableArray(),e["rome-app"].forEach(function(e){a.locations.push(new Location(a.map,e))})};LocContainer.prototype=Object.create(Object.prototype),LocContainer.prototype.constructor=LocContainer,LocContainer.prototype.setView=function(e){for(var i=this,a=0;a<i.locations().length;a++)i.locations()[a].type==e?i.locations()[a].isVisible(!0):2===e?i.locations()[a].isVisible(!0):i.locations()[a].isVisible(!1)},LocContainer.prototype.wikiGets=function(e){for(var i=this,a=i.locations().length-1;a>=0;a--)i.locations()[a].wikiGet(e)},LocContainer.prototype.search=function(e){for(var i=this,a=i.locations().length-1;a>=0;a--)i.locations()[a].search(e)};var main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGQuanMiXSwibmFtZXMiOlsiZml4ZXJpb191cGRhdGUiLCJjdXJyZW5jaWVzIiwialF1ZXJ5IiwiZ2V0SlNPTiIsImRhdGEiLCJ0ZW1wSWQiLCJpZFRlbXBsYXRlIiwiaSIsImxlbmd0aCIsInJlcGxhY2UiLCIkIiwidGV4dCIsInJhdGVzIiwic2V0VGltZW91dCIsImZpeGVyaW9fYXBpIiwiY3VycmVuY3kiLCJ0ZW1wbGF0ZSIsInRlbXBsYXRlMSIsInRlbXAiLCJiYXNlIiwiYXBwZW5kIiwiTWFpblZpZXdNb2RlbCIsImpzb25GaWxlIiwic2VsZiIsInRoaXMiLCJzZWFyY2hUZXJtIiwia28iLCJvYnNlcnZhYmxlIiwiUm9tZSIsImxhdCIsImxuZyIsIm1hcCIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiem9vbSIsImNlbnRlciIsImNsaWNrYWJsZUljb25zIiwibGF0TG5nRmluZGVyIiwiR2VvY29kZXIiLCJjb250YWluZXIiLCJMb2NDb250YWluZXIiLCJ3aWtpR2V0cyIsInNldFZpZXciLCJ2aWV3Iiwic2VhcmNoSXQiLCJzZWFyY2giLCJjb25zb2xlIiwibG9nIiwiaW5pdGlhbGl6ZSIsIm1haW4iLCJsb2NhdGlvbkRhdGEiLCJhcHBseUJpbmRpbmdzIiwiaW5pdE1hcCIsImV2ZW50IiwiYWRkRG9tTGlzdGVuZXIiLCJ3aW5kb3ciLCJyb21lLWFwcCIsIm5hbWUiLCJhZGRyZXNzIiwid2Vic2l0ZSIsIndpa2kiLCJ0eXBlIiwia2V5d29yZHMiLCJMb2NhdGlvbiIsImluaXREYXRhIiwiaGFzTWFya2VyIiwibWFya2VycyIsImhhc0luZm9XaW5kb3ciLCJ2aXNpYmxlIiwid2lraURpc3BsYXkiLCJwcm90b3R5cGUiLCJPYmplY3QiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsImFkZE1hcmtlciIsInN0YXR1cyIsIkdlb2NvZGVyU3RhdHVzIiwiT0siLCJyb29mVG9wIiwiYXBwcm94IiwiZ2VvQ2VudGVyIiwicHJvcGVyTG9jYXRpb24iLCJsb2NfdHlwZSIsImdlb21ldHJ5IiwibG9jYXRpb25fdHlwZSIsInB1c2giLCJNYXJrZXIiLCJwb3NpdGlvbiIsImxvY2F0aW9uIiwiZHJhZ2dhYmxlIiwiYW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwiRFJPUCIsInRpdGxlIiwiaW5mb1dpbmRvdyIsIkluZm9XaW5kb3ciLCJjb250ZW50IiwibGVuTWFyayIsImFkZExpc3RlbmVyIiwiZ2V0QW5pbWF0aW9uIiwic2V0QW5pbWF0aW9uIiwiY2xvc2UiLCJCT1VOQ0UiLCJvcGVuIiwiaXNWaXNpYmxlIiwiaXNJdCIsInNldE1hcCIsIml0IiwicGFydGlhbCIsInBhcnRpYWxkIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsIndpa2lHZXQiLCJnZW8iLCJiYXNldXJsIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwiZG9uZSIsImZhaWxlZCIsImZhaWwiLCJhbHdheXMiLCJnZW9jb2RlIiwidG9TdHJpbmciLCJqc29uRGF0YSIsImxvY2F0aW9ucyIsIm9ic2VydmFibGVBcnJheSIsImZvckVhY2giLCJpdGVtIiwic3RyaW5neSJdLCJtYXBwaW5ncyI6IkFBNElBLFFBQVNBLGdCQUFlQyxHQUNwQkMsT0FBT0MsUUFBUSw2QkFBOEIsU0FBU0MsR0FHbEQsSUFBSyxHQUREQyxHQURBQyxFQUFhLG1CQUVSQyxFQUFJLEVBQUdBLEVBQUlOLEVBQVdPLE9BQVFELElBQ25DRixFQUFTQyxFQUFXRyxRQUFRLGFBQWNSLEVBQVdNLElBQ3JERyxFQUFFTCxHQUFRTSxLQUFLUCxFQUFLUSxNQUFNWCxFQUFXTSxJQUV6Q00sWUFBV2IsZUFBZ0IsSUFBUUMsS0FJM0MsUUFBU2EsYUFBWWIsR0FDakJDLE9BQU9DLFFBQVEsNkJBQThCLFNBQVNDLEdBQ2xELEdBQUlXLEdBQVdMLEVBQUUscUJBQ2JNLEVBQVcsNkRBQ1hDLEVBQVksZ0RBQ1pYLEVBQWEsbUJBQ2JZLEVBQU9ELEVBQVVSLFFBQVEsYUFBY0wsRUFBS2UsTUFDNUNkLEVBQVND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QyxFQUFLeUcsWUFBWXpILEdBQUdvRyxXQUFVLEdBRTlCcEYsRUFBS3lHLFlBQVl6SCxHQUFHb0csV0FBVSxJQUsxQ2hFLGFBQWE4QixVQUFVN0IsU0FBVyxTQUFVd0UsR0FFeEMsSUFBSyxHQUREN0YsR0FBT0MsS0FDRmpCLEVBQUlnQixFQUFLeUcsWUFBWXhILE9BQVMsRUFBR0QsR0FBSyxFQUFHQSxJQUM5Q2dCLEVBQUt5RyxZQUFZekgsR0FBRzRHLFFBQVFDLElBSXBDekUsYUFBYThCLFVBQVV6QixPQUFTLFNBQVNvRixHQUlyQyxJQUFLLEdBREQ3RyxHQUFPQyxLQUNGakIsRUFBSWdCLEVBQUt5RyxZQUFZeEgsT0FBUyxFQUFHRCxHQUFLLEVBQUdBLElBQzlDZ0IsRUFBS3lHLFlBQVl6SCxHQUFHeUMsT0FBT29GLEdBb0NuQyxJQUFJaEYiLCJmaWxlIjoiYXBwZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBsb2NhdGlvbkRhdGEgPSB7XG4gICAgXCJyb21lLWFwcFwiOiBbIHtcbiAgICBcIm5hbWVcIjogXCJDb2xvc3NldW1cIixcbiAgICBcImFkZHJlc3NcIjogW1wiUGlhenphIGRlbCBDb2xvc3NlbywgUm9tZSwgSXRhbHlcIl0sXG4gICAgXCJ3ZWJzaXRlXCI6IFwiaHR0cDovL3d3dy5jb29wY3VsdHVyZS5pdC9lbi90aGUtY29sb3NzZXVtLmNmbVwiLFxuICAgIFwid2lraVwiOiBcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbG9zc2V1bVwiLFxuICAgIFwidHlwZVwiOiAwLFxuICAgIFwia2V5d29yZHNcIjogW1xuICAgICAgICBcImdsYWRpYXRvclwiLFxuICAgICAgICBcImZpZ2h0XCIsXG4gICAgICAgIFwicmluZ1wiLFxuICAgICAgICBcImdhbWVzXCIsXG4gICAgICAgIFwic3BvcnRcIlxuICAgIF1cbiAgICB9LCB7XG4gICAgXCJuYW1lXCI6IFwiUGFudGhlb24sIFJvbWVcIixcbiAgICBcImFkZHJlc3NcIjogW1wiUGlhenphIGRlbGxhIFJvdG9uZGEsIDAwMTg2IFJvbWEsIEl0YWx5XCJdLFxuICAgIFwid2Vic2l0ZVwiOiBcImh0dHA6Ly93d3cudHVyaXNtb3JvbWEuaXQvY29zYS1mYXJlL3BhbnRoZW9uP2xhbmc9ZW5cIixcbiAgICBcIndpa2lcIjogXCJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QYW50aGVvbixfUm9tZVwiLFxuICAgIFwidHlwZVwiOiAwLFxuICAgIFwia2V5d29yZHNcIjogW1xuICAgICAgICBcImNodXJjaFwiLFxuICAgICAgICBcImRvbWVcIixcbiAgICAgICAgXCJ0ZW1wbGVcIlxuICAgIF1cbiAgICB9LCB7XG4gICAgXCJuYW1lXCI6IFwiU3QuIFBldGVyJ3MgQmFzaWxpY2FcIixcbiAgICBcImFkZHJlc3NcIjogW1wiUGlhenphIFNhbiBQaWV0cm8sIDAwMTIwIENpdHTDoCBkZWwgVmF0aWNhbm8sIFZhdGljYW4gQ2l0eVwiXSxcbiAgICBcIndlYnNpdGVcIjogXCJodHRwOi8vd3d3LnZhdGljYW5zdGF0ZS52YS9jb250ZW50L3ZhdGljYW5zdGF0ZS9lbi9tb251bWVudGkvYmFzaWxpY2EtZGktcy1waWV0cm8uaHRtbFwiLFxuICAgIFwid2lraVwiOiBcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1N0Ll9QZXRlciUyN3NfQmFzaWxpY2FcIixcbiAgICBcInR5cGVcIjogMCxcbiAgICBcImtleXdvcmRzXCI6IFtcbiAgICAgICAgXCJjaHVyY2hcIixcbiAgICAgICAgXCJiYXNpbGljYVwiLFxuICAgICAgICBcInZhdGljYW5cIixcbiAgICAgICAgXCJwb3BlXCIsXG4gICAgICAgIFwicGV0ZXJcIixcbiAgICAgICAgXCJzYWludFwiXG4gICAgXVxuICAgIH0sIHtcbiAgICBcIm5hbWVcIjogXCJQeXJhbWlkIG9mIENlc3RpYVwiLFxuICAgIFwiYWRkcmVzc1wiOiBbXCJWaWEgUmFmZmFlbGUgUGVyc2ljaGV0dGksIDAwMTUzIFJvbWEsIEl0YWx5XCJdLFxuICAgIFwid2Vic2l0ZVwiOiBcImh0dHA6Ly93d3cuY29vcGN1bHR1cmUuaXQvZW4vaGVyaXRhZ2UuY2ZtP2lkPTU5XCIsXG4gICAgXCJ3aWtpXCI6IFwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUHlyYW1pZF9vZl9DZXN0aXVzXCIsXG4gICAgXCJ0eXBlXCI6IDAsXG4gICAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgICAgIFwicHlyYW1pZFwiLFxuICAgICAgICBcImdhaXVzXCIsXG4gICAgICAgIFwiY2VzdGl1c1wiLFxuICAgICAgICBcInRvbWJcIixcbiAgICAgICAgXCJydWluc1wiXG4gICAgXVxuICAgIH0sIHtcbiAgICBcIm5hbWVcIjogXCJVbmRlcmdyb3VuZCBCYXNpbGljYSBvZiBQb3J0YSBNYWdnaW9yZVwiLFxuICAgIFwiYWRkcmVzc1wiOiBbXCJQaWF6emFsZSBMYWJpY2FubyBhbmdvbG8gdmlhIFByZW5lc3RpbmEsIFZpYSBQcmVuZXN0aW5hLCBSb21hLCBJdGFseVwiXSxcbiAgICBcIndlYnNpdGVcIjogXCJodHRwOi8vYXJjaGVvcm9tYS5iZW5pY3VsdHVyYWxpLml0L2VuL2FyY2hhZW9sb2dpY2FsLXNpdGUvdW5kZXJncm91bmQtYmFzaWxpY2EtbmVhci1wb3J0YS1tYWdnaW9yZVwiLFxuICAgIFwid2lraVwiOiBcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VuZGVyZ3JvdW5kX2Jhc2lsaWNhX29mX1BvcnRhX01hZ2dpb3JlXCIsXG4gICAgXCJ0eXBlXCI6IDAsXG4gICAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgICAgIFwiYmFzaWxpY2FcIixcbiAgICAgICAgXCJ1bmRlcmdyb3VuZFwiLFxuICAgICAgICBcIm5lb3B5dGhhZ29yZWFuc1wiXG4gICAgXVxuICAgIH0sIHtcbiAgICBcIm5hbWVcIjogXCJQYWxhenpvIERlbGxlIEVzcG9zaXppb25pXCIsXG4gICAgXCJhZGRyZXNzXCI6IFtcIlZpYSBOYXppb25hbGUsIDE5NCwgMDAxODQgUm9tYSwgSXRhbHlcIl0sXG4gICAgXCJ3ZWJzaXRlXCI6IFwiaHR0cDovL2VuZ2xpc2gucGFsYXp6b2VzcG9zaXppb25pLml0L0hvbWUuYXNweFwiLFxuICAgIFwid2lraVwiOiBcImh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BhbGF6em9fZGVsbGVfRXNwb3NpemlvbmlcIixcbiAgICBcInR5cGVcIjogMCxcbiAgICBcImtleXdvcmRzXCI6IFtcbiAgICAgICAgXCJleGhpYml0aW9uXCIsXG4gICAgICAgIFwiaGFsbFwiLFxuICAgICAgICBcImN1bHR1cmFsXCIsXG4gICAgICAgIFwiY2VudGVyXCIsXG4gICAgICAgIFwibXVzZXVtXCJcbiAgICBdXG4gICAgfSwge1xuICAgIFwibmFtZVwiOiBcIlBhbGF0aW5lIEhpbGxcIixcbiAgICBcImFkZHJlc3NcIjogW1wiVmlhIGRlbGxhIFNhbGFyYSBWZWNjaGlhLCA1LzYsIFJvbWEsIEl0YWx5XCJdLFxuICAgIFwid2Vic2l0ZVwiOiBcImh0dHA6Ly93d3cuY29vcGN1bHR1cmUuaXQvZW4vaGVyaXRhZ2UuY2ZtP2lkPTRcIixcbiAgICBcIndpa2lcIjogXCJodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QYWxhdGluZV9IaWxsXCIsXG4gICAgXCJ0eXBlXCI6IDAsXG4gICAgXCJrZXl3b3Jkc1wiOiBbXG4gICAgICAgIFwicGFsYXRpbmVcIixcbiAgICAgICAgXCJoaWxsXCIsXG4gICAgICAgIFwiZm9ydW1cIixcbiAgICAgICAgXCJydWluc1wiLFxuICAgICAgICBcImFuY2llbnRcIixcbiAgICAgICAgXCJyb21lXCJcbiAgICBdXG4gICAgfSwge1xuICAgIFwibmFtZVwiOiBcIlRvdXJpc3QgSW5mb3JtYXRpb24gQ2VudGVyc1wiLFxuICAgIFwiYWRkcmVzc1wiOiBbXG4gICAgICAgIFwiVmlhIEdpb3Zhbm5pIEdpb2xpdHRpIDM0LCBSb21hLCBJdGFseVwiLFxuICAgICAgICAvL05PVEU6IEFwcGFyZW50bHkgSSdtIHVzaW5nIHRoZSBnZW9jb2RlciBhdCB0b28gZmFzdCBvZiBhIHJhdGUgc28gSVxuICAgICAgICAvLyAgICAgIGNhbiBvbmx5IHVzZSBvbmUgYWRkcmVzcyB3aXRob3V0IHJ1bm5pbmcgaW50byBhbiBpc3N1ZS4uLlxuICAgICAgICAvL1wiVmlhIGRpIFNhbiBCYXNpbGlvIDUxLCBSb21hLCBJdGFseVwiLFxuICAgICAgICAvL1wiVmlhIE5hemlvbmFsZSwgMTk0LCAwMDE4NCBSb21hLCBJdGFseVwiLFxuICAgICAgICAvL1wiVmlhIGRlaSBGb3JpIEltcGVyaWFsaSwgUm9tYSwgSXRhbHlcIlxuICAgIF0sXG4gICAgXCJ3ZWJzaXRlXCI6IFwiaHR0cDovL3d3dy50dXJpc21vcm9tYS5pdC9pbmZvX3ZpYWdnaW8vcGl0XCIsXG4gICAgXCJ3aWtpXCI6IFwibm9uZVwiLFxuICAgIFwidHlwZVwiOiAxLFxuICAgIFwia2V5d29yZHNcIjogW1xuICAgICAgICBcImluZm9ybWF0aW9uXCIsXG4gICAgICAgIFwiY2VudGVyXCIsXG4gICAgICAgIFwicGl0XCIsXG4gICAgICAgIFwicG9pbnRcIlxuICAgIF1cbiAgICB9LCB7XG4gICAgXCJuYW1lXCI6XCJUZXJtaW5pIFN0YXRpb25cIixcbiAgICBcImFkZHJlc3NcIjogW1wiUm9tYSBUZXJtaW5pLCBJdGFseVwiXSxcbiAgICBcIndlYnNpdGVcIjpcImh0dHA6Ly93d3cudHJlbml0YWxpYS5jb20vdGNvbS1lblwiLFxuICAgIFwid2lraVwiOiBcIm5vbmVcIixcbiAgICBcInR5cGVcIjogMyxcbiAgICBcImtleXdvcmRzXCI6IFtcbiAgICAgICAgXCJ0cmFpbnNcIixcbiAgICAgICAgXCJzdGF0aW9uXCIsXG4gICAgICAgIFwiY2hvb1wiXG4gICAgXVxuICAgIH0sIHtcbiAgICBcIm5hbWVcIjogXCJUcmV2aSBGb3VudGFpblwiLFxuICAgIFwiYWRkcmVzc1wiOiBbXCJQaWF6emEgZGkgVHJldmksIDAwMTg3IFJvbWEsIEl0YWx5XCJdLFxuICAgIFwid2Vic2l0ZVwiOiBcImh0dHA6Ly93d3cudHJldmlmb3VudGFpbi5uZXQvXCIsXG4gICAgXCJ3aWtpXCI6IFwiaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVHJldmlfRm91bnRhaW5cIixcbiAgICBcInR5cGVcIjogMCxcbiAgICBcImtleXdvcmRzXCI6IFtcbiAgICAgICAgXCJ0cmV2aVwiLFxuICAgICAgICBcImZvdW50YWluXCIsXG4gICAgICAgIFwid2lzaFwiLFxuICAgICAgICBcInNhbHZpXCIsXG4gICAgICAgIFwiYnJhY2NpXCJcbiAgICBdXG4gICAgfVxuICBdXG59O1xuXG5cblxuXG5mdW5jdGlvbiBmaXhlcmlvX3VwZGF0ZShjdXJyZW5jaWVzKSB7XG4gICAgalF1ZXJ5LmdldEpTT04oJ2h0dHA6Ly9hcGkuZml4ZXIuaW8vbGF0ZXN0JywgZnVuY3Rpb24oZGF0YSkgeyAvLyBFVVIgaXMgdGhlIGRlZmF1bHQgYmFzZS4gU2VlIGZpeGVyLmlvXG4gICAgICAgIHZhciBpZFRlbXBsYXRlID0gXCIjJUNVUlJFTkNZJS1kYXRhXCI7XG4gICAgICAgIHZhciB0ZW1wSWQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVuY2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGVtcElkID0gaWRUZW1wbGF0ZS5yZXBsYWNlKFwiJUNVUlJFTkNZJVwiLCBjdXJyZW5jaWVzW2ldKTtcbiAgICAgICAgICAgICQodGVtcElkKS50ZXh0KGRhdGEucmF0ZXNbY3VycmVuY2llc1tpXV0pO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZml4ZXJpb191cGRhdGUsIDMwMDAwMCwgY3VycmVuY2llcyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGZpeGVyaW9fYXBpKGN1cnJlbmNpZXMpIHtcbiAgICBqUXVlcnkuZ2V0SlNPTignaHR0cDovL2FwaS5maXhlci5pby9sYXRlc3QnLCBmdW5jdGlvbihkYXRhKSB7IC8vIEVVUiBpcyB0aGUgZGVmYXVsdCBiYXNlLiBTZWUgZml4ZXIuaW9cbiAgICAgICAgdmFyIGN1cnJlbmN5ID0gJCgnI2N1cnJlbmNpZXNUYXJnZXQnKTtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gXCI8dHI+PHRkPiVDVVJSRU5DWSU8L3RkPjx0ZCBpZD1cXFwiJUNVUlJFTkNZJS1kYXRhXFxcIj48L3RkPjwvdHI+XCI7XG4gICAgICAgIHZhciB0ZW1wbGF0ZTEgPSBcIjx0cj48dGQ+JUNVUlJFTkNZJTwvdGQ+PHRkPiVBTU9VTlQlPC90ZD48L3RyPlwiO1xuICAgICAgICB2YXIgaWRUZW1wbGF0ZSA9IFwiIyVDVVJSRU5DWSUtZGF0YVwiO1xuICAgICAgICB2YXIgdGVtcCA9IHRlbXBsYXRlMS5yZXBsYWNlKFwiJUNVUlJFTkNZJVwiLCBkYXRhLmJhc2UpO1xuICAgICAgICB2YXIgdGVtcElkID0gaWRUZW1wbGF0ZTtcbiAgICAgICAgdGVtcCA9IHRlbXAucmVwbGFjZShcIiVBTU9VTlQlXCIsIFwiMS4wMFwiKTtcbiAgICAgICAgY3VycmVuY3kuYXBwZW5kKHRlbXApO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRlbXAgPSB0ZW1wbGF0ZS5yZXBsYWNlKFwiJUNVUlJFTkNZJVwiLCBjdXJyZW5jaWVzW2ldKTtcbiAgICAgICAgICAgIHRlbXAgPSB0ZW1wLnJlcGxhY2UoXCIlQ1VSUkVOQ1klXCIsIGN1cnJlbmNpZXNbaV0pO1xuICAgICAgICAgICAgdGVtcElkID0gaWRUZW1wbGF0ZS5yZXBsYWNlKFwiJUNVUlJFTkNZJVwiLCBjdXJyZW5jaWVzW2ldKTtcbiAgICAgICAgICAgIGN1cnJlbmN5LmFwcGVuZCh0ZW1wKTtcbiAgICAgICAgICAgICQodGVtcElkKS50ZXh0KGRhdGEucmF0ZXNbY3VycmVuY2llc1tpXV0pO1xuICAgICAgICB9XG4gICAgICAgIHNldFRpbWVvdXQoZml4ZXJpb191cGRhdGUsIDMwMDAwMCwgY3VycmVuY2llcyk7XG4gICAgfSk7XG59XG5cbnZhciBMb2NhdGlvbiA9IGZ1bmN0aW9uKCBtYXAsIGluaXREYXRhKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYubmFtZSA9ICBpbml0RGF0YS5uYW1lIHx8ICcnIDtcbiAgICBzZWxmLmFkZHJlc3MgPSBpbml0RGF0YS5hZGRyZXNzIHx8IFtdO1xuICAgIHNlbGYud2lraSA9IGluaXREYXRhLndpa2kgfHwgJycgO1xuICAgIHNlbGYudHlwZSA9IGluaXREYXRhLnR5cGUgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIDAgLSBIaXN0b3JpY2FsIE1hcmtlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSAtIEluZm9ybWF0aW9uIENlbnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMiAtIFJlc3RhdXJhbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMgLSBUcmFuc3BvcnRhdGlvbiBIdWIgYnVzL3RyYWluL2FpcnBvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQgLSBDaHVyY2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUgLSBPdGhlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgc2VsZi53ZWJzaXRlID0gaW5pdERhdGEud2Vic2l0ZSB8fCAnJztcbiAgICBzZWxmLmtleXdvcmRzID0gaW5pdERhdGEua2V5d29yZHMgfHwgW107XG4gICAgc2VsZi5oYXNNYXJrZXIgPSBmYWxzZTtcbiAgICBzZWxmLm1hcmtlcnMgPSBbXTtcbiAgICBzZWxmLmhhc0luZm9XaW5kb3cgPSBmYWxzZTtcbiAgICBzZWxmLnZpc2libGUgPSB0cnVlO1xuICAgIHNlbGYud2lraURpc3BsYXkgPSBcIlwiO1xuICAgIHNlbGYubWFwID0gbWFwO1xufTtcbkxvY2F0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSk7XG5Mb2NhdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2NhdGlvbjtcblxuTG9jYXRpb24ucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICB2YXIgcm9vZlRvcCA9IC0xO1xuICAgICAgICB2YXIgYXBwcm94ID0gLTE7XG4gICAgICAgIHZhciBnZW9DZW50ZXIgPSAtMTtcbiAgICAgICAgdmFyIHByb3BlckxvY2F0aW9uID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IGRhdGEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBsb2NfdHlwZSA9IGRhdGFbaV0uZ2VvbWV0cnkubG9jYXRpb25fdHlwZTtcbiAgICAgICAgICAgIGlmIChsb2NfdHlwZSA9PSBcIlJPT0ZUT1BcIil7XG4gICAgICAgICAgICAgICAgcm9vZlRvcCA9IGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxvY190eXBlID09IFwiR0VPTUVUUklDX0NFTlRFUlwiKSB7XG4gICAgICAgICAgICAgICAgZ2VvQ2VudGVyID0gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jX3R5cGUgPT0gXCJBUFBST1hJTUFURVwiKSB7XG4gICAgICAgICAgICAgICAgYXBwcm94ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocm9vZlRvcCA+PSAwKSB7XG4gICAgICAgICAgICBwcm9wZXJMb2NhdGlvbiA9IHJvb2ZUb3A7XG4gICAgICAgIH0gZWxzZSBpZiAoYXBwcm94ID49IDApIHtcbiAgICAgICAgICAgIHByb3BlckxvY2F0aW9uID0gYXBwcm94O1xuICAgICAgICB9IGVsc2UgaWYgKGdlb0NlbnRlciA+PSAwKSB7XG4gICAgICAgICAgICBwcm9wZXJMb2NhdGlvbiA9IGdlb0NlbnRlcjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLm1hcmtlcnMucHVzaChuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7bGF0OiBkYXRhW3Byb3BlckxvY2F0aW9uXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgbG5nOiBkYXRhW3Byb3BlckxvY2F0aW9uXS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKX0sXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUCxcbiAgICAgICAgICAgIG1hcDogc2VsZi5tYXAsXG4gICAgICAgICAgICB0aXRsZTogc2VsZi5uYW1lXG4gICAgICAgIH0pKTtcbiAgICAgICAgLy8gT3JpZ2luYWxseSBJIGhhZCBtdWx0aXBsZSBhZGRyZXNzIGZvciB0aGUgdG91cmlzdCBpbmZvcm1hdGlvbiBjZW50ZXJcbiAgICAgICAgLy8gYnV0IGR1ZSB0byBhIGdlb2NvZGVyIGVycm9yIEkgZGVjaWRlZCB0byBvbmx5IGdvIHdpdGggb25lIHNvIEkgd291bGRcbiAgICAgICAgLy8gb25seSBuZWVkIG9uZSBJbmZvV2luZG93IHBlciBMb2NhdGlvblxuICAgICAgICBpZiAoIXNlbGYuaGFzSW5mb1dpbmRvdykge1xuICAgICAgICAgICAgc2VsZi5pbmZvV2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe2NvbnRlbnQ6IHNlbGYud2lraURpc3BsYXl9KTtcbiAgICAgICAgICAgIHNlbGYuaGFzSW5mb1dpbmRvdyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbk1hcmsgPSBzZWxmLm1hcmtlcnMubGVuZ3RoIC0gMTtcblxuICAgICAgICAvLyBBZGRpbmcgb3BlbmluZyBvZiBJbmZvV2luZG93IG9uIGEgY2xpY2sgZXZlbnQgYWxvbmcgd2l0aCBhbiBhbmltYXRpb24uXG4gICAgICAgIC8vIEEgc2Vjb25kIGNsaWNrIHdpbGwgdHVybiBvZmYgdGhlIGFuaW1hdGlvbiBhbmQgY2xvc2UgdGhlIGluZm93aW5kb3dcbiAgICAgICAgc2VsZi5tYXJrZXJzW2xlbk1hcmtdLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBpZiAoc2VsZi5tYXJrZXJzW2xlbk1hcmtdLmdldEFuaW1hdGlvbigpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrZXJzW2xlbk1hcmtdLnNldEFuaW1hdGlvbihudWxsKTtcbiAgICAgICAgICAgICAgICBzZWxmLmluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5tYXJrZXJzW2xlbk1hcmtdLnNldEFuaW1hdGlvbihnb29nbGUubWFwcy5BbmltYXRpb24uQk9VTkNFKTtcbiAgICAgICAgICAgICAgICBzZWxmLmluZm9XaW5kb3cub3BlbihzZWxmLm1hcCwgc2VsZi5tYXJrZXJzW2xlbk1hcmtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuaW5mb1dpbmRvdy5hZGRMaXN0ZW5lcignY2xvc2VjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5pbmZvV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICBzZWxmLm1hcmtlcnNbbGVuTWFya10uc2V0QW5pbWF0aW9uKG51bGwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZWxmLmhhc01hcmtlciA9IHRydWU7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgdHJ5aW5nIHRvIGFjY2VzcyB0aGUgR2VvY29kZXIuIFN0YXR1czpcIiwgc3RhdHVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gLTE7XG59O1xuXG5Mb2NhdGlvbi5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24oaXNJdCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLnZpc2libGUgPSBpc0l0O1xuICAgIGlmIChpc0l0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBzZWxmLm1hcmtlcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHNlbGYubWFya2Vyc1tpXS5zZXRNYXAoc2VsZi5tYXApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgaXQgPSBzZWxmLm1hcmtlcnMubGVuZ3RoIC0gMTsgaXQgPj0gMDsgaXQtLSkge1xuICAgICAgICAgICAgc2VsZi5tYXJrZXJzW2l0XS5zZXRNYXAobnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5Mb2NhdGlvbi5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24ocGFydGlhbCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgcGFydGlhbGQgPSBwYXJ0aWFsLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHBhcnRpYWxkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzZWxmLmlzVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChzZWxmLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhwYXJ0aWFsZCkpIHtcbiAgICAgICAgc2VsZi5pc1Zpc2libGUodHJ1ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBzZWxmLmtleXdvcmRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZihzZWxmLmtleXdvcmRzW2ldLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocGFydGlhbGQpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5pc1Zpc2libGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pc1Zpc2libGUoZmFsc2UpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxuLy8gU2V0cyB3aWtpRGlzcGxheSBpbiBhZGRpdGlvbiB0byB3ZWJzaXRlIFVSTFxuTG9jYXRpb24ucHJvdG90eXBlLndpa2lHZXQgPSBmdW5jdGlvbihnZW8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJhc2V1cmwgPSAnaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3cvYXBpLnBocCc7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGJhc2V1cmwgKyAnP2FjdGlvbj1vcGVuc2VhcmNoJnNlYXJjaD0nICsgc2VsZi5uYW1lICsgJyZmb3JtYXQ9anNvbicsXG4gICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgICAgICB9KVxuICAgICAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAvLyBET05FOiBMb29rIHVwIGZvcm1hdCB0eXBlIGFuZCBlbnRlciBpdCB0byByZXBsYWNlIHRoZSBUaXRsZSwgZGVzY3JpcHRpb24sIHdpa2l1cmwsIGFuZCB3ZWJzaXRlIHVybFxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAnPGgzPiVUSVRMRSU8L2gzPjxwPiVERVNDUklQVElPTiU8L3A+PHA+RmluZCBvdXQgbW9yZSdcbiAgICAgICAgICAgICsgJyA8YSBocmVmPVwiJVdJS0lVUkwlXCI+aGVyZTwvYT4gYXQgV2lraXBlZGlhIG9yIDxhIGhyZWY9XCIlV0VCVVJMJVwiJ1xuICAgICAgICAgICAgKyAnPmhlcmU8L2E+IGF0IHRoZSBob21lIHBhZ2UuPC9wPic7XG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKCclV0VCVVJMJScsIHNlbGYud2Vic2l0ZSk7XG4gICAgICAgICAgICBpZiAoc2VsZi53aWtpICE9IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRhdGFbM10ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGRhdGFbM11baV0gPT0gc2VsZi53aWtpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKCclVElUTEUlJywgZGF0YVsxXVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKCclREVTQ1JJUFRJT04lJywgZGF0YVsyXVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKCclV0lLSVVSTCUnLCBzZWxmLndpa2kpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWtpRGlzcGxheSA9IGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGZhaWxlZCA9ICc8aDM+JU5BTUUlPC9oMz48cD5Db3VsZCBub3QgZmluZCBhbnkgZGF0YSBmcm9tICdcbiAgICAgICAgICAgICAgICArICdXaWtpcGVkaWEgZnJvbSB0aGlzIGxvY2F0aW9uIGJ1dCB5b3UgY2FuIGdvIHRvIHRoZSB3ZWJzaXRlICdcbiAgICAgICAgICAgICAgICArICc8YSBocmVmPVwiJVdFQlVSTCVcIj5oZXJlPC9hPjwvcD4nO1xuICAgICAgICAgICAgICAgIGZhaWxlZCA9IGZhaWxlZC5yZXBsYWNlKCclTkFNRSUnLCBzZWxmLm5hbWUpO1xuICAgICAgICAgICAgICAgIGZhaWxlZCA9IGZhaWxlZC5yZXBsYWNlKCclV0VCVVJMJScsIHNlbGYud2Vic2l0ZSk7XG4gICAgICAgICAgICAgICAgc2VsZi53aWtpRGlzcGxheSA9IGZhaWxlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIEFKQVggcmVxdWVzdFwiKTtcbiAgICAgICAgICAgIHZhciBmYWlsZWQgPSAnPGgzPiVOQU1FJTwvaDM+PHA+Q291bGQgbm90IGZpbmQgYW55IGRhdGEgZnJvbSAnXG4gICAgICAgICAgICArICdXaWtpcGVkaWEgZnJvbSB0aGlzIGxvY2F0aW9uIGJ1dCB5b3UgY2FuIGdvIHRvIHRoZSB3ZWJzaXRlICdcbiAgICAgICAgICAgICsgJzxhIGhyZWY9XCIlV0VCVVJMJVwiPmhlcmU8L2E+PC9wPic7XG4gICAgICAgICAgICBmYWlsZWQgPSBmYWlsZWQucmVwbGFjZSgnJU5BTUUlJywgc2VsZi5uYW1lKTtcbiAgICAgICAgICAgIGZhaWxlZCA9IGZhaWxlZC5yZXBsYWNlKCclV0VCVVJMJScsIHNlbGYud2Vic2l0ZSk7XG4gICAgICAgICAgICBzZWxmLndpa2lEaXNwbGF5ID0gZmFpbGVkO1xuXG5cbiAgICAgICAgfSlcbiAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc2VsZi5hZGRyZXNzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgZ2VvLmdlb2NvZGUoeyBhZGRyZXNzOiBzZWxmLmFkZHJlc3NbaV19LCBmdW5jdGlvbihkYXRhLCBzdGF0dXMpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZE1hcmtlcihkYXRhLCBzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09IFwiWkVST19SRVNVTFRTXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59O1xuXG52YXIgTG9jQ29udGFpbmVyID0gZnVuY3Rpb24gKGpzb25EYXRhLCBtYXApIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5tYXAgPSBtYXA7XG4gICAgc2VsZi5sb2NhdGlvbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICBqc29uRGF0YVsncm9tZS1hcHAnXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHNlbGYubG9jYXRpb25zLnB1c2gobmV3IExvY2F0aW9uKHNlbGYubWFwLCBpdGVtKSk7XG4gICAgfSk7XG4gICAgLy8gc2VsZi5hY3RpdmVcbn07XG5cbkxvY0NvbnRhaW5lci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUpO1xuTG9jQ29udGFpbmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvY0NvbnRhaW5lcjtcblxuTG9jQ29udGFpbmVyLnByb3RvdHlwZS5zZXRWaWV3ID0gZnVuY3Rpb24odHlwZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGYubG9jYXRpb25zKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYubG9jYXRpb25zKClbaV0udHlwZSA9PSB0eXBlKSB7XG4gICAgICAgICAgICBzZWxmLmxvY2F0aW9ucygpW2ldLmlzVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmKCB0eXBlID09PSAyKSB7XG4gICAgICAgICAgICBzZWxmLmxvY2F0aW9ucygpW2ldLmlzVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYubG9jYXRpb25zKClbaV0uaXNWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkxvY0NvbnRhaW5lci5wcm90b3R5cGUud2lraUdldHMgPSBmdW5jdGlvbiAoZ2VvKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZvciAodmFyIGkgPSBzZWxmLmxvY2F0aW9ucygpLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHNlbGYubG9jYXRpb25zKClbaV0ud2lraUdldChnZW8pO1xuICAgIH1cbn07XG5cbkxvY0NvbnRhaW5lci5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24oc3RyaW5neSkge1xuICAgIC8vIFRPRE86IEFkZCB3cmFwcGVyIGZ1bmN0aW9uYWxpdHkgaW50byBlYWNoIGxvY2F0aW9uJ3Mgc2VhcmNoIGZ1bmN0aW9uXG4gICAgLy8gb25jZSBzZXRWaWV3IGFuZCBhbGwgbWFya2VycyBjYW4gYmUgdmlld2VkLi4uXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZvciAodmFyIGkgPSBzZWxmLmxvY2F0aW9ucygpLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHNlbGYubG9jYXRpb25zKClbaV0uc2VhcmNoKHN0cmluZ3kpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIE1haW5WaWV3TW9kZWwoanNvbkZpbGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBzZWxmLmN1cnJlbmNpZXMgPSBbJ1VTRCcsICdDSEYnLCAnR0JQJywgJ0FVRCcsICdDQUQnLCAnQ1pLJ107XG4gICAgc2VsZi5zZWFyY2hUZXJtID0ga28ub2JzZXJ2YWJsZShcIlwiKTtcblxuICAgIC8qRE9ORTogVmlldyBwYXJ0IGZvciB0aGUgTWFwKi9cbiAgICBzZWxmLlJvbWUgPSB7bGF0OiA0MS45LCBsbmc6IDEyLjV9O1xuICAgIHNlbGYubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9tZU1hcCcpLCB7XG4gICAgICAgIHpvb206IDEzLFxuICAgICAgICBjZW50ZXI6IHNlbGYuUm9tZSxcbiAgICAgICAgY2xpY2thYmxlSWNvbnM6IGZhbHNlXG4gICAgfSk7XG4gICAgc2VsZi5sYXRMbmdGaW5kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICAvLyBET05FOiBDcmVhdGUgT2JzZXJ2YWJsZUFycmF5IG9mIGVhY2ggTG9jYXRpb24gZnJvbSB0aGUganNvbkZpbGVcbiAgICBzZWxmLmNvbnRhaW5lciA9IGtvLm9ic2VydmFibGUobmV3IExvY0NvbnRhaW5lcihqc29uRmlsZSwgc2VsZi5tYXApKTtcblxuICAgIHNlbGYuY29udGFpbmVyKCkud2lraUdldHMoc2VsZi5sYXRMbmdGaW5kZXIpO1xuXG4gICAgc2VsZi5zZXRWaWV3ID0gZnVuY3Rpb24gKHZpZXcpIHtcbiAgICAgICAgc2VsZi5jb250YWluZXIoKS5zZXRWaWV3KHZpZXcpO1xuICAgIH07XG5cbiAgICBzZWxmLnNlYXJjaEl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmNvbnRhaW5lcigpLnNlYXJjaChzZWxmLnNlYXJjaFRlcm0oKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYuc2VhcmNoVGVybSgpKTtcbiAgICB9O1xuXG4gICAgc2VsZi5zZXRWaWV3KDApO1xuXG5cbn1cbnZhciBtYWluO1xuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBtYWluID0gbmV3IE1haW5WaWV3TW9kZWwobG9jYXRpb25EYXRhKTtcbiAgICBmaXhlcmlvX2FwaShtYWluLmN1cnJlbmNpZXMpO1xuICAgIGtvLmFwcGx5QmluZGluZ3MobWFpbik7XG59XG5mdW5jdGlvbiBpbml0TWFwKCkge1xuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgXCJsb2FkXCIsIGluaXRpYWxpemUpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwicnVubmluZyBpbml0RC4uLlwiKTtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
