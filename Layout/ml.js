
$(document).ready(function () {
    // Event listener for the form submission
    $('#songForm').submit(function (e) {
        e.preventDefault();
        loadSongData();
    });

    $('#songInput').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            loadSongData();
        }
    });

});

function loadSongData() {
    // Get the user-entered song    
    var songVal = $('#songInput').val();
    // console.log(songVal);
    // $('#results').style.display = 'block';

    url = `https://spotifymlflask.azurewebsites.net/api/v1.0/trackrec/${songVal}`
    d3.json(url).then(function (data) {
        // console.log(data)
        populateTable(data)
        $('#results').attr('style', 'visibility: visible;');
    });

}

function populateTable(jsonData) {
    // var resongTable = $('#resongTable').DataTable();
    // resongTable.clear().draw();

    var recsong = [jsonData[0]][0][0];
    console.log(recsong);
    $('#recArtist').html(recsong.artist);
    $('#recSong').html(recsong.song);
    $('#recAlbum').html(recsong.album.album);
    // $('#recAlbumReleaseDate').html(recsong.album.album_release_date);
    $('#recAlbumPhoto').html('<img src="' + recsong.album.album_photo + '" alt="Album Cover" width="50">');


    // Initialize DataTable
    var table = $('#songTable').DataTable();
    // Clear the table
    table.clear().draw();

    // Loop through the data and add matching songs to the table
    var recresults = [jsonData[1]];
    // console.log(recresults);

    for (var i = 0; i < recresults.length; i++) {
        for (var j = 0; j < recresults[i].length; j++) {
            var song = recresults[i][j];
            // console.log(song);
            // if (song.song.toLowerCase() === songToAnalyze.toLowerCase()) {
            table.row.add([
                song.artist,
                song.song,
                song.album.album_name,
                song.album.album_release_date,
                '<img src="' + song.album.album_photo + '" alt="Album Cover" width="50">'
            ]).draw();
            // }
        }
    }
}
