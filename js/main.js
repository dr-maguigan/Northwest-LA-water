//add openstreetmaps tilelayer
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    				maxZoom: 13,
   				attribution: '© OpenStreetMap'});
//create icon for wells and gages, icon is centered over the lat/long, popup will appear centered and 20 pixels above the point
var pinIcon = L.Icon.extend({
	options: {
		iconSize:     [22, 47],
        	iconAnchor:   [11,47],
       		popupAnchor:  [0, -20]
	}
});

//create different icons for different feature layers
var yellowIcon = new pinIcon({iconUrl: 'img/yellow_pin.png'})
yellowIcon.alt = "Bossier Well Marker";
var redIcon = new pinIcon({iconUrl: 'img/red_pin.png'})
redIcon.alt = "Caddo Well Marker";
var greenIcon = new pinIcon({iconUrl: 'img/green_pin.png'})
greenIcon.alt = "USGS Gage Marker";

//create hosston marker, assign it green (USGS)
var hosston = L.marker([32.89343195779419, -93.8208313147931], {icon: greenIcon});
//create hlevel variable to accept JQuery return
var hlevel;    
//run AJAX to return latest gage levels for Hosston
$.ajax({
    	type: "GET",
    	url: "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07299540&parameterCd=00065&siteStatus=all", //USGS link where data are stored in JSON
    	dataType: 'json',
    	async: false, //run as synchronous
    	data: $(this).serialize(),
    	success: function(data) {
        	hla = (data.value.timeSeries[0].values[0].value[0].value); //location within JSON where gage reading is
		hlevel = Number(hla); //convert to number from string
	}
});

//enter hosston elevation and hlevel to add to create water table level, add info to popup
var hosston_elev = 151.27
var hoss_wt = (hosston_elev + hlevel).toFixed(2);
hosston.bindPopup("<h6><b>Red River near Hosston, LA</b></h6><br><p>Elevation: 151.27 ft<br>Gage height: " + hlevel + " ft<br>Stream elevation: " + hoss_wt + " ft</p><br><a href='https://waterdata.usgs.gov/monitoring-location/07344400/#parameterCode=00065&period=P7D' target='_blank' rel='noopener noreferrer'>Historical Data</a>");

//repeat same steps for twelvemile bayou
var tm = L.marker([32.64564664818235, -93.87746100527966], {icon: greenIcon});
var tmlevel;
$.ajax({
	type: "GET",
	url: "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07348000&parameterCd=00065&siteStatus=all",
	dataType: 'json',
	async: false,
	data: $(this).serialize(),
	success: function(data) {
		tmla = (data.value.timeSeries[0].values[0].value[0].value);
		tmlevel = Number(tmla);
	}
});

