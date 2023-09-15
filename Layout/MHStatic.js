

let submitButton = document.querySelector("#myButton");
let songInput = document.querySelector("#songInput");
let message = document.querySelector("#message");

function myFunction() {
    message.innerHTML = " You got good taste with " + songInput.value;
    init()
}



function init(){
    url = `http://spotifymlflask.azurewebsites.net/api/v1.0/trackrec/${songInput.value}`
    d3.json(url).then(function(data){
        console.log(data)
    })
console.log(url)    
}


myArray = [
    {"artist":"A", "song":"1", "album_name":"I", "album_photo":"pic"},
    {"artist":"B", "song":"2", "album_name":"II", "album_photo":"pic"},
    {"artist":"C", "song":"3", "album_name":"III", "album_photo":"pic"},
    {"artist":"D", "song":"4", "album_name":"IV", "album_photo":"pic"},
]

buildTable(myArray)

function buildTable(data){
    var foo = document.getElementById("dyTable")

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                        <td>${data[i].artist}</td>
                        <td>${data[i].song}</td>
                        <td>${data[i].album_name}</td>
                        <td>${data[i].album_photo}</td>
                </tr>`
        foo.innerHTML += row
    }
};


// $(document).ready(function() {
//     var musicList = "<ul><li>Song1</li><li>Song another</li></ul>";

//     $("#music").append(musicList);
//     init();
// });

// function plotDurationBarGraph(jsonData) {
//     // Extract the second array from the JSON data
//     var secondArray = jsonData[1];

//     // Extract the duration values from the second array
//     var durationData = secondArray.map(function(song) {
//         return song.duration;
//     });

//     // Extract the song names from the second array
//     var songNames = secondArray.map(function(song) {
//         return song.song;
//     });

//     // Create the trace for the bar graph
//     var trace = {
//         x: songNames,
//         y: durationData,
//         type: 'bar'
//     };

//     // Create the layout for the bar graph
//     var layout = {
//         title: 'Duration of Songs by' + artist,
//         xaxis: {
//             title: 'Song'
//         },
//         yaxis: {
//             title: 'Duration (seconds)'
//         }
//     };

//     // Combine the trace and layout and plot the graph
//     Plotly.newPlot('bar', [trace], layout);
// };

// // // Fetch data from the API and plot the graph
// d3.json(url).then(function(data) {
//     console.log(data); // This will log the fetched JSON data
//     plotDurationBarGraph(data); // Plot the bar graph using the fetched data
// });

// function plotPopularityBarGraph(jsonData) {
//     // Extract the first array from the JSON data
//     var firstArray = jsonData[0];

//     // Extract the popularity values from the first array
//     var popularityData = firstArray.map(function(song) {
//         return song.popularity;
//     });

//     // Extract the song names from the first array
//     var songNames = firstArray.map(function(song) {
//         return song.song;
//     });

//     // Create the trace for the bar graph
//     var trace = {
//         x: songNames,
//         y: popularityData,
//         type: 'bar'
//     };

//     // Create the layout for the bar graph
//     var layout = {
//         title: 'Popularity of Songs by' + artist,
//         xaxis: {
//             title: 'Song'
//         },
//         yaxis: {
//             title: 'Popularity'
//         }
//     };

//     // Combine the trace and layout and plot the graph
//     Plotly.newPlot('popularity-chart', [trace], layout);
// }

// // // Fetch data from the API and plot the graph
// d3.json(url).then(function(data) {
//     console.log(data); // This will log the fetched JSON data
//     plotPopularityBarGraph(data); // Plot the bar graph using the fetched data
// });

// function plotTempoHistogram(jsonData) {
//     // Extract the tempo values from the first array
//     var firstArray = jsonData[0];
//     var firstArrayTempo = firstArray.map(function(song) {
//         return song.tempo;
//     });

//     // Extract the tempo values from the second array
//     var secondArray = jsonData[1];
//     var secondArrayTempo = secondArray.map(function(song) {
//         return song.tempo;
//     });

//     // Create the traces for the histogram
//     var trace1 = {
//         x: firstArrayTempo,
//         type: 'histogram',
//         name: 'First Array'
//     };

//     var trace2 = {
//         x: secondArrayTempo,
//         type: 'histogram',
//         name: 'Second Array'
//     };

//     // Create the layout for the histogram
//     var layout = {
//         title: 'Tempo Histogram for Songs by' + artist,
//         xaxis: {
//             title: 'Tempo (BPM)'
//         },
//         yaxis: {
//             title: 'Frequency'
//         }
//     };

//     // Combine the traces and layout and plot the graph
//     Plotly.newPlot('tempo-histogram', [trace1, trace2], layout);
// }

// // // Fetch data from the API and plot the histogram
// d3.json(url).then(function(data) {
//     console.log(data); // This will log the fetched JSON data
//     plotTempoHistogram(data); // Plot the histogram using the fetched data
// });