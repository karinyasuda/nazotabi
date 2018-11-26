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
window.onload = onLoad;

function onLoad(){//ロードされた時に実行されるよ！
  // document.write("<script type='text/javascript' src='pagelist.js'></script>");
  console.log(x);
  console.log("onLoad!");

}

function go() {//html goボタンでの動作
     console.log("We were called!");//ログで確認
     target = document.getElementById("result");//id result を持つタグ要素を呼び出す
     target.innerHTML = "Where we go?";//innerHTMLは、htmlの内容を変更するのに活躍


}
