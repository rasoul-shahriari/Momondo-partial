function template() {
  this.ticketObjects = [];
}

template.prototype.getTemplate = function(data) {
  return _.template($('#template').html())({ data:this.getSortedTickets(data) });
};

template.prototype.getSortedTickets = function(data) {
  return _.sortBy(this.createTickets(data), 'Price');
};

template.prototype.createTickets = function(data) {
  var self = this;
  _.each(data.Offers, function(tickets) {
    var FlightIndex = tickets.FlightIndex;
    if (FlightIndex < data.Flights.length) {
      var originSegment = self.getFlightSegment(data,FlightIndex, 0);
      var destinationSegment = self.getFlightSegment(data,FlightIndex, 1);
      if((originSegment != null) && (destinationSegment != null)) {
        self.ticketObjects.push({
          origin : data.Legs[originSegment],
          destination: data.Legs[destinationSegment],
          Price: tickets.Price,
          Deeplink: tickets.Deeplink
        });
      }
    }
  });
  return self.ticketObjects;
};

template.prototype.getFlightSegment = function(data,FlightIndex, index) {
   if( data.Flights[FlightIndex].SegmentIndexes[index] < data.Segments.length){
     return  data.Flights[FlightIndex].SegmentIndexes[index];
   }
   console.log ("segment " + data.Flights[FlightIndex].SegmentIndexes[index]  +  " fligtindex " + FlightIndex + " length of segment " + data.Segments.length);
   return  null;
};
