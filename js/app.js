  
  var countyNameGlobal = "";
  var latGlobal = 0.000000000;
  var longGlobal = 0.0;
  var wetsuitGlobal = "";
  var celciusGlobal = 0.00000;
  var fahrenheitGlobal = 0.0000;
  var locationNameGlobal = "";
  var dateGlobal = "";
  var hourGlobal = "";
  var swellGlobal = "";
  var tideGlobal = "";
  var warningGlobal = "";
  var locationNameGlobal = "";

$(function(){


  

  $("#location-search").submit(function(event){
    event.preventDefault();
    // console.log('formsubmit');

    locationNameGlobal = toTitleCase($("#surf-spot").val());

    getSpotId(locationNameGlobal);
    $("#results-table").html("");
    $("#surf-spot").val("");
  });



  function toTitleCase(str)
  {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  function displayResults(data){

    
    
    $("#spotInfo").show();
    $("#results-header").html(locationNameGlobal + "," + countyNameGlobal.replace("-"," ").toUpperCase());
    $("#results-header2").html("Temperature: " + fahrenheitGlobal + " F " + "  /  " + " Equipment: " + wetsuitGlobal);
    for (var i = data.length - 1; i >= 0; i--) {
      

      $("#results-table")
       .append("<tr><td>" + data[i].date
               + " " + "</td><td>" + data[i].hour + "</td><td>" +  parseFloat(data[i].size_ft).toFixed(1)  + " ft  " + data[i].shape_detail.swell
               + "</td><td>" + data[i].shape_detail.wind + "</td><td>" 
              
               + "</td></tr>");

    }
     

  }


  //Display all surf spot within a County 
  //Will work on this part later

  /*function displaySpotInCounty(data) {
    
    $("#spotInfo").hide();
    $("#spotInCounty").show();


    for (var i = data.length - 1; i >= 0; i--) {

      $("#results-table-county").append("<tr><td>" + data[i].spot_name + "</td></tr>");
    }
  }*/

  //////FOR OJECTS//////////////
      /*var celcius = 0
    // use jquery to create a new table row containing data received from the API
    $.each(data, function(key, value){
      if (key === "celcius") {
        celcius = value;
      }

    });
      
      
      $("#results-table").append("<tr><td>" + celcius + "</td><td>");*/
      
      
    // $.each(data, function(){
    //   $("#results-table")
    //   .append("<tr><td>" + result.localTimestamp 
    //           + " " + "</td><td>" + result.wind.speed + "</td><td>" +  result.fadedRating
    //           + "</td><td>" + result.solidRating + "</td><td>" 
    //           + result.condition.temperature + "</td><td>"+ result.wind.gusts + " "
    //           + "</td></tr>");
    // });
  
  



  function searchForecast(spotId){
    
    

    var url = "http://api.spitcast.com/api/spot/forecast/" + spotId + "/";
    
    // Makes an API request to the itunes server with a request for data using the search term
    // This uses jQuery's .ajax function
    var results = $.ajax({
      url: url,
      type: "GET",
      dataType: 'json',
      success: function(data){
        return data;
      }
    });

    results.done(function(data){
     
      displayResults(data);

    });

   
     
  }

  function getWaterTempbyCounty(countyName) {
    var url = "http://api.spitcast.com/api/county/water-temperature/" + countyNameGlobal + "/";
    var results = $.ajax({
      url: url,
      type: "GET",
      dataType: 'json',
      success: function(data){
        return data;
      }

    });

    results.done(function(data){

      $.each(data, function(key,value){
        if (key === "fahrenheit") {
          fahrenheitGlobal = value;
        } else if (key === "wetsuit") {
          wetsuitGlobal = value;
        }

      });

    });

    

  }  
      

  function getSpotId(locationName){
    var url = "http://api.spitcast.com/api/spot/all";
    
    // Makes an API request to the itunes server with a request for data using the search term
    // This uses jQuery's .ajax function
    var results = $.ajax({
      url: url,
      type: "GET",
      dataType: 'json',
      success: function(data){
        return data;
      }
    });

    results.done(function(results){
      
      spotId = 0

     for (var i = results.length - 1; i >= 0; i--) {
      if (locationName === results[i].spot_name) {
        spotId = results[i].spot_id;
        countyNameGlobal = (results[i].county_name).replace(" ","-").toLowerCase();
        latGlobal = results[i].latitude;
        longGlobal = results[i].longitude;
      } else if (locationName === results[i].county_name) {
        getAllSpotInCounty(locationName.replace(" ","-").toLowerCase());
      }
    }
      getWaterTempbyCounty(countyNameGlobal);
      searchForecast(spotId);

    });
     
  }

  //search for all surf spot if user type in County name
  //will work on this part later

  /*function getAllSpotInCounty(countyName) {
    var url = "http://api.spitcast.com/api/county/spots/"+ countyName + "/";
    
    // Makes an API request to the itunes server with a request for data using the search term
    // This uses jQuery's .ajax function
    var results = $.ajax({
      url: url,
      type: "GET",
      dataType: 'json',
      success: function(data){
        return data;
      }
     });
    

    results.done(function(results){
      displaySpotInCounty(results);
    });
  }*/

  

});