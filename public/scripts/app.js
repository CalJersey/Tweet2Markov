console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  $.ajax({
     method: 'GET',
     url: '/generate',
     success: handleSuccess,
     error: handleError
   });

});



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
