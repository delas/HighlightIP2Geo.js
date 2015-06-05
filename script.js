/**
 * Removes all duplicated entries from the provided array.
 */
function uniq_fast(a) {
	var seen = {};
	var out = [];
	var len = a.length;
	var j = 0;
	for(var i = 0; i < len; i++) {
		var item = a[i];
		if(seen[item] !== 1) {
			seen[item] = 1;
			out[j++] = item;
		}
	}
	return out;
}

/**
 * Processes the provided IP address.
 */
function process(ip) {
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if (ajax.readyState==4 && ajax.status==200) {
			var result = JSON.parse(ajax.responseText);
			var cc = result.country_code;
			if (typeof cc === "undefined") {
				document.body.innerHTML = document.body.innerHTML.replace(
					new RegExp(ip, 'g'),
					"<span style='background: #CCCCCC;'>"+ ip +" [local]</span>");
			} else {
				document.body.innerHTML = document.body.innerHTML.replace(
					new RegExp(ip, 'g'),
					"<span style='background: yellow;'>"+ ip +" [<img height='11' src='https://lipis.github.io/flag-icon-css/flags/4x3/" + result.country_code.toLowerCase() + ".svg' /> " + result.country + ", " + result.isp + "]</span>");
			}
		}
	};
	ajax.open("GET", "https://www.telize.com/geoip/" + ip, true);
	ajax.send();
};

// Ip v4 processing
var ips = document.body.innerHTML.match(/\s*(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}\s*/g);
ips = uniq_fast(ips);
for(ip in ips) {
	process(ips[ip]);
}

// Ip v6 processing
ips = document.body.innerHTML.match(/\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*/g);
ips = uniq_fast(ips);
for(ip in ips) {
	process(ips[ip]);
}