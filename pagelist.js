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

var $placetitle
var $activitytitle
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
    placetitle = randomplace.title;
    activitytitle = randomactivity.title;

    // console.log(random);
    $pimage = randomplace.image
    $aimage = randomactivity.image

  console.log("place と activity 内容")
    console.log(randomplace);
    console.log(randomactivity);

  console.log("imageのURL");
    console.log(randomplace.image);
    console.log(randomactivity.image);

  console.log("タイトルだけ出力");
    console.log(placetitle);
    console.log(activitytitle);



    // もし、randomplace.image、randomactivity,image がnullじゃなかったら/rawを.jpg にリプレースする
    if ($pimage == null){
       $pimagejpg = 'Placeの写真がありません';
       console.log($pimagejpg);
    }else if ($pimage != null) {
       $pimagejpg = $pimage.replace('/raw','.jpg');
       console.log($pimagejpg);
    };
    if($aimage == null){
      $aimagejpg = 'Activityの写真がありません';
    }else if ($aimage != null){
      $aimagejpg = $aimage.replace('/raw','.jpg')
      console.log($aimagejpg);

    };

    // console.log(random.title);
    // console.log(random.descriptions);

    //ブラウザに出力
    //randomのtitileとrandomの内容を表示する
    // res.send(random.title + random.descriptions);

    //randomplaceからタイトルを。randomactivityからタイトルを
    // res.set('Content-Type', 'image/raw');  //ヘッダの指定 jpeg
    // res.send(randomplace.title +"で"+ randomactivity.title + "してきて！");

    //index.pugに値を渡す。
    // res.render('index', {message: `${randomplace.title}で${randomactivity.title}してきて`});

    //----header----
    res.write('<!DOCTYPE html><br><html lang="ja"><br><head><br><meta http-equiv="content-type" content="text/html; charset=UTF-8"><br><title>Index</title><br>')
    res.write('<style type="text/css">');
    res.write('img {background-color: white; width: 500px; height: 500px; object-fit: contain;}');
    res.write('</style>');
    res.write('</head><br>');
    //----header----
    //----body----
    res.write('<boby>');
    res.write(placetitle);
    res.write('で');
    res.write(activitytitle);
    res.write('してきて<br>');


    res.write('<img src=');
    res.write($pimagejpg);
    res.write(' width=400px height=auto>');

    res.write('<img src=');
    res.write($aimagejpg);
    res.write(' width=400px height=auto><br>');

    // res.write('<script type= "text/javascript">');
    // res.write('const reloadButton = document.getElementById("reloadButton"); if (reloadButton != null){reloadButton.addEventListener("click",function(){console.log("新しい旅に出会います");location.reload();})}');
    // res.write('</script>');
    res.write('</body>')
    //----body----
    res.end();

    //テキストエリアに〜〜で〜〜してきて　と表示したかった時の部分
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
