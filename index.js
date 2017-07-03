function init() {
  getData(getUniqueSearchIdentifier());
}

function  getUniqueSearchIdentifier() {
   return Math.floor(Math.random()*1E16);
}

function callApi(randomNumber) {
  return $.ajax({
    type: 'GET',
    url: 'http://momondodevapi.herokuapp.com/api/1.0/FlightSearch/' + randomNumber,
    data: JSON.stringify(),
    dataType: 'json'
  });
}

function getData(uniqueSearchIdentifier) {
  callApi(uniqueSearchIdentifier).done(function(result) {
    addTicketsToDom(result);
    if(!result.Done) {
      getData(uniqueSearchIdentifier);
    }
  }).fail(function(error) {
    console.log('some thing is wrong, Error code is: ' + error);
    console.log(error);
  });
}

var template = new template();

function addTicketsToDom(data) {
  $('#template-place').html(template.getTemplate(data));
}

init();
