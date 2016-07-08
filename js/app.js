$(function(){

  $("#location-search").submit(function(event){
    event.preventDefault();
    // console.log('formsubmit');

    var spotID = $("#surf-spot").val();

    search(spotID);
    $("#results-table tbody").html("");
    $("#surf-spot").val("");
  });


  function displayResults(data){

    
    // use jquery to create a new table row containing data received from the API
    for (var i = data.length - 1; i >= 0; i--) {
      $("#results-table")
      .append("<tr><td>" + data[i].localTimestamp 
              + " " + "</td><td>" + data[i].wind.speed + "</td><td>" +  data[i].fadedRating
              + "</td><td>" + data[i].solidRating + "</td><td>" 
              + data[i].condition.temperature + "</td><td>"+ data[i].wind.gusts + " "
              + "</td></tr>");
      data[i]
    }
    // $.each(data, function(){
    //   $("#results-table")
    //   .append("<tr><td>" + result.localTimestamp 
    //           + " " + "</td><td>" + result.wind.speed + "</td><td>" +  result.fadedRating
    //           + "</td><td>" + result.solidRating + "</td><td>" 
    //           + result.condition.temperature + "</td><td>"+ result.wind.gusts + " "
    //           + "</td></tr>");
    // });
  }
  


  function search(spot){
    var url = "https://magicseaweed.com/api/4dfeb637ee8710a15153a9d9a188dab1/forecast/";

    // Makes an API request to the itunes server with a request for data using the search term
    // This uses jQuery's .ajax function
    var results = $.ajax({
      url: url,
      type: "GET",
      dataType: 'jsonp',
      crossDomain: true,
      data: {spot_id: spot},
      success: function(data){
        return data;
      }
    });
    results.done(function(results){
      displayResults(results);
    });
     
  }
});