var tm_elev = 136.12
var tm_wt = (tm_elev + tmlevel).toFixed(2);
tm.bindPopup("<h6><b>Twelvemile Bayou near Dixie, LA</b></h6><br><p>Elevation: 136.12 ft<br>Gage height: " + tmlevel + " ft<br>Stream elevation: " + tm_wt + " ft</p><br><a href='https://waterdata.usgs.gov/monitoring-location/07348000/' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
		
//repeat for flat river
var fr = L.marker([32.56262689520695, -93.646943336587], {icon: greenIcon});
var frlevel;
$.ajax({
	type: "GET",
	url: "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07349298&parameterCd=00065&siteStatus=all",
	dataType: 'json',
	async: false,
	data: $(this).serialize(),
	success: function(data) {
		frla = (data.value.timeSeries[0].values[0].value[0].value);
		frlevel = Number(frla);
	}
});

var fr_elev = 139.66
var fr_wt = (fr_elev + frlevel).toFixed(2);
fr.bindPopup("<h6><b>Flat River near Shed Rd near Bossier City</b></h6><br><p>Elevation: 139.66 ft<br>Gage height: " + frlevel + " ft<br>Stream elevation: " + fr_wt + " ft</p><br><a href='https://waterdata.usgs.gov/monitoring-location/07349298/#parameterCode=00065&period=P7D' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
					
//repeat steps for willow chute
var wc = L.marker([32.56524453867455, -93.68095817416412], {icon: greenIcon});
var wclevel;
$.ajax({
	type: "GET",
	url: "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07349898&parameterCd=00065&siteStatus=all",
	dataType: 'json',
	async: false,
	data: $(this).serialize(),
	success: function(data) {
		wcla = (data.value.timeSeries[0].values[0].value[0].value);
		wclevel = Number(wcla);
	}
});

var wc_elev = 157.44
var wc_wt = (wc_elev + wclevel).toFixed(2);
wc.bindPopup("<h6><b>Willow Chute Bayou at Swan Lake Rd near Bossier City</b></h6><nr><p>Elevation: 157.44 ft<br>Gage height: " + wclevel + " ft<br>Stream elevation: " + wc_wt + " ft</p><br><a href='https://waterdata.usgs.gov/monitoring-location/07349898/#parameterCode=00065&period=P7D' target='_blank' rel='noopener noreferrer'>Historical Data</a>");

//repeat steps for red river at shreveport
var rr = L.marker([32.51535633021526, -93.74037518409973], {icon: greenIcon});
var rrlevel;
$.ajax({
	type: "GET",
	url: "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07348500&parameterCd=00065&siteStatus=all",
	dataType: 'json',
	async: false,
	data: $(this).serialize(),
	success: function(data) {
		rrla = (data.value.timeSeries[0].values[0].value[0].value);
		rrlevel = Number(rrla);
	}
});

var rr_elev = 131.48
var rr_wt = (rr_elev + rrlevel).toFixed(2);
rr.bindPopup("<h6><b>Red River at Shreveport</b></h6><br><p>Elevation: 131.48 ft<br>Gage height: " + rrlevel + " ft<br>Stream elevation: " + rr_wt + " ft</p><br><a href='https://waterdata.usgs.gov/monitoring-location/07348500/#parameterCode=00065&period=P7D' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
		
//create layergroup for gages to add into layer control			
var gages = L.layerGroup([hosston, tm, fr, wc, rr]);

//create variables for caddo well info to add to markers below, will be set up to retrieve continuous updating later	
//walter b jacobs
var wbj_elev = 204.9
var wbj_depth = (15.6 - 2.27).toFixed(2);
var wbj_wt = (wbj_elev - wbj_depth).toFixed(2); //calculate water table elevation

//hannahs park
var hp_elev = 199.36
var hp_depth = (64.5 - 2.36).toFixed(2);
var hp_wt = (hp_elev - hp_depth).toFixed(2);

//mayo road
var mr_elev = 193.5
var mr_depth = (89.9 - 2.46).toFixed(2);
var mr_wt = (mr_elev - mr_depth).toFixed(2);

//keithville
var kv_elev = 197.44
var kv_depth = (74.5 -2.63).toFixed(2);
var kv_wt = (kv_elev - kv_depth).toFixed(2);

//south camp
var sc_elev = 279.35
var sc_depth = (29.9 - 2.77).toFixed(2);
var sc_wt = (sc_elev - sc_depth).toFixed(2);

//wallace lake
var wl_elev = 161.51
var wl_depth = (23.4 -3.2).toFixed(2);
var wl_wt = (wl_elev - wl_depth).toFixed(2);

//blanchard
var b_elev = 226.75
var b_depth = (7.4 - 3.46).toFixed(2);
var b_wt = (b_elev - b_depth).toFixed(2);

//greenwood
var gw_elev = 264.15
var gw_depth = (49.4 - 3.61).toFixed(2);
var gw_wt = (gw_elev - gw_depth).toFixed(2);

//eddie jones park
var ejp_elev = 247.99
var ejp_depth = (14.6 - 3.31).toFixed(2);
var ejp_wt = (ejp_elev - ejp_depth).toFixed(2);
			
//create markers and add in data for popups
var wbj = L.marker([32.56717, -93.93314], {icon: redIcon}).bindPopup("<h6><b>Walter B. Jacobs Park</b></h6><br><p>Elevation: 204.9 ft<br>Depth below surface: " + wbj_depth + " ft<br>Water table elevation: " + wbj_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Walter-B-Jacobs.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var hp = L.marker([32.35892, -93.6911], {icon: redIcon}).bindPopup("<h6><b>Hannah's Park</b></h6><br><p>Elevation: 199.36 ft<br>Depth below surface: " + hp_depth + " ft<br>Water table elevation: " + hp_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Hannahs-Park.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var mr = L.marker([32.37806, -93.74217], {icon: redIcon}).bindPopup("<h6><b>Mayo Rd</b></h6><br><p>Elevation: 193.5 ft<br>Depth below surface: " + mr_depth + " ft<br>Water table elevation: " + mr_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Mayo-Rd.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var kv = L.marker([32.33322, -93.83894], {icon: redIcon}).bindPopup("<h6><b>Keithville</b></h6><br><p>Elevation: 197.44 ft<br>Depth below surface: " + kv_depth + " ft<br>Water table elevation: " + kv_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Keithville.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var sc = L.marker([32.31394, -93.94589], {icon: redIcon}).bindPopup("<h6><b>South Camp</b></h6><br><p>Elevation: 279.35 ft<br>Depth below surface: " + sc_depth + " ft<br>Water table elevation: " + sc_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/South-Camp.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var wl = L.marker([32.32269, -93.71125], {icon: redIcon}).bindPopup("<h6><b>Wallace Lake</b></h6><br><p>Elevation: 161.51 ft<br>Depth below surface: " + wl_depth + " ft<br>Water table elevation: " + wl_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Wallace-Lake.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var b = L.marker([32.59381, -93.89786], {icon: redIcon}).bindPopup("<h6><b>Blanchard</b></h6><br><p>Elevation: 226.75 ft<br>Depth below surface: " + b_depth + " ft<br>Water table elevation: " + b_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Blanchard.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var gw = L.marker([32.42542, -93.93969], {icon: redIcon}).bindPopup("<h6><b>Greenwood</b></h6><br><p>Elevation: 264.15 ft<br>Depth below surface: " + gw_depth + " ft<br>Water table elevation: " + gw_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Greenwood.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var ejp = L.marker([32.2661755, -93.9404097], {icon: redIcon}).bindPopup("<h6><b>Eddie Jones Park</b></h6><br><p>Elevation: 247.99 ft<br>Depth below surface: " + ejp_depth + " ft<br>Water table elevation: " + ejp_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Eddie-Jones-Park.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");

//create layergroup for caddo wells for layer control
var caddowells = L.layerGroup([wbj, hp, mr, kv, sc, wl, b, gw, ejp]);

//create variables for bossier wells, later efforts will be to add ability to update telemetried wells continously and to derive calculations to estimate based on telemetried well levels
//willow chute well
var wcbc_elev = 168.46
var wcbc_depth = (4.84 - 2.84).toFixed(2);
var wcbc_wt = (wcbc_elev - wcbc_depth).toFixed(2);

//north airline acres
var naa_elev = 171.5
var naa_wt = (0.9803 * wcbc_wt + 10.159).toFixed(2);
var naa_depth = (naa_elev - naa_wt - 0.03).toFixed(2); //addition or subtraction is for the difference between height of the casing above ground level for each site compared to Willow Chute
	
//belle rose at legacy
var brl_elev = 168.8
var brl_wt = (0.694 * wcbc_wt+ 52.419).toFixed(2);
var brl_depth = (brl_elev - brl_wt -0.06).toFixed(2);

//north-south corridor
var nsc_elev = 165.97
var nsc_wt = (1.3253 * wcbc_wt - 53.512).toFixed(2);
var nsc_depth = (nsc_elev - nsc_wt).toFixed(2);

//flat river well
var frbc_elev = 168.06
var frbc_wt = (1.2547 * wcbc_wt - 39.461).toFixed(2);
var frbc_depth = (frbc_elev - frbc_wt + 0.06).toFixed(2);
			
//oak creek well
var oc_elev = 172.63
var oc_wt = (1.1219 * wcbc_wt - 14.541).toFixed(2);
var oc_depth = (oc_elev - oc_wt + 0.08).toFixed(2);

//rosedale place			
var rp_elev = 171.3
var rp_wt = (1.4024 * wcbc_wt - 63.021).toFixed(2);
var rp_depth = (rp_elev - rp_wt + 0.48).toFixed(2);

//bossier tennis courts
var btc_elev = 171.89
var btc_wt = (0.8364 * wcbc_wt + 32.01).toFixed(2);
var btc_depth = (btc_elev - btc_wt +0.36).toFixed(2);

//sewage treatment plant
var sp_elev = 176.9
var sp_depth = 0.00
var sp_wt = (sp_elev - sp_depth).toFixed(2);

//cypress bend
var cb_elev = 175.79
var cb_wt = (1.1942 * wcbc_wt - 23.647).toFixed(2);
var cb_depth = (cb_elev - cb_wt + 0.34).toFixed(2);

//kingston plantation
var kp_elev = 173.4
var kp_wt = (0.7364 * wcbc_wt + 50.435).toFixed(2);
var kp_depth = (kp_elev - kp_wt + 0.35).toFixed(2);


//autumn place
var ap_elev = 175.0
var ap_wt = (0.7999 * wcbc_wt + 42.452).toFixed(2);
var ap_depth = (ap_elev - ap_wt + 0.07).toFixed(2);


//create markers for bossier wells and add info into popups
var naa = L.marker([32.62255, -93.71567], {icon: yellowIcon}).bindPopup("<h6><b>North Airline Acres</b></h6><br><p>Elevation: 171.5 ft<br>Depth below surface: " + naa_depth + " ft<br>Water table elevation: " + naa_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/North-Airline-Acres.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var brl = L.marker([32.62071, -93.69546], {icon: yellowIcon}).bindPopup("<h6><b>Belle Rose at Legacy</b></h6><br><p>Elevation: 168.8 ft<br>Depth below surface: " + brl_depth + " ft<br>Water table elevation: " + brl_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Belle-Rose-at-Legacy.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var nsc = L.marker([32.63013, -93.65554], {icon: yellowIcon}).bindPopup("<h6><b>North-South Corridor</b></h6><br><p>Elevation: 165.97 ft<br>Depth below surface: " + nsc_depth + " ft<br>Water table elevation: " + nsc_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/North-South-Corridor.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var frbc = L.marker([32.6099, -93.67127], {icon: yellowIcon}).bindPopup("<h6><b>Flat River Well</b></h6><br><p>Elevation: 168.06 ft<br>Depth below surface: " + frbc_depth + " ft<br>Water table elevation: " + frbc_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Flat-River-Well.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var wcbc = L.marker([32.594581, -93.66957], {icon: yellowIcon}).bindPopup("<h6><b>Willow Chute Well</b></h6><br><p>Elevation: 168.46 ft<br>Depth below surface: " + wcbc_depth + " ft<br>Water table elevation: " + wcbc_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Willow-Chute-Well.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var oc = L.marker([32.60399, -93.70569], {icon: yellowIcon}).bindPopup("<h6><b>Oak Creek Well</b></h6><br><p>Elevation: 172.63 ft<br>Depth below surface: " + oc_depth + " ft<br>Water table elevation: " + oc_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Oak-Creek-Well.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var rp = L.marker([32.59586, -93.70613], {icon: yellowIcon}).bindPopup("<h6><b>Rosedale Place</b></h6><br><p>Elevation: 171.3 ft<br>Depth below surface: " + rp_depth + " ft<br>Water table elevation: " + rp_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Rosedale-Place.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var btc = L.marker([32.58112, -93.72703], {icon: yellowIcon}).bindPopup("<h6><b>Bossier Tennis Courts</b></h6><br><p>Elevation: 171.89 ft<br>Depth below surface: " + btc_depth + " ft<br>Water table elevation: " + btc_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Bossier-Tennis-Courts.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var sp = L.marker([32.60846, -93.74901], {icon: yellowIcon}).bindPopup("<h6><b>Sewage Treatment Plant</b></h6><br><p>Elevation: 176.09 ft<br>Depth below surface: -- ft<br>Water table elevation: --ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Sewage-Treatment-Plant.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var cb = L.marker([32.62009, -93.7307], {icon: yellowIcon}).bindPopup("<h6><b>Cypress Bend Well</b></h6><br><p>Elevation: 175.79 ft<br>Depth below surface: " + cb_depth + " ft<br>Water table elevation: " + cb_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Cypress-Bend-Well.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var kp = L.marker([32.636, -93.7236], {icon: yellowIcon}).bindPopup("<h6><b>Kingston Plantation</b></h6><br><p>Elevation: 173.4 ft<br>Depth below surface: " + kp_depth + " ft<br>Water table elevation: " + kp_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Kingston-Plantation.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
var ap = L.marker([32.59875, -93.72445], {icon: yellowIcon}).bindPopup("<h6><b>Autumn Place</b></h6><br><p>Elevation: 175.0 ft<br>Depth below surface: " + ap_depth + " ft<br>Water table elevation: " + ap_wt + " ft</p><br><a href='https://dr-maguigan.github.io/Northwest-LA-water/Autumn-Place.html#' target='_blank' rel='noopener noreferrer'>Historical Data</a>");
		
//create bossier wells layergroup for layer control
var bossierwells = L.layerGroup([naa, brl, nsc, frbc, wcbc, oc, rp, btc, sp, cb, kp, ap]);
		
//create layer with all layers in it for layer control
var allLayers = L.layerGroup([hosston, tm, fr, wc, rr, wbj, hp, mr, kv, sc, wl, b, gw, ejp, naa, brl, nsc, frbc, wcbc, oc, rp, btc, sp, cb, kp, ap]);

//add map, have to create layers first and then map to add
var map = L.map('map', {
	center: [32.64899904360769, -93.687599943579366],
	zoom: 10,
	layers: [osm, caddowells, bossierwells, gages]
});

//create topright and bottom left points for fitbounds to help map on either desktop or mobile
var tr = L.latLng(32.925, -93.69);
var bl = L.latLng(32.2725, -93.96);
var bounds = L.latLngBounds(tr, bl);
map.fitBounds(bounds);

//create overlay layers with names for control		
var overlayMaps = {
	"All Data Sources": allLayers,
	"Bossier Parish Wells": bossierwells,
	"Caddo Parish Wells": caddowells,
	"Stream Gages": gages
};
		
//add layer control			
var layerControl = L.control.layers(overlayMaps, null, {collapsed:false}).addTo(map);

//add watermark with RRMWI logo
L.Control.Watermark = L.Control.extend({
    	onAdd: function(map) {
        	var img = L.DomUtil.create('img');
			img.src = "img/text_next_to_logo.png";
        		img.style.width = '1200px';
			img.alt = "Red River Watershed Management Institute Logo"

        	return img;
    },

    onRemove: function(map) {
    }
});

L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
}

//add watermark to map on bottom left
L.control.watermark({ position: 'bottomleft' }).addTo(map);
