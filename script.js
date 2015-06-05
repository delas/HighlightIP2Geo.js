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
					"<span style='background: yellow;'>"+ ip +" <img height='11' src='https://lipis.github.io/flag-icon-css/flags/4x3/" + result.country_code.toLowerCase() + ".svg' /> ["+result.country+"]</span>");
			}
		}
	};
	ajax.open("GET", "https://www.telize.com/geoip/" + ip, true);
	ajax.send();
};

var ips = document.body.innerHTML.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g);
ips = uniq_fast(ips);

for(ip in ips) {
	process(ips[ip]);
}