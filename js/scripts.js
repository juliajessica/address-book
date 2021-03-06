////////////////////-----------------------------------------//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(street, city, state, type) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.type = type;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}
Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state + ", " + this.type;
}

function resetFields() { // resetting the form fields for the user outside of the 'submit' event listener & call the function in the submit event listener instead
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
    $("input.new-type").val("");

}

//////////////////////////////////-------------------------// user interface logic
$(document).ready(function() { //function for grouping the address
  $("#add-address").click(function() { //calling to the button
    //debugger;

    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street:</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City:</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State:</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                  '<label for "new-type">Type of Address:</label>' +
                                  '<input type="text" class="form-control new-type">' +
                                '</div>');
    });

  $("form#new-contact").submit(function(event) { //original first function
    //debugger;
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val(); //variables created for New Contact to concat the results entered in seperate inputs
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName); //new contact object

    $(".new-address").each(function() { //new function 2nd address (so it's not under the 'submit' from the first function)
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedType = $(this).find("input.new-type").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedType); //new address object
      newContact.addresses.push(newAddress);


    });

    $(".new-address").remove();

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>"); //sending list of contact name to html document


    $(".contact").last().click(function() { //function for contact name and display
      $(this).hide().slideDown('slow');
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
      $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    $("input#new-first-name").val(""); //taking in the input if the name
    $("input#new-last-name").val("");


  });
});
