let submitButton = document.querySelector("#myButton");
let artistInput = document.querySelector("#artistInput");
let message = document.querySelector("#message");

function myFunction() {
    message.innerHTML = " You got good taste with " + artistInput.value;
    init()
}
function artistpic(){
    d3.json(url).then(function(data){
        var img = document.createElement("img");
        img.src = data[0].artist_image;
        document.getElementById("image_url_1").innerHTML = '';
        document.getElementById("image_url_1").appendChild(img);
    })
}
function artistfollowers(){
    d3.json(url).then(function(data){
        var text = document.createElement("text");
        text.innerHTML = 'Follower Count: ' +  data[0].artist_followers;
        document.getElementById("artist_followers").innerHTML = '';
        document.getElementById("artist_followers").appendChild(text);
    }) 
 }
function init() {
    url = `https://spotifymlflask.azurewebsites.net/api/v1.0/${artistInput.value}`
    d3.json(url).then(function(data){
        console.log(data)
        plotPopularityBarGraph(data)
        // plotDurationBarGraph(data)
        plotGaugeChart(data)
        plotTempoHistogram(data)
        plotBubbleChart(data)
        plotValanceHistogram(data)
        artistpic(data)
        artistfollowers(data)
        calculatePearsonCorrelation(data)
        calculatePearsonCorrelationDP(data)
        calculatePearsonCorrelationTE(data)
    })
console.log(url);
}
function plotPopularityBarGraph(jsonData) {
    // Extract the first array from the JSON data
    var Array = jsonData[1];

    // Extract the popularity values from the first array
    var popularityData = Array.map(function(song) {
        return song.popularity;
    });

    // Extract the song names from the first array
    var songNames = Array.map(function(song) {
        return song.song;
    });

    // Sort the popularityData and songNames arrays in descending order
    popularityData.sort(function(a, b) {
        return b - a;
    });

    songNames.sort(function(a, b) {
        return popularityData[songNames.indexOf(b)] - popularityData[songNames.indexOf(a)];
    });

    // Create the trace for the bar graph
    var trace = {
        x: songNames,
        y: popularityData,
        type: 'bar'
    };

    // Create the layout for the bar graph
    var layout = {
        title: `Popularity of Songs for ` + artistInput.value,
        xaxis: {
            title: 'Song'
        },
        yaxis: {
            title: 'Popularity'
        },
        height: 600,
        width: 600
    };

    // Combine the trace and layout and plot the graph
    Plotly.newPlot('popularity-chart', [trace], layout);
}

function plotTempoHistogram(jsonData) {
    var data = jsonData[1]; // Assuming data is an array of objects

    // Create an array of traces where each trace represents a data point
    var traces = data.map(function(song) {
        return {
            x: [song.duration], // X-coordinate
            y: [song.popularity],   // Y-coordinate
            hovertemplate: '<b>Album Name:</b> ' + song.album_data.album_name + '<br><b>Album Release:</b> ' + song.album_data.album_release_date + '<br><b>Song:</b> ' + song.song,
            mode: 'markers',
            type: 'scatter',
            name: song.song,
            text: [song.song] // Text for hover
        };
    });

    // Create the layout for the scatter plot
    var layout = {
        title: 'Correlation of Popularity and Duration of Songs for ' + artistInput.value,
        xaxis: {
            title: 'Duration'
        },
        yaxis: {
            title: 'Popularity'
        },
        height: 600,
        width: 600
    };

    // Plot the graph with the array of traces
    Plotly.newPlot('tempo-histogram', traces, layout);
}
function calculatePearsonCorrelationDP(jsonData) {
    const data = jsonData[1];
  
    const xValues = data.map(song => song.duration);
    const yValues = data.map(song => song.popularity);
  
    const calculateMean = (values) => values.reduce((acc, val) => acc + val, 0) / values.length;
    const meanX = calculateMean(xValues);
    const meanY = calculateMean(yValues);
  
    const sumOfDifferencesProduct = xValues.reduce((acc, x, index) => {
      const differenceX = x - meanX;
      const differenceY = yValues[index] - meanY;
      return acc + (differenceX * differenceY);
    }, 0);
  
    const sumOfSquaredDifferenceX = xValues.reduce((acc, x) => {
      const differenceX = x - meanX;
      return acc + (differenceX * differenceX);
    }, 0);
  
    const sumOfSquaredDifferenceY = yValues.reduce((acc, y) => {
      const differenceY = y - meanY;
      return acc + (differenceY * differenceY);
    }, 0);
  
    const correlationCoefficient = sumOfDifferencesProduct / Math.sqrt(sumOfSquaredDifferenceX * sumOfSquaredDifferenceY);

    document.getElementById("resultDP").textContent = `Pearson Correlation Coefficient For Duration and Popularity: ${correlationCoefficient.toFixed(2)}`;

  return correlationCoefficient;
  
  }

