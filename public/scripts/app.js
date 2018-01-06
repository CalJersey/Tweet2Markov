console.log("Sanity Check: JS is working!");

// $(document).ready(function(){
//
//
// });

function getMarkov() {
  let TwitterName = document.getElementById("TwitterName").value;
console.log(TwitterName);
  if (TwitterName.length) {
    //Trim @ sign if exists
    //if (TwitterName[0] == '@') TwitterName = TwitterName.substr(1);

    $.ajax({
       method: 'GET',
       url: `/generate?TN=${TwitterName}`,
       success: handleSuccess,
       error: handleError
    });
  }
}

function handleSuccess(json) {
  console.log(json)
  // let content=JSON.parse(json);
  // contentNew =  content.forEach(function(v,i){
  //    `<div>${v.name}</div>`
  //  });
  // $("div.container").append(contentNew);
}

function handleError(xhr, status, errorThrown) {
  console.log('uh oh');
}
