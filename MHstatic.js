

let submitButton = document.querySelector("#myButton");
let songInput = document.querySelector("#songInput");
let message = document.querySelector("#message");
let message2 = document.querySelector("#message2");

function myFunction() {
    message.innerHTML = " You got good taste with " + songInput.value;

    init()
}



function init(){
    // url = `http://192.168.4.52:5501/api/v1.0/trackrec/${songInput.value}`
    url = `https://spotifymlflask.azurewebsites.net/api/v1.0/trackrec/${songInput.value}`
    d3.json(url).then(function(data){
        myArray = data
        youChose(myArray)
        buildTable(myArray[1])
        console.log(myArray)
    })
//console.log(url)    
}

myArray = []

// static array
// myArray = [
//     {"artist":"A", "song":"1", "album_name":"I", "album_photo":"pic"},
//     {"artist":"B", "song":"2", "album_name":"II", "album_photo":"pic"},
//     {"artist":"C", "song":"3", "album_name":"III", "album_photo":"pic"},
//     {"artist":"D", "song":"4", "album_name":"IV", "album_photo":"pic"},
// ]


// ajax
// $.ajax({
//     method:"GET",
//     url:`http://192.168.0.73:5501/api/v1.0/trackrec/${songInput.value}`,
//     success:function(response){
//         myArray = response
//         console.log(myArray)
//     }
// })
function youChose(data){
    console.log(data)
    message2.innerHTML = " You chose " + data[0].song + " by " + data[0].artist;
}

function buildTable(data){
    var table = document.getElementById("dyTable")
    table.innerHTML = '';
    if (data.length >= 10){
        for (var i = 0; i < 10; i++) {
            var row = `<tr>
                        <td>${data[i].artist}</td>
                        <td>${data[i].song}</td>
                        <td>${data[i].album.album_name}</td>
                        <td><img src=${data[i].album.album_photo}></td>
                </tr>`
            table.innerHTML += row
        }
    }
    else {
        for (var i = 0; i < data.length; i++) {
            var row = `<tr>
                    <td>${data[i].artist}</td>
                    <td>${data[i].song}</td>
                    <td>${data[i].album.album_name}</td>
                    <td><img src=${data[i].album.album_photo}></td>
                </tr>`
            table.innerHTML += row
        }
    }
};