function plotBubbleChart(jsonData) {
    var data = jsonData[1]; // Assuming data is an array of objects

    // Create an array of traces where each trace represents a data point
    var traces = data.map(function(song) {
        return {
            x: [song.tempo], // X-coordinate
            y: [song.energy],   // Y-coordinate
            text: [song.song], // Text for hover
            hovertemplate: '<b>Album Name:</b> ' + song.album_data.album_name + '<br><b>Album Release:</b> ' + song.album_data.album_release_date + '<br><b>Song:</b> ' + song.song,
            mode: 'markers',
            type: 'scatter',
            name: song.song
        };
    });

    // Create the layout for the bubble chart
    var layout = {
        title: 'Correlation of Energy and Tempo for ' + artistInput.value,
        xaxis: {
            title: 'Tempo'
        },
        yaxis: {
            title: 'Energy'
        },
        height: 600,
        width: 600 // Increase the width for better visualization
    };

    // Plot the bubble chart with the array of traces
    Plotly.newPlot('bubble-chart', traces, layout);
}
function calculatePearsonCorrelationTE(jsonData) {
    const data = jsonData[1];
  
    const xValues = data.map(song => song.tempo);
    const yValues = data.map(song => song.energy);
  
    const calculateMean = (values) => values.reduce((acc, val) => acc + val, 0) / values.length;
    const meanX = calculateMean(xValues);
    const meanY = calculateMean(yValues);
  
    const sumOfDifferencesProduct = xValues.reduce((acc, x, index) => {
      const differenceX = x - meanX;
      const differenceY = yValues[index] - meanY;
      return acc + (differenceX * differenceY);
    }, 0);
  
    const sumOfSquaredDifferenceX = xValues.reduce((acc, x) => {
      const differenceX = x - meanX;
      return acc + (differenceX * differenceX);
    }, 0);
  
    const sumOfSquaredDifferenceY = yValues.reduce((acc, y) => {
      const differenceY = y - meanY;
      return acc + (differenceY * differenceY);
    }, 0);
  
    const correlationCoefficient = sumOfDifferencesProduct / Math.sqrt(sumOfSquaredDifferenceX * sumOfSquaredDifferenceY);

    document.getElementById("resultTE").textContent = `Pearson Correlation Coefficient For Tempo and Energy: ${correlationCoefficient.toFixed(2)}`;

  return correlationCoefficient;
  
  }

