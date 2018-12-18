var axios = require('axios');//ライブラリを読み込む
var express = require('express');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// サーバーを起動する部分
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http:/ /%s:%s', host, port);
});

var array
var title
var descriptions
var image
var place = [] //place,image それぞれの配列に入れる
var activity = []
// var random
var randomplace
var randomactivity

var $pimagejpg //.jpgへreplace後
var $aimagejpg

function getVariable(){
   var x = "We were called!!!";//ログで確認
  return x;
}


app.get('/', function (req, res)  {
  axios.get('http://scrapbox.io/api/pages/nazotabi')
  .then(response => {
    // console.log(response.data);
    //responsedataの中からpagesの内容を配列に入れる
    array = response.data.pages;
    for (let i = 0 ; i <array.length ; i ++ ){
      title = array[i]["title"]
      descriptions = array[i]["descriptions"]
      image = array[i]["image"]
      //indexOf()ではマッチしなかったとき-1を返す。 > -1 ということはマッチした場合を表している
      if (descriptions.indexOf("#place") > -1 ){
        //配列　placeに追加する
        place.push(array[i])
        // console.log(place);
      }else if(descriptions.indexOf("#activity") > -1 ){
        activity.push(array[i])
      };
      // console.log (array[i]["title"] + "\n" + array[i]["descriptions"]);
      // console.log (title);
      // random = array[Math.floor(Math.random()* array.length)];
    };

    // ランダムはこう書く random = array[Math.floor(Math.random()* array.length)];
    randomplace = place[Math.floor(Math.random()*place.length)];
    randomactivity = activity[Math.floor(Math.random()*activity.length)];

    // console.log(random);
    $pimage = randomplace.image
    $aimage = randomactivity.image

  console.log("place と activity 内容")
    console.log(randomplace);
    console.log(randomactivity);
  console.log("imageのURL");
    console.log(randomplace.image);
    console.log(randomactivity.image);


    //もし、randomplace.image、randomactivity,image がnullじゃなかったら/rawを.jpg にリプレースする
    if ($pimage == 'null'){
       $pimagejpg = $pimage.replace('null','写真がありません');
    }else {
       $pimagejpg = $pimage.replace('/raw','.jpg');
    };
    if($aimage == 'null'){
      $aimagejpg = $aimage.replace('null','アクティビティの写真がありません');
    }else {
      $aimagejpg = $aimage.replace('/raw','.jpg')
    };

    console.log($pimagejpg);
    console.log($aimagejpg);

    // console.log(random.title);
    // console.log(random.descriptions);

    //ブラウザに出力
    //randomのtitileとrandomの内容を表示する
    // res.send(random.title + random.descriptions);

    //randomplaceからタイトルを。randomactivityからタイトルを
    // res.set('Content-Type', 'image/raw');  //ヘッダの指定 jpeg
    // res.send(randomplace.title +"で"+ randomactivity.title + "してきて！");
    res.render('index', {message: `${randomplace.title}で${randomactivity.title}してきて${$pimagejpg}`});
    // res.locals.placeimage = `${randomplace.image}`;
    // res.locals.activityimage = `${randomactivity.image}`;
    // res.render( 'index', {placeimage: `${randomplace.image}`});
    // res.render( 'index', {activityimage: `${randomactivity.image}`});
    // console.log(randomplace.title + randomactivity.title);
    // textarea.value = (randomplace.title +"で"+ randomactivity.title + "してきて！");

  });
});
// };
// app.put('/plus',function (req, res){
//
// });
