console.log("Sanity Check: JS is working!");

$(document).ready(function(){


});

function getMarkov() {
  let TwitterName = $("#TwitterName");
  if (TwitterName[0] == '@') TwitterName = TwitterName.substr(1);
  if (TwitterName.val()) {
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
