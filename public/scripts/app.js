console.log("Sanity Check: JS is working!");
//initialize pagination vars
let page = 0;
const limit = 20;

$(document).ready(function(){
  //initial set of psXX Markov
  getTweetList();

});

function getMarkov() {
  let TwitterName = document.getElementById("TwitterName").value;

  //clear any previous errors
  clearError();

  //Twitter handle passed
  if (TwitterName.length) {
    //loading icon
    toggleSpinner();

    //generate new tweet
    $.ajax({
       method: 'GET',
       url: `/generate?TN=${TwitterName}`,
       success: updateTweetList,
       error: handleError,
    });
  } else {
    displayError("Please enter a twitter handle to generate the Markov chain from.");
  }
}

function getTweetList() {
  //increment page var to grab next pages records
  page += 1;

  //grab page of tweets
  $.ajax({
     method: 'GET',
     url: `/getTweets?page=${page}&limit=${limit}`,
     success: buildTweetList,
     error: handleError
  });
}

//format tweet content for display
function formatTweet(tweet, twitterName) {
  return `<li class="tweet">"${tweet}"<div class="twitterName">-impersonating ${twitterName}</div></li>`;
}

//add tweets to page
function buildTweetList(json){
  let div = Document.getElementById(tweetList);
  let content;
  let moreLink = document.getElementById("moreLink");

  //build content
  json.forEach(function(item,index){
    content = content + formatTweet(item.tweetText,item.twitterName);
  })

  //append to tweetlist
  div += content;

  //if displaying a full set of tweets display link to get more
  if (json.length = limit) {
    moreLink.innerHTML = '<a onClick="getTweetList();">&lt;&lt; more &gt;&gt;';
  } else {
    //otherwise signify end
    moreLink.innerHTML = '<span class="contentEnd">-- end --</span>'
  }
}

function updateTweetList(content) {
  //stop spinner
  toggleSpinner();

  //ensure new tweet title is populated
  titleDiv = document.getElementById("markovNewTweetTitle");
  titleDiv.innerHTML = "Your new Markov chain tweet";

  //move newest tweet to tweet list
  let newDiv = document.getElementById("markovNewTweet");
  let listDiv =  document.getElementById("markovList");

  listDiv.innerHTML = newDiv.innerHTML + listDiv.innerHTML;

  newDiv.innerHTML = formatTweet(content.tweetText,content.twitterName);

  // let content=JSON.parse(json);
  // contentNew =  content.forEach(function(v,i){
  //    `<div>${v.name}</div>`
  //  });
  // $("div.container").append(contentNew);
}

function handleError(xhr, status, errorThrown) {
  // console.log(`xhr=${xhr}`);
  // console.log(`status=${status}`);
  // console.log(`errorThrown=${errorThrown}`);
  toggleSpinner();
  let msg = 'An unknown error has occurred.'
  displayError(msg);
}

function displayError(msg) {
  document.getElementById("errorText").innerHTML = msg;
}

function clearError() {
  document.getElementById("errorText").innerHTML = '';
}

function toggleSpinner() {
  $('#generateButton').toggle();
  $('#iconChain').toggle();
  $('#spinner').toggle();
}

// function hideSpinner() {
//   document.getElementById('spinner').style.display = 'none';
//  document.getElementById('generateButton').style.display = 'inline';
//   document.getElementById('iconChain').style.display = 'inline';
// }
