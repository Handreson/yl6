(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let ap = "AM";
            if (h   > 11) { ap = "PM";             }
            if (h   > 12) { h = h - 12;      }
            if (h   == 0) { h = 12;             }
            if (h   < 10) { h   = "0" + h;   }
            if (m < 10) { m = "0" + m; }
            if (s < 10) { s = "0" + s; }

            

            c.innerHTML = h + ":" + m + ":" + s + " " + ap;
            
        };
        
    });
    
// forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        
        let auto = document.getElementById("v3");
        let van = document.getElementById("v4");
        
        let linn = document.getElementById("linn");
        
        let numbers = /\d/;
        
        if (fname.value === "" || numbers.test(fname.value)) {
            alert("Eesnime vorm vale!");
        }
        if (lname.value === "" || numbers.test(lname.value)) {
            alert("Perenime vorm vale!");
        }
        if (!auto.checked && !van.checked) {
            alert("Vali kättetoimetamise viis.");
        }
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        } else {
            if (linn.value === "tln") {
                e.innerHTML = "0.00 &euro;";
            } else if (linn.value === "trt" || linn.value === "nrv"){
                e.innerHTML = "2.50 &euro;";
            } else if (linn.value === "prn") {
                e.innerHTML = "3.00 &euro;";
            }    
        }
        
        console.log("Tarne hind on arvutatud");
    }
    
})();


// map

let mapAPIKey = "AileQ3O2O0xEtaLotuVGOwSj600syiIW7WZ_VXKkkl4PwgkkwQC6gNnkqfS6LePW";

let map, infobox;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let centerPoint2 = new Microsoft.Maps.Location(
            58.25958, 22.48909
        );
    
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(58.3363266, 25.5519562),
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
        disablePanning: true
    });
    let pushpinUT = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });  
    let pushpinSYG = new Microsoft.Maps.Pushpin(centerPoint2, {
            title: 'Saaremaa Ühisgümnaasium',
            //subTitle: 'Kool',
            //text: 'SYG'
        });
    
    let infobox = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });
    pushpinUT.metadata = {
        title: 'Tartu Ülikool',
        description: 'Minu ülikool',
        infobox: infobox
    };
    
    pushpinSYG.metadata = {
        title: 'SYG',
        description: 'Minu kool',
        infobox: infobox
    };
    
    Microsoft.Maps.Events.addHandler(pushpinUT, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpinSYG, 'click', pushpinClicked);

    map.entities.push(pushpinUT);
    map.entities.push(pushpinSYG);
    
    infobox.setMap(map);
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        e.target.metadata.infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

