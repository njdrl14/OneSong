

var apiKey = "EFt84FhTSNiLe7ZdDyqQJkbpd3gG3Ham";

$('#myform').on('submit', function(){
	$("#wellsection").empty();

	// Search Term
	var searchTerm = $('#searchterm').val().trim();

	var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apiKey + "&keyword="  + searchTerm + "&size=5&venueID=&city=&locale=en-us";
	// var eventsUrl = "http://www.ticketmaster.com/search?tm_link=tm_header_search&user_input=" + searchTerm + "&q=" + searchTerm;	
	
	$.ajax({
	  url: queryURL,
	  type:"GET",
	  async:true,
	  dataType: "JSON"
	  }).done(function(eventsData) {
	 console.log(eventsData);
	 var results = eventsData;

	 //for loop to populate the search results
		 for (var i = 0; i < 5; i++) {
		
		 	var wellSection = $("<div>");
			wellSection.addClass('well');

			
			//assigning names to variables that are to be returned
			var eventName = JSON.stringify(results._embedded.events[i].name);
			var date = JSON.stringify(results._embedded.events[i].dates.start.localDate);
			var time = JSON.stringify(results._embedded.events[i].dates.start.localTime);
			var venue = JSON.stringify(results._embedded.events[i]._embedded.venues[0].name);
			var city = JSON.stringify(results._embedded.events[i]._embedded.venues[0].city.name);
			var country = JSON.stringify(results._embedded.events[i]._embedded.venues[0].country.countryCode);
			if (country === "US"){
				var state = JSON.stringify(results._embedded.events[i]._embedded.venues[0].state.stateCode);
			}else{
				var state = country;
			}
			var event = JSON.stringify(results._embedded.events[i].url);
	        
	        //dynamically creating tags and appending return results to page    
			var newP = $("<p>");
			newP.append(eventName);
			wellSection.append(newP);

			var dateP = $("<p>");
			dateP.append(date, time);
			wellSection.append(dateP);

			var venueP = $("<p>");
			venueP.append(venue);
			wellSection.append(venueP);

			var cityP = $("<p>");
			
			cityP.append(city,state);
			wellSection.append(cityP);

			var eventsP = $("<a>");
			eventsP.attr("href", event);
			//eventsP.append(event);
			wellSection.append(eventsP);

			//appends results to wellsection
			$('#wellsection').append(wellSection);
			
		}	
	});

	console.log("I worked");

	return false;

});

	//clears results when the page refreshes or when a new search is performed
	
$('#clearAll').on('click', function(){
	articleCounter = 0;
	$("#wellsection").empty();
});
 
// function convertDate(dateString){
//  date = dateString.split("-");
//  console.log(dateArray);
//  var dateJoined = dateArray.join("");
//  console.log(dateJoined);
//  var resultDate=dateJoined+"00";
//  console.log(resultDate);
//  return(resultDate);
// }
// function show_alert2()
// {
//    console.log(dateBegin.value);
//    var begin = dateBegin.value;
//    var initialDate=convertDate(begin);
//    console.log(initialDate);
//    console.log(dateEnd.value);
//    var end = dateEnd.value;
//    var finalDate=convertDate(dateEnd.value);
//    console.log(finalDate);
//    var inputDate=initialDate+"-"+finalDate;
//    console.log(inputDate);
// }