function plotGaugeChart(jsonData){
    var Array = jsonData[1];
    var ArrayEnergy = Array.map(function(song){
        return song.popularity
    })
    function getAverage(array) {
        const sum = array.reduce((acc, val) => acc + val, 0);
        return sum / array.length ;
    }

    var averageEnergy = getAverage(ArrayEnergy);

    var trace = {
        domain: {x:[0, 100], y:[0,100]},
        value: averageEnergy,
        title: {text: "Average Popularity for " + artistInput.value, font: {size:20}},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null, 100]},
            bar: {color: "Greens(68,166,198)"},
            steps: [
                {range: [0,10], color: "rgb(233,245,248)"},
                {range: [10,20], color: "rgb(218,237,244)"},
                {range: [20,30], color: "rgb(203,230,239)"},
                {range: [30,40], color: "rgb(188,223,235)"},
                {range: [40,50], color: "rgb(173,216,230)"},
                {range: [50,60], color: "rgb(158,209,225)"},
                {range: [60,70], color: "rgb(143,202,221)"},
                {range: [70,80], color: "rgb(128,195,216)"},
                {range: [80,90], color: "rgb(113,187,212)"},
                {range: [90,100], color: "rgb(98,180,207)"},

            ]
        }
    }
    Plotly.newPlot("gauge", [trace]);
}

function plotDurationBarGraph(jsonData) {
    var durationData = jsonData.map(function(song) {
        return song.duration;
    });
    var songNames = jsonData.map(function(song) {
        return song.song;
    });
    // Create the trace for the bar graph
    var trace = {
        x: songNames,
        y: durationData,
        type: 'bar'
    };
    // Create the layout for the bar graph
    var layout = {
        title: 'Duration of Songs by ' + artistInput.value,
        xaxis: {
            title: 'Song'
        },
        yaxis: {
            title: 'Duration (seconds)'
        },
        font: {size:8},
        height: 600,
        width: 600
    };
    // Combine the trace and layout and plot the graph
    Plotly.newPlot('bar', [trace], layout);
}

function plotValanceHistogram(jsonData) {
    var data = jsonData[1]; // Assuming data is an array of objects

    // Create an array of traces where each trace represents a data point
    var traces = data.map(function(song) {
        return {
            x: [song.valence], // X-coordinate
            y: [song.tempo],   // Y-coordinate
            hovertemplate: '<b>Album Name:</b> ' + song.album_data.album_name + '<br><b>Album Release:</b> ' + song.album_data.album_release_date + '<br><b>Song:</b> ' + song.song,
            mode: 'markers',
            type: 'scatter',
            name: song.song,
            text: [song.song] // Text for hover
        };
    });

    // Create the layout for the scatter plot
    var layout = {
        title: 'Correlation of Valence and Tempo of Songs for ' + artistInput.value,
        xaxis: {
            title: 'Valence'
        },
        yaxis: {
            title: 'Tempo'
        },
        height: 600,
        width: 600
    };

    // Plot the graph with the array of traces
    Plotly.newPlot('valance', traces, layout);
}

function calculatePearsonCorrelation(jsonData) {
    const data = jsonData[1];
  
    const xValues = data.map(song => song.valence);
    const yValues = data.map(song => song.popularity);
  
    const calculateMean = (values) => values.reduce((acc, val) => acc + val, 0) / values.length;
    const meanX = calculateMean(xValues);
    const meanY = calculateMean(yValues);
  
    const sumOfDifferencesProduct = xValues.reduce((acc, x, index) => {
      const differenceX = x - meanX;
      const differenceY = yValues[index] - meanY;
      return acc + (differenceX * differenceY);
    }, 0);
  
    const sumOfSquaredDifferenceX = xValues.reduce((acc, x) => {
      const differenceX = x - meanX;
      return acc + (differenceX * differenceX);
    }, 0);
  
    const sumOfSquaredDifferenceY = yValues.reduce((acc, y) => {
      const differenceY = y - meanY;
      return acc + (differenceY * differenceY);
    }, 0);
  
    const correlationCoefficient = sumOfDifferencesProduct / Math.sqrt(sumOfSquaredDifferenceX * sumOfSquaredDifferenceY);

    document.getElementById("result").textContent = `Pearson Correlation Coefficient For Valance and Popularity: ${correlationCoefficient.toFixed(2)}`;

  return correlationCoefficient;
  
  }


  
  
  

