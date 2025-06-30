 let map=L.map("map").setView([coordinates[1], coordinates[0]], 10);//([latitude,lognitude],zoom)
        L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=MsS2nY89IsSHb1dHm2yP',{
attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
       }).addTo(map);
        let marker=L.marker([coordinates[1], coordinates[0]], ).addTo(map);//for pointer
        marker.bindPopup(`<h4>${locationText}</h4><h4>Exact location provided fter booking</h4>`);
    