'use strict';
const userNameInput = document.getElementById('user-name')
const assessmentButton = document.getElementById('assessment')
const resultDivision = document.getElementById('result-area')
const tweetDivision = document.getElementById('tweet-area')

assessmentButton.addEventListener(
  'click', // イベント名
  () => {
    const userName = userNameInput.value; // 入力欄の値(value)を取得
    if (userName.length === 0) { // 入力が空のとき
      return; // 関数の処理を終了する
    }

    // 診断結果表示エリアを作成
    resultDivision.innerText = ''; // 表示エリアのdivの中身を空にする。<div id="result-area"></div>
    const heading = document.createElement('h3') // <h3></h3>
    heading.innerText = '診断結果'; // <h3>診断結果</h3>
    resultDivision.appendChild(heading); // <div id="result-area"><h3>診断結果</h3></div>

    const paragraph = document.createElement('p'); // <p></p>
    const result = assessment(userName); // 診断結果の文章
    paragraph.innerText = result; // <p>〇〇のいいところは〜〇〇です〜</p>
    resultDivision.appendChild(paragraph);

    // ツイートエリアの作成
    tweetDivision.innerText = ''; // ツイートエリアの中身を空にする。
    const anchor = document.createElement('a') // aタグの(HTMLエレメント)作成
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') +
      '&ref_src=twsrc%5Etfw';
    // aタグに属性を追加
    anchor.setAttribute('href', hrefValue) // href属性を追加
    anchor.setAttribute('class', 'twitter-hashtag-button') // class属性を追加
    anchor.setAttribute('data-text', result) // data-text属性を追加
    // aタグの挟まれる文章を設定
    anchor.innerText = 'Tweet #あなたのいいところ'; // innertTextはタグの内側の文章を設定できる。
    // ツイートエリアの子要素として追加
    tweetDivision.appendChild(anchor)

    // widgets.jsを読み込む
    const script = document.createElement('script')//scriptタグを作る
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')//src属性を追加
    // ツイートエリアの子要素として追加
    tweetDivision.appendChild(script)
  }
);


const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
]

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  let sumOfCharCode = 0; //文字コードの合計値

  for (let i = 0; i < userName.length; i++) { // 文字数の分だけループ
    sumOfCharCode += userName.charCodeAt(i); // 合計値を計算
  }

  // 配列の添字を計算
  // 配列の要素数で割った余りを計算することで、配列の添字の範囲の数に収まる
  const index = sumOfCharCode % answers.length;
  // 添字の文章を配列から取り出す
  const unFinishedText = answers[index];
  const result = unFinishedText.replaceAll('###userName###', userName);
  // 結果を返す。
  return result;
}

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)


// テストを行う関数
function test() {
  console.log('診断結果の文章のテスト')

  // 太郎さんの場合
  console.log('太郎')
  console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部位を名前に置き換える処理が正しくありません。'
  )

  // 次郎
  console.log('次郎')
  console.assert(
    assessment('次郎') ===
    '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部位を名前に置き換える処理が正しくありません。'
  )

  // 花子
  console.log('花子')
  console.assert(
    assessment('花子') ===
    '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部位を名前に置き換える処理が正しくありません。'
  )

  console.log('診断結果の文章のテスト終了')

  console.log('同じ名前なら、同じ結果を出力することのテスト')
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.assert(
    assessment('次郎') === assessment('次郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.assert(
    assessment('花子') === assessment('花子'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('同じ名前なら、同じ結果を出力することのテスト終了')
}

test();