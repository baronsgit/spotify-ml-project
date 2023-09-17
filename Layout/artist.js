var artistVal = "";
var chartH = 400;
var chartW = 400;

$(document).ready(function () {
    testvalues();

    $("#myButton").click(function () {
        loadPage();
    });
    $("#userinput").keypress(function (e) {
        if (e.which == 13) {
            loadPage();
        }
    });
});

function testvalues() {
    $("#artistInput").val("Eve");
    loadPage();
}

function loadPage() {
    artistVal = $("#artistInput").val();
    $("#message").html("You got good taste with " + artistVal);

    url = `https://spotifymlflask.azurewebsites.net/api/v1.0/${artistVal}`
    d3.json(url).then(function (data) {
        // console.log(data)
        plotPopularityBarGraph(data)
        plotGaugeChart(data)
        plotTempoHistogram(data)
        plotBubbleChart(data)
        plotValanceHistogram(data)
        artistpic(data)
        artistfollowers(data)
    });
}

function artistpic() {
    d3.json(url).then(function (data) {
        var img = document.createElement("img");
        img.src = data[0].artist_image;
        img.style.height = chartH + 'px';
        img.style.width = chartW + 'px';
        $("#image_url_1").html(img);
    })
}
function artistfollowers() {
    d3.json(url).then(function (data) {
        var num = data[0].artist_followers;
        var followerCount = "Follower Count: " + num.toLocaleString();
        $("#artist_followers").html(followerCount);
    })
}

function plotPopularityBarGraph(jsonData) {
    // Extract the first array from the JSON data
    var Array = jsonData[1];

    // Extract the popularity values from the first array
    var popularityData = Array.map(function (song) {
        return song.popularity;
    });

    // Extract the song names from the first array
    var songNames = Array.map(function (song) {
        return song.song;
    });

    // Create the trace for the bar graph
    var trace = {
        x: songNames,
        y: popularityData,
        type: 'bar'
    };

    // Create the layout for the bar graph
    var layout = {
        title: `Popularity of Songs for ` + artistInput.value, titlefont: { size: 17 },
        xaxis: {
            title: 'Song'
        },
        yaxis: {
            title: 'Popularity'
        },
        font: { size: 8 },
        height: chartH,
        width: chartW
    };

    // Combine the trace and layout and plot the graph
    Plotly.newPlot('popularity-chart', [trace], layout);
}

function plotTempoHistogram(jsonData) {
    // Extract the tempo values from the first array
    var Array = jsonData[1];
    var ArrayPopularity = Array.map(function (song) {
        return song.popularity;
    });
    var ArrayDanceability = Array.map(function (song) {
        return song.danceability
    });

    var Artist = Array.map(function (song) {
        return song.artist
    })
    var Song = Array.map(function (song) {
        return song.song
    })
    // Create the traces for the histogram
    var trace1 = {
        x: ArrayDanceability,
        y: ArrayPopularity,
        mode: 'markers',
        type: 'scatter',
        name: 'Artist & Songs',
        text: Song
    };

    // Create the layout for the histogram
    var layout = {
        title: 'Popularity and Danceability for ' + artistInput.value,
        xaxis: {
            title: 'Dancibility '
        },
        yaxis: {
            title: 'Popularity'
        },
        height: chartH,
        width: chartW
    };

    // Combine the traces and layout and plot the graph
    Plotly.newPlot('tempo-histogram', [trace1], layout);
}
// need to add popout for information on the html for each of the scatterplots


function plotBubbleChart(jsonData) {
    var Array = jsonData[1];
    var ArrayPopularity = Array.map(function (song) {
        return song.popularity
    });
    var ArrayEnergy = Array.map(function (song) {
        return song.energy
    })
    var ArrayTempo = Array.map(function (song) {
        return song.tempo
    })

    var Song = Array.map(function (song) {
        return song.song
    })

    // var size = ArrayPopularity
    var TraceB = {
        x: ArrayTempo,
        y: ArrayEnergy,
        text: Song,
        mode: 'markers',
        marker: {
            size: ArrayPopularity,
            color: ArrayTempo,
            colorscale: 'delta'
            // sizeref:1
        }

    };

    var layout = {
        title: "Energy & Tempo Measured for " + artistInput.value,
        xaxis: {
            title: 'Tempo '
        },
        yaxis: {
            title: 'Energy'
        },
        showlegend: false,
        height: chartH,
        width: chartW
    }

    Plotly.newPlot('bubble-chart', [TraceB], layout)

};
// change this for correlation for better understanding of energy and tempo.


function plotGaugeChart(jsonData) {
    var Array = jsonData[1];
    var ArrayEnergy = Array.map(function (song) {
        return song.popularity
    })
    function getAverage(array) {
        const sum = array.reduce((acc, val) => acc + val, 0);
        return sum / array.length;
    }

    var averageEnergy = getAverage(ArrayEnergy);

    var trace = {
        domain: { x: [0, 100], y: [0, 100] },
        value: averageEnergy,
        title: { text: "Average Popularity for " + artistInput.value, font: { size: 20 } },
        type: "indicator",
        mode: "gauge+number",
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
        }, size: 200
    }
    Plotly.newPlot("gauge", [trace], { height: chartH, width: chartW });
}

// // can be used for recommendations too. needs to be added to html for its own plot and its own function

// Need to update to work with the new JSON array
function plotDurationBarGraph(jsonData) {
    var durationData = jsonData.map(function (song) {
        return song.duration;
    });
    var songNames = jsonData.map(function (song) {
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
        font: { size: 8 },
        height: chartH,
        width: chartW
    };
    // Combine the trace and layout and plot the graph
    Plotly.newPlot('bar', [trace], layout);
}

function plotValanceHistogram(jsonData) {
    // Extract the tempo values from the first array
    var Array = jsonData[1];
    var ArrayTempo = Array.map(function (song) {
        return song.tempo;
    });
    var ArrayValence = Array.map(function (song) {
        return song.valence
    });

    var Artist = Array.map(function (song) {
        return song.artist
    })
    var Song = Array.map(function (song) {
        return song.song
    })
    // Create the traces for the histogram
    var trace = {
        x: ArrayValence,
        y: ArrayTempo,
        mode: 'markers',
        type: 'scatter',
        name: 'Artist & Songs',
        text: Song
    };

    // Create the layout for the histogram
    var layout = {
        title: 'Valance and Tempo for ' + artistInput.value,
        xaxis: {
            title: 'Valance '
        },
        yaxis: {
            title: 'Tempo'
        },
        height: chartH,
        width: chartW
    };

    // Combine the traces and layout and plot the graph
    Plotly.newPlot('valance', [trace], layout);
}