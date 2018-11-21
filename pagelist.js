var axios = require('axios');//ライブラリを読み込む
var express = require('express');
var app = express();

var array
var json
var obj
var title
var descriptions
var random
var place = []
var activity = []
var randomplace
var randomactivity
app.get('/', function (req, res)  {
  axios.get('http://scrapbox.io/api/pages/nazotabi')
  .then(response => {
    // console.log(response.data);
    //responsedataの中からpagesの内容を配列に入れる
    array = response.data.pages;
    for (let i = 0 ; i <array.length ; i ++ ){
      title = array[i]["title"]
      descriptions = array[i]["descriptions"]
      //indexOf()ではマッチしなかったとき-1を返す。 > -1 ということはマッチした場合を表している
      if (descriptions.indexOf("#place") > -1 ){
        //配列　placeに追加する
        place.push(array[i])
        // console.log(place);
      }else if(descriptions.indexOf("#activity") > -1 ){
        activity.push(array[i])
        // title = activity["title"]
        // descriptions = activity["descriptions"]
        // // console.log(activity);
      };
      // title = array[i]["title"]
      // descriptions = array[i]["descriptions"]
      // console.log (array[i]["title"] + "\n" + array[i]["descriptions"]);
      // console.log (title);
      // random = array[Math.floor(Math.random()* array.length)];
      // console.log(random.title);
    };
    // random = array[Math.floor(Math.random()* array.length)];

    randomplace = place[Math.floor(Math.random()*place.length)];
    randomactivity = activity[Math.floor(Math.random()*activity.length)];


    // console.log(random);
    console.log(randomplace);
    console.log(randomactivity);
    // console.log(random.title);
    // console.log(random.descriptions);

    //ブラウザに出力
    //randomのtitileとrandomの内容を表示する
    // res.send(random.title + random.descriptions);

    //randomplaceからタイトルを。randomactivityからタイトルを
    res.send(randomplace.title +"で"+ randomactivity.title + "しろ");
    // console.log(randomplace.title + randomactivity.title);


  });
});


// サーバーを起動する部分
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});