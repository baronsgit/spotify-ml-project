function init(){
    url1 = 'http://127.0.0.1:5501/api/v1.0/trackrec/homecoming'
    url2 = 'http://127.0.0.1:5501/api/v1.0/track/homecoming'
    d3.json(url2).then(function(data2){
        console.log(data2)
    })
    d3.json(url1).then(function(data1){
        console.log(data1)
    })
    
}