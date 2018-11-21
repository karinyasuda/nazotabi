// console.log('Hello World');

var axios = require('axios');//ライブラリを読み込む
var express = require('express');
var app = express();
// function reload(){
// HTTPリクエストを受け取る部分
app.get('/', function (req, res) {
  var place
  var activity
  axios.get('https://scrapbox.io/api/pages/nazotabi/place/text')
  .then(response => {
    // console.log(response.data);
    var arr = (response.data.split('\n'));
    arr.shift();
    var x = arr.filter(function(e){return e !== "";});
    console.log(x);

    // var str = arr.length;
    place = x[Math.floor(Math.random()* x.length)];


      axios.get('https://scrapbox.io/api/pages/nazotabi/activity/text')
      .then(response => {
        // console.log(response.data);
        var arr2 = (response.data.split('\n'));
        arr2.shift();
        var y = arr2.filter(function(e){return e !== "";});
        console.log(y);

        // var str = arr.length;
        activity = y[Math.floor(Math.random()* y.length)];
        // res.send(j);

        res.send(place + "で" + activity + "しろ");


      }).catch(error => {console.log(error)});


  }).catch(error => {console.log(error)});



});

// };





// サーバーを起動する部分
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

axios.get('https://scrapbox.io/api/pages/nazotabi/place/text')
.then(response => {
  // console.log('Sucsess');
  // console.log(response);
  console.log(response.data);
}).catch(error => {console.log(error)});
