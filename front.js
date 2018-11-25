// var axios = require('axios');//ライブラリを読み込む なぜエラーになる？
var x
var randomplace
var randomactivity
// script.src ="https://scrapbox.io/api/pages/nazotabi/place/text";
// document.body.appendChild(script);
// document.body.removeChild(script);
//
// function jsonData(data) {
//    console.log("We were called!");
//    console.log(data);
// }

function onload(){
  document.write("<script type='text/javascript' src='pagelist.js'></script>");
  console.log(x);

}

function go() {
     console.log("We were called!");//ログで確認
     target = document.getElementById("result");//id result を持つタグ要素を呼び出す
     target.innerHTML = "Where we go?";//innerHTMLは、htmlの内容を変更するのに活躍


}
