/**
 * Written by group
 */

// //Array for the list of cities + their count
var array = [];
//
// //Make objects where cityStatus is stored
var cityStatus1 = {
    cityName: "London",
    count: 100,
};

var cityStatus2 = {
    cityName: "Leeds",
    count: 70,
};

//push these statuses in the array to use in the map
array.push(cityStatus1);
array.push(cityStatus2);


//function makeMap(array) {
    //google.setOnLoadCallback(drawRegionsMap);

//google.charts.setOnLoadCallback(drawRegionsMap);
google.charts.load('current', {
    'packages':['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyA9RNP4ksFWb5Du48Ngghae8Jhg8Ia3oKY'
});

google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
        //create new data table
        var data = new google.visualization.DataTable();

        //add columns for city and flu count
        data.addColumn('string', 'City');
        data.addColumn('number', 'Flu count');

        //add the values to the columns
        for (let i = 0; i < array.length; i++) {
            data.addRows([[array[i].cityName, array[i].count]]);
        }

        //change the default settings in map
        var options = {
            region: 'GB',
            resolution: 'provinces',
            displayMode: 'markers',
            markerOpacity: 0.8,
            //sizeAxis: {minSize:2,  maxSize: 5},
            colorAxis: {colors: ['#b6e757', '#e05923']}
        };

        //create chart and put the chart in a div in the HTML
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        chart.draw(data, options);
    }
//}
