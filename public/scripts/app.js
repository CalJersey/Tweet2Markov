console.log("Sanity Check: JS is working!");

// $(document).ready(function(){
//
//
// });

function getMarkov() {
  let TwitterName = document.getElementById("TwitterName").value;

  clearError();

  if (TwitterName.length) {
    //working icon
    toggleSpinner();

    $.ajax({
       method: 'GET',
       url: `/generate?TN=${TwitterName}`,
       success: handleSuccess,
       error: handleError
    });
  } else {
    displayError("Please enter a twitter handle to generate the Markov chain from.");
  }
}

function handleSuccess(json) {
  console.log(json)
  toggleSpinner();
  // let content=JSON.parse(json);
  // contentNew =  content.forEach(function(v,i){
  //    `<div>${v.name}</div>`
  //  });
  // $("div.container").append(contentNew);
}

function handleError(xhr, status, errorThrown) {
  console.log('uh oh');
  toggleSpinner();
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
