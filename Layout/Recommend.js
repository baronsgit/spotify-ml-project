var artistVal = "";
var popVal = "";
var chartH = 300;
var chartW = 300;

$(document).ready(function () {
    // testvalues();

    $("#myButton").click(function () {
        loadPage();
    });
    $("#userinput").keypress(function (e) {
        // console.log(e.which);
        if (e.which == 13) {
            loadPage();
        }
    });
});

function testvalues() {
    $("#artistInput").val("Eve");
    $("#popInput").val("50");
    loadPage();
}

function loadPage() {
    artistVal = $("#artistInput").val();
    popVal = $("#popInput").val();
    $("#message").html("I also like " + artistVal + " with popularity of " + popVal);

    url = `https://spotifymlflask.azurewebsites.net/api/v1.0/${artistVal}/${popVal}`
    d3.json(url).then(function (data) {
        // console.log(data)
        plotDurationBarGraph(data)
        plotPieChart(data)
        plotDanceability(data)
        calculatePearsonCorrelationDD(data)
        plotTempoEnergy(data)
        calculatePearsonCorrelationTE(data)
        plotGaugeChart(data)
    });
}

function plotDurationBarGraph(jsonData) {
    // Extract the second array from the JSON data
    var Array = jsonData;

    // Extract the duration values from the second array
    var durationData = Array.map(function (song) {
        return song.duration;
    });

    // Extract the song names from the second array
    var songNames = Array.map(function (song) {
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
        title: 'Duration of Recommended Songs Based on ' + artistVal,
        titlefont: { size: 18, wieght: "bold" },
        xaxis: {
            title: 'Song',
            titlefont: { size: 18, wieght: "bold", y: 1.2 },
            domain: [0, 1]
        },
        yaxis: {
            title: 'Duration (Seconds)',
            titlefont: { size: 18, wieght: "bold" },
            domain: [0.35, 1]
        },
        font: { size: 8 }
    };

    // Combine the trace and layout and plot the graph
    Plotly.newPlot('bar', [trace], layout, size = [chartH, chartW]);
};

// need to make a plot of the artist only to show case difference between artist and recommendations
// also make it into ascending order

function plotPieChart(jsonData) {
    console.log(jsonData);
    jsonData.sort((a, b) => b.popularity - a.popularity);
    jsonData = jsonData.slice(0, 30);
    var artistSongCount = {};
    $.each(jsonData, function (key, value) {
        var artst = value.artist;
        if (artistSongCount[artst]) {
            artistSongCount[artst]++;
        }
        else {
            artistSongCount[artst] = 1;
        }
    });
    console.log(artistSongCount);
    var trace = {
        type: 'pie',
        labels: Object.keys(artistSongCount),
        values: Object.values(artistSongCount)
    };
    var display = {
        title: 'Percent of Artist Recommendations based on ' + artistVal,
        font: { size: 10 }
    }
    Plotly.newPlot('pie', [trace], display, size = [chartH, chartW]);
}

function plotGaugeChart(jsonData) {
    var Array = jsonData;
    var ArrayEnergy = Array.map(function (song) {
        return song.energy
    })
    function getAverage(array) {
        const sum = array.reduce((acc, val) => acc + val, 0);
        return sum / array.length * 100;
    }

    var averageEnergy = getAverage(ArrayEnergy);

    var trace = {
        domain: { x: [0, 100], y: [0, 100] },
        value: averageEnergy,
        title: { text: "Average Energy for Recommendations based on " + artistVal, font: { size: 18 } },
        type: "indicator",
        mode: "gauge+number",
        height: chartH,
        width: chartH,
        gauge: {
            axis: { range: [null, 100] },
            bar: { color: "Greens(68,166,198)" },
            steps: [
                { range: [0, 10], color: "rgb(233,245,248)" },
                { range: [10, 20], color: "rgb(218,237,244)" },
                { range: [20, 30], color: "rgb(203,230,239)" },
                { range: [30, 40], color: "rgb(188,223,235)" },
                { range: [40, 50], color: "rgb(173,216,230)" },
                { range: [50, 60], color: "rgb(158,209,225)" },
                { range: [60, 70], color: "rgb(143,202,221)" },
                { range: [70, 80], color: "rgb(128,195,216)" },
                { range: [80, 90], color: "rgb(113,187,212)" },
                { range: [90, 100], color: "rgb(98,180,207)" },

            ]
        }
    }
    Plotly.newPlot("gauge", [trace]);
}

function plotDanceability(jsonData) {
    var data = jsonData; // Assuming data is an array of objects

    // Create an array of traces where each trace represents a data point
    var traces = data.map(function (song) {
        return {
            x: [song.danceability], // X-coordinate
            y: [song.popularity],   // Y-coordinate
            hovertemplate: '<b>Artist:</b> ' + song.artist + '<br><b>Song:</b> ' + song.song + '<br><b>Album Name:</b> ' + song.album_data.album_name,
            mode: 'markers',
            type: 'scatter',
            name: song.song,
            text: [song.song] // Text for hover
        };
    });

    // Create the layout for the scatter plot
    var layout = {
        title: 'Correlation of Popularity and Danceability of Songs for ' + artistInput.value,
        xaxis: {
            title: 'Danceability'
        },
        yaxis: {
            title: 'Popularity'
        }
    };

    // Plot the graph with the array of traces
    Plotly.newPlot('dd', traces, layout, size = [chartH, chartW]);
}

function calculatePearsonCorrelationDD(jsonData) {
    const data = jsonData;

    const xValues = data.map(song => song.danceability);
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

    document.getElementById("resultDD").textContent = `Pearson Correlation Coefficient For Danceability and Popularity: ${correlationCoefficient.toFixed(2)}`;

    return correlationCoefficient;

}

function plotTempoEnergy(jsonData) {
    var data = jsonData; // Assuming data is an array of objects

    // Create an array of traces where each trace represents a data point
    var traces = data.map(function (song) {
        return {
            x: [song.tempo], // X-coordinate
            y: [song.energy],   // Y-coordinate
            hovertemplate: '<b>Artist:</b> ' + song.artist + '<br><b>Song:</b> ' + song.song + '<br><b>Album Name:</b> ' + song.album_data.album_name,
            mode: 'markers',
            type: 'scatter',
            name: song.song,
            text: [song.song] // Text for hover
        };
    });

    // Create the layout for the scatter plot
    var layout = {
        title: 'Tempo and Energy of Songs for ' + artistInput.value,
        xaxis: {
            title: 'Tempo'
        },
        yaxis: {
            title: 'Energy'
        }
    };

    // Plot the graph with the array of traces
    Plotly.newPlot('te', traces, layout, size = [chartH, chartW]);
}

function calculatePearsonCorrelationTE(jsonData) {
    const data = jsonData;

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