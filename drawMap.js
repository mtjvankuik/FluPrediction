/**
 * Reads JSON array file of cities and flu count
 * @param callback
 * @return JSON array
 **/
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/cities.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

/**
 * Reads JSON and draws map.
 * Also authentication of API is executed.
 * @param array Array of flu info
 **/
loadJSON(function(array) {

    console.log(array); // this will log out the json object
    google.charts.load('current', {
        'packages': ['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyA9RNP4ksFWb5Du48Ngghae8Jhg8Ia3oKY'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    // draws the map
    function drawRegionsMap() {
        //create new data table
        var data = new google.visualization.DataTable();
        //console.log(array);
        //add columns for city and flu count
        data.addColumn('string', 'City');
        data.addColumn('number', 'Flu count');

        //add the values to the columns
        for (let i = 0; i < array.length; i++) {
            data.addRows([[array[i].location, array[i].count]]);
        }

        //change the default settings in map
        var options = {
            region: 'GB',
            resolution: 'provinces',
            displayMode: 'markers',
            markerOpacity: 0.8,
            sizeAxis: {minSize:0,  maxSize: 10},
            colorAxis: {colors: ['#b6e757', '#e05923']}
        };

        //create chart and put the chart in a div in the HTML
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        chart.draw(data, options);
    }
});