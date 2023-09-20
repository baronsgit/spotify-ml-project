var artistVal = "";
var chartH = 400;
var chartW = 400;

$(document).ready(function () {
    // testvalues();

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
    console.log(url);
    d3.json(url).then(function (data) {
        // console.log(data)
        plotPopularityBarGraph(data)
        plotGaugeChart(data)
        plotTempoHistogram(data)
        plotBubbleChart(data)
        plotValanceHistogram(data)
        artistpic(data)
        artistfollowers(data)
        calculatePearsonCorrelation(data)
        calculatePearsonCorrelationDP(data)
        calculatePearsonCorrelationTE(data)
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
    var Array = jsonData[1];

    var popularityData = Array.map(function (song) {
        return song.popularity;
    });

    var songNames = Array.map(function (song) {
        return song.song;
    });

    popularityData.sort(function(a, b) {
        return b - a;
    });

    songNames.sort(function(a, b) {
        return popularityData[songNames.indexOf(b)] - popularityData[songNames.indexOf(a)];
    });

    var trace = {
        x: songNames,
        y: popularityData,
        type: 'bar'
    };

    var layout = {
        title: `Popularity of Songs for ` + artistInput.value, titlefont: { size: 12 },
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

    Plotly.newPlot('popularity-chart', [trace], layout);
}

function plotTempoHistogram(jsonData) {
    var data = jsonData[1]; 

    var traces = data.map(function(song) {
        return {
            x: [song.duration], 
            y: [song.popularity],   
            hovertemplate: '<b>Album Name:</b> ' + song.album_data.album_name + '<br><b>Album Release:</b> ' + song.album_data.album_release_date + '<br><b>Song:</b> ' + song.song,
            mode: 'markers',
            type: 'scatter',
            name: song.song,
            text: [song.song]
        };
    });

    var layout = {
        title: 'Correlation of Popularity and Duration of Songs for ' + artistInput.value,titlefont: { size: 12 },
        xaxis: {
            title: 'Duration'
        },
        yaxis: {
            title: 'Popularity'
        },
        height: chartH,
        width: chartW,
        showlegend:false
    };

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

    document.getElementById("resultDP").textContent = `Correlation For Duration and Popularity: ${correlationCoefficient.toFixed(2)}`;

  return correlationCoefficient;
  
  }

  function plotBubbleChart(jsonData) {
    var data = jsonData[1]; 

    var traces = data.map(function(song) {
        return {
            x: [song.tempo], 
            y: [song.energy],   
            text: [song.song],
            hovertemplate: '<b>Album Name:</b> ' + song.album_data.album_name + '<br><b>Album Release:</b> ' + song.album_data.album_release_date + '<br><b>Song:</b> ' + song.song,
            mode: 'markers',
            type: 'scatter',
            name: song.song
        };
    });
    var layout = {
        title: 'Correlation of Energy and Tempo for ' + artistInput.value,titlefont: { size: 12 },
        xaxis: {
            title: 'Tempo'
        },
        yaxis: {
            title: 'Energy'
        },
        height: chartH,
        width: chartW,
        showlegend:false
    };

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

    document.getElementById("resultTE").textContent = `Correlation For Tempo and Energy: ${correlationCoefficient.toFixed(2)}`;

  return correlationCoefficient;
  
  }

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
        title: { text: "Average Popularity for " + artistInput.value, font: { size: 14} },
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
        }
    }
    Plotly.newPlot("gauge", [trace], { height: chartH, width: chartW });
}

function plotValanceHistogram(jsonData) {
    var data = jsonData[1]; 


    var traces = data.map(function(song) {
        return {
            x: [song.valence],
            y: [song.tempo],   
            hovertemplate: '<b>Album Name:</b> ' + song.album_data.album_name + '<br><b>Album Release:</b> ' + song.album_data.album_release_date + '<br><b>Song:</b> ' + song.song,
            mode: 'markers',
            type: 'scatter',
            name: song.song,
            text: [song.song] 
        };
    });


    var layout = {
        title: 'Correlation of Valence and Tempo of Songs for ' + artistInput.value, titlefont: { size: 12 },
        xaxis: {
            title: 'Valence'
        },
        yaxis: {
            title: 'Tempo'
        },
        height: chartH,
        width: chartW,
        showlegend:false
    };


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

    document.getElementById("result").textContent = `Pearson Correlation Coefficient For Valance and Tempo: ${correlationCoefficient.toFixed(2)}`;

  return correlationCoefficient;
  
  }