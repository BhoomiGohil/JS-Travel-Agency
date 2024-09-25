////////////////////////// Header code ////////////////////////////////

// Retrieve SignIn data from local storage
var grabLocalStorageSignIn = localStorage.getItem("SignIn") || "[]";

// Check SignIn status and update header display
function checkLocalStorageSignin() {
  var login = document.querySelector("#headerLogin");
  var logout = document.querySelector("#headerLogout");
  var profile = document.querySelector("#headerProfile");

  if (grabLocalStorageSignIn === "[]" || grabLocalStorageSignIn === null) {
    login.style.display = "flex"; // Show login
    logout.style.display = "none"; // Hide logout
    profile.style.display = "none"; // Hide profile
  } else {
    login.style.display = "none"; // Hide login
    logout.style.display = "flex"; // Show logout
    profile.style.display = "block"; // Show profile
  }
}

// Execute to set the correct display on page load
checkLocalStorageSignin();

// Load user profile information from local storage
function profileOnLoad() {
  var data = JSON.parse(grabLocalStorageSignIn);
  var user = `${data.title} ${data.firstname} ${data.lastname}`;
  var address = `${data.address} ${data.city} ${data.state} ${data.country}`;

  document.querySelector("#DBuser").innerHTML = user;
  document.querySelector("#DBaddress").innerHTML = address;
  document.querySelector("#DBemail").innerHTML = `${data.email}`;
  document.querySelector("#DBphone").innerHTML = `${data.phone}`;
  document.querySelector("#DBpassword").innerHTML = `${data.password}`;
}

// Handle logout and update header display
function logout() {
  var login = document.querySelector("#headerLogin");
  var logout = document.querySelector("#headerLogout");
  var profile = document.querySelector("#headerProfile");

  localStorage.setItem("SignIn", "[]"); // Clear SignIn data
  login.style.display = "flex"; // Show login
  logout.style.display = "none"; // Hide logout
  profile.style.display = "none"; // Hide profile
}

////////////////////////// Login Grab Registration LocalStorage Code ////////////////////////////////

// Retrieve registration data from local storage
function grabLocalStorageRegistration() {
  var getRegistrations = localStorage.getItem("Registration") || "[]";
  return JSON.parse(getRegistrations); // Return parsed registration data
}

//////////////////////////// Form validation code ////////////////////////////////

var submit = false; // Tracks form submission status
var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Regex for email validation
var phoneFormat = /^\d{10}$/; // Regex for phone validation
var alphabetFormat = /^[A-Za-z]+$/; // Regex for alphabet validation

// Clear error message on input focus
function inputFocus(input) {
  input.previousElementSibling.innerHTML = "";
}

// Display error message
function errorMessage(input, message) {
  input.previousElementSibling.innerHTML = message;
}

// Validate title input
function inputValidationTitle(input) {
  if (input.value === "PLEASE SELECT") {
    errorMessage(input, "Please select title");
    submit = false;
  } else {
    submit = true;
  }
  return submit;
}

// Validate alphabet input
function inputValidationAlphabet(input) {
  if (!input.value.match(alphabetFormat)) {
    errorMessage(input, "Enter alphabet only");
    submit = false;
  } else {
    submit = true;
  }
  return submit;
}

// Validate email input
function inputValidationEmail(input) {
  if (!input.value.match(emailFormat)) {
    errorMessage(input, "Enter email format");
    submit = false;
  } else {
    var getRegistrations = grabLocalStorageRegistration();
    if (JSON.stringify(getRegistrations) !== "[]") {
      for (var i = 0; i < getRegistrations.length; i++) {
        if (input.value === getRegistrations[i].email) {
          errorMessage(input, "Email is already registered");
          submit = false;
          break;
        } else {
          submit = true;
        }
      }
    } else {
      submit = true;
    }
  }
  return submit;
}

// Validate phone input
function inputValidationPhone(input) {
  if (!input.value.match(phoneFormat)) {
    errorMessage(input, "Enter 10 digit only");
    submit = false;
  } else {
    submit = true;
  }
  return submit;
}

// Validate address input (no specific rules, just returns true)
function inputValidationAddress(input) {
  submit = true;
  return submit;
}

// Validate username input
function inputValidationUsername(input) {
  if (!input.value.match(emailFormat)) {
    errorMessage(input, "Enter email format");
    signIn = "[]";
    submit = false;
  } else {
    var getRegistrations = grabLocalStorageRegistration();
    if (JSON.stringify(getRegistrations) !== "[]") {
      for (var i = 0; i < getRegistrations.length; i++) {
        if (input.value !== getRegistrations[i].email) {
          errorMessage(input, "Email is not registered");
          signIn = "[]";
          submit = false;
        } else {
          signIn = getRegistrations[i];
          submit = true;
        }
      }
    } else {
      errorMessage(input, "Email is not registered");
      signIn = "[]";
      submit = false;
    }
  }
  return [submit, signIn];
}

// Validate password input
function inputValidationPassword(input) {
  var getRegistrations = grabLocalStorageRegistration();
  if (JSON.stringify(getRegistrations) !== "[]") {
    for (var i = 0; i < getRegistrations.length; i++) {
      if (input.value !== getRegistrations[i].password) {
        errorMessage(input, "Password does not match");
        submit = false;
      } else {
        submit = true;
      }
    }
  } else {
    errorMessage(input, "Password does not match");
    submit = false;
  }
  return submit;
}

// Validate "from" destination input
function inputValidationFrom(input) {
  var to = document.form.to;
  if (input.value === to.value) {
    errorMessage(input, "Please select different destinations.");
    errorMessage(to, "Please select different destinations.");
    submit = false;
  } else {
    if (to.value !== "Please Select" && to.value !== "PLEASE SELECT") {
      inputFocus(to);
    }
    submit = true;
  }
  return submit;
}

// Validate "to" destination input
function inputValidationTo(input) {
  var from = document.form.from;
  if (input.value === from.value) {
    errorMessage(input, "Please select different destinations.");
    errorMessage(from, "Please select different destinations.");
    submit = false;
  } else {
    if (from.value !== "Please Select" && from.value !== "PLEASE SELECT") {
      inputFocus(from);
    }
    submit = true;
  }
  return submit;
}

// Main input validation function
function inputValidation(input) {
  if (
    input.value === "" ||
    input.value === "PLEASE SELECT" ||
    input.value === "Please Select"
  ) {
    errorMessage(
      input,
      `Enter ${input.name.charAt(0).toUpperCase() + input.name.substring(1)}`
    );
    submit = false;
  } else if (input.value) {
    // Call specific validation functions based on input name
    switch (input.name) {
      case "title":
        submit = inputValidationTitle(input);
        break;
      case "email":
        submit = inputValidationEmail(input);
        break;
      case "phone":
        submit = inputValidationPhone(input);
        break;
      case "address":
        submit = inputValidationAddress(input);
        break;
      case "username":
        submit = inputValidationUsername(input);
        break;
      case "password":
        submit = inputValidationPassword(input);
        break;
      case "from":
        submit = inputValidationFrom(input);
        break;
      case "to":
        submit = inputValidationTo(input);
        break;
      default:
        submit = inputValidationAlphabet(input);
        break;
    }
  }
  return submit;
}

////////////////////////// Load Images's object for Home and Login page code ////////////////////////////////

var imageArray, sliderImageLength, randomIndex; // Declare variables for image data and indices

// Function to create an array of image objects
function grabArrayObjectData() {
  imageArray = [
    { image: "../Images/Place1.gif", title: "London" },
    { image: "../Images/Place2.gif", title: "Venice" },
    { image: "../Images/Place3.gif", title: "New Zealand" },
    { image: "../Images/Place4.gif", title: "Goa" },
    { image: "../Images/Place5.gif", title: "Jammu and Kashmir" },
    { image: "../Images/Place6.gif", title: "Australia" },
  ];

  sliderImageLength = imageArray.length - 1; // Get the last index of the image array
  randomIndex = Math.floor(Math.random() * sliderImageLength); // Generate a random index number
}

// Home page

////////////////////////// Home Slider Code ////////////////////////////////

// Change the displayed image and title in the slider
function homeImageChange(randomIndex) {
  var imageEl = document.querySelector(".slider-image");
  var imageTitleEl = document.querySelector(".slider-title");

  imageEl.src = imageArray[randomIndex].image; // Update image source
  imageTitleEl.innerHTML = imageArray[randomIndex].title; // Update image title
}

// Handle slider button clicks for navigation
function homeSliderButton(text) {
  if (text === "left") {
    randomIndex = randomIndex - 1;
    if (randomIndex < 0) {
      randomIndex = sliderImageLength; // Wrap around to the last image
    }
    homeImageChange(randomIndex);
  } else if (text === "right") {
    randomIndex = randomIndex + 1;
    if (randomIndex > sliderImageLength) {
      randomIndex = 0; // Wrap around to the first image
    }
    homeImageChange(randomIndex);
  }
}

// Initialize the home slider on page load
function homeOnload() {
  grabArrayObjectData(); // Load image data
  homeImageChange(randomIndex); // Display the initial image
}

// Reservation page

////////////////////////// Flight Dummy Data ////////////////////////////////

// Base price multipliers for different flight classes
var economicPrice = 1; // Economy class price multiplier
var premiumPrice = 1.2; // Premium class price multiplier
var businessPrice = 1.5; // Business class price multiplier

/**
 * Function to calculate the distance between two geographical points
 * using the Haversine formula.
 *
 * @param {number} originLaltitude - Latitude of the origin location
 * @param {number} originLongitude - Longitude of the origin location
 * @param {number} destinationLaltitude - Latitude of the destination location
 * @param {number} destinationLongitude - Longitude of the destination location
 * @returns {number} - The distance in kilometers between the origin and destination
 */
function measureKm(
  originLaltitude,
  originLongitude,
  destinationLaltitude,
  destinationLongitude
) {
  var radius = 6378.137; // Radius of the Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  var Laltitude =
    (destinationLaltitude * Math.PI) / 180 - (originLaltitude * Math.PI) / 180;
  var Longitude =
    (destinationLongitude * Math.PI) / 180 - (originLongitude * Math.PI) / 180;

  // Haversine formula to calculate the great-circle distance
  var a =
    Math.sin(Laltitude / 2) * Math.sin(Laltitude / 2) +
    Math.cos((originLaltitude * Math.PI) / 180) *
      Math.cos((destinationLaltitude * Math.PI) / 180) *
      Math.sin(Longitude / 2) *
      Math.sin(Longitude / 2);

  var center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Calculate the angular distance
  var distance = radius * center; // Calculate the distance in kilometers

  return distance; // Return the calculated distance
}

// Array of airline objects representing different flights
var airlineObjects = [
  {
    number: "AC 056", // Flight number
    name: "Air Mumbai", // Name of the airline
    operate: "Mumbai", // Operating city
    wifi: true, // WiFi availability
  },
  {
    number: "AC 436",
    name: "Air Delhi",
    operate: "Delhi",
    wifi: true,
  },
  {
    number: "AC 393",
    name: "Air Banglore",
    operate: "Banglore",
    wifi: false,
  },
  {
    number: "AC 522",
    name: "Air Mumbai",
    operate: "Mumbai",
    wifi: true,
  },
  {
    number: "AC 346",
    name: "Air Delhi",
    operate: "Delhi",
    wifi: false,
  },
  {
    number: "AC 098",
    name: "Air Banglore",
    operate: "Banglore",
    wifi: false,
  },
];

// Array of airport objects representing different airports
var airportObjects = [
  {
    airportCode: 584, // Unique code for the airport
    airportName: "Delhi Airport", // Full name of the airport
    airportShortName: "Del", // Short name or abbreviation of the airport
    location: "Delhi", // City where the airport is located
    facilities: "Flights", // Facilities available at the airport
    coordinates: {
      // Coordinates of the airport
      latitude: 28.7041, // Latitude of the airport
      longitude: 77.1025, // Longitude of the airport
    },
  },
  {
    airportCode: 214,
    airportName: "Mumbai Airport",
    airportShortName: "Mum",
    location: "Mumbai",
    facilities: "Flights",
    coordinates: {
      latitude: 19.076,
      longitude: 72.8777,
    },
  },
  {
    airportCode: 762,
    airportName: "Banglore Airport",
    airportShortName: "Ban",
    location: "Banglore",
    facilities: "Flights",
    coordinates: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
  },
];

// Array of flight objects representing different flights
var flightObjects = [
  {
    flightId: 35536, // Unique identifier for the flight
    flightNumber: 236, // Flight number
    departureDateTime: "11:00 AM", // Scheduled departure time
    arrivalDateTime: "1:00 PM", // Scheduled arrival time
    originAirportCode: airportObjects[0].airportCode, // Code of the origin airport
    destinationAirportCode: airportObjects[1].airportCode, // Code of the destination airport
    availableSeats: Math.floor(Math.random() * 200), // Random number of available seats (0-199)
    intialPlaneAssign: airlineObjects[1], // Initial airline assigned to the flight
    stopAirportCode: [], // Array to hold any stopover airports (empty if none)

    // Cost calculations based on the distance and price multipliers for different classes
    economy: Math.floor(
      measureKm(
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude,
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude
      ) * economicPrice // Economy class price
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude,
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude
      ) * premiumPrice // Premium class price
    ),
    business: Math.floor(
      measureKm(
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude,
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude
      ) * businessPrice // Business class price
    ),
  },
  {
    flightId: 65476,
    flightNumber: 362,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[0].airportCode,
    destinationAirportCode: airportObjects[2].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[0],
    stopAirportCode: [
      // Array to hold stopover airports
      {
        code: airportObjects[1].airportCode, // Code of the stopover airport
        waitingTime: "2hr 35min", // Waiting time at the stopover airport
        planeAssign: airlineObjects[2], // Airline assigned for the stopover
      },
    ],
    economy: Math.floor(
      measureKm(
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude,
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude
      ) * economicPrice // Economy class price
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude,
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude
      ) * premiumPrice // Premium class price
    ),
    business: Math.floor(
      measureKm(
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude,
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude
      ) * businessPrice // Business class price
    ),
  },
  {
    flightId: 65476,
    flightNumber: 362,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[0].airportCode,
    destinationAirportCode: airportObjects[2].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[0],
    stopAirportCode: [
      {
        code: airportObjects[1].airportCode,
        waitingTime: "2hr 35min",
        planeAssign: airlineObjects[2],
      },
    ],
    economy: Math.floor(
      measureKm(
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude,
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude
      ) * economicPrice // Economy class price
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude,
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude
      ) * premiumPrice // Premium class price
    ),
    business: Math.floor(
      measureKm(
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude,
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude
      ) * businessPrice // Business class price
    ),
  },
  // Additional flight objects follow the same structure...
  {
    flightId: 73561,
    flightNumber: 273,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[1].airportCode,
    destinationAirportCode: airportObjects[0].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[2],
    stopAirportCode: [], // No stopover airports
    economy: Math.floor(
      measureKm(
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude,
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude
      ) * economicPrice // Economy class price
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude,
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude
      ) * premiumPrice // Premium class price
    ),
    business: Math.floor(
      measureKm(
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude,
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude
      ) * businessPrice // Business class price
    ),
  },
  // Further flight objects with similar properties
  {
    flightId: 45235,
    flightNumber: 232,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[1].airportCode,
    destinationAirportCode: airportObjects[2].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[4],
    stopAirportCode: [], // No stopover airports
    economy: Math.floor(
      measureKm(
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude,
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude
      ) * economicPrice // Economy class price
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude,
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude
      ) * premiumPrice // Premium class price
    ),
    business: Math.floor(
      measureKm(
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude,
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude
      ) * businessPrice // Business class price
    ),
  },
  {
    flightId: 63718,
    flightNumber: 452,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[2].airportCode,
    destinationAirportCode: airportObjects[0].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[2],
    stopAirportCode: [
      // Array to hold stopover airports
      {
        code: airportObjects[1].airportCode, // Code of the stopover airport
        waitingTime: "2hr 35min", // Waiting time at the stopover airport
        planeAssign: null, // No airline assigned for the stopover
      },
    ],
    economy: Math.floor(
      measureKm(
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude,
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude
      ) * economicPrice // Economy class price
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude,
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude
      ) * premiumPrice // Premium class price
    ),
    business: Math.floor(
      measureKm(
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude,
        airportObjects[0].coordinates.latitude,
        airportObjects[0].coordinates.longitude
      ) * businessPrice // Business class price
    ),
  },
  {
    flightId: 25143,
    flightNumber: 634,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[2].airportCode,
    destinationAirportCode: airportObjects[1].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[5],
    stopAirportCode: [], // No stopover airports
    economy: Math.floor(
      measureKm(
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude,
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude
      ) * economicPrice // Economy class price
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude,
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude
      ) * premiumPrice // Premium class price
    ),
    business: Math.floor(
      measureKm(
        airportObjects[2].coordinates.latitude,
        airportObjects[2].coordinates.longitude,
        airportObjects[1].coordinates.latitude,
        airportObjects[1].coordinates.longitude
      ) * businessPrice // Business class price
    ),
  },
];

////////////////////////// Reservation Title Change Code ////////////////////////////////

function reservationTitle(text) {
  // Update the reservation heading with the provided text
  document.querySelector("#reservation-heading").innerHTML =
    text + " RESERVATION";
}

////////////////////////// Reservation Calculation Code ////////////////////////////////

// Function to change the minimum end date based on the selected start date
function ChangeStartDate() {
  var startDate = document.querySelector(".start-date").value; // Get start date value
  document.querySelector(".end-date").min = startDate; // Set minimum end date to start date
}

// Function to find and display flight options based on departure and destination airports
function flights(from, to) {
  var flightFound = document.querySelector(".reservation-detail"); // Element to display flight results
  var lists = document.querySelector(".reservation-lists"); // Element to hold the list of flights
  var list = document.querySelectorAll(".reservation-list"); // All existing reservation lists
  var count = 0; // Counter for available flights

  flightFound.innerHTML = `Flight results: ${count} flights found`; // Display initial count of flights

  // Remove existing flight lists
  for (var i = 1; i < list.length; i++) {
    lists.removeChild(list[i]);
  }

  // Find airport codes based on provided locations
  for (var i = 0; i < airportObjects.length; i++) {
    var airportObject = airportObjects[i]; // Current airport object

    if (airportObject.location === from) {
      var fromCode = airportObject.airportCode; // Get code for departure airport
    }
    if (airportObject.location === to) {
      var toCode = airportObject.airportCode; // Get code for destination airport
    }
  }

  // Show loading indicator while fetching flights
  var loading = document.createElement("img");
  loading.classList.add("reservation-loading");
  loading.src = "../Images/loading.jpeg";
  lists.appendChild(loading);

  // Simulate flight search delay
  setTimeout(() => {
    lists.removeChild(loading); // Remove loading indicator

    // Loop through available flights to find matching routes
    for (var i = 0; i < flightObjects.length; i++) {
      var flightObject = flightObjects[i]; // Current flight object
      var flightOrigin = flightObject.originAirportCode; // Flight's origin airport code
      var flightDestination = flightObject.destinationAirportCode; // Flight's destination airport code
      var flightDepartureTime = flightObject.departureDateTime; // Flight departure time
      var flightArrivalTime = flightObject.arrivalDateTime; // Flight arrival time
      var flightStopCode = flightObject.stopAirportCode; // Flight stop information
      var flightPlaneAssign = flightObject.intialPlaneAssign; // Assigned plane for the flight

      // Check if flight matches the selected route
      if (flightOrigin === fromCode && flightDestination === toCode) {
        // Create a new flight list element
        var list = document.createElement("div");
        list.classList.add("reservation-list");

        // Create and append flight timing details
        var listDetail = document.createElement("div");
        listDetail.classList.add("reservation-route-detail");
        list.appendChild(listDetail);

        var timing = document.createElement("div");
        timing.classList.add("reservation-route-timing");
        listDetail.appendChild(timing);

        var startingTime = document.createElement("div");
        startingTime.classList.add("reservation-route-start-time");
        startingTime.innerHTML = flightDepartureTime;

        var routeHours = document.createElement("div");
        routeHours.classList.add("reservation-route-hours");
        routeHours.innerHTML = flightStopCode.length + " Stop"; // Display number of stops

        var endingTime = document.createElement("div");
        endingTime.classList.add("reservation-route-end-time");
        endingTime.innerHTML = flightArrivalTime;

        timing.appendChild(startingTime);
        timing.appendChild(routeHours);
        timing.appendChild(endingTime);

        // Create and append route location details
        var locations = document.createElement("div");
        locations.classList.add("reservation-route-locations");
        listDetail.appendChild(locations);

        var location = document.createElement("div");
        location.classList.add("reservation-route-location");
        locations.appendChild(location);

        var locationFromP = document.createElement("p");
        locationFromP.innerHTML = from; // Departure location
        var locationToP = document.createElement("p");
        locationToP.innerHTML = to; // Destination location

        location.appendChild(locationFromP);
        location.appendChild(locationToP);

        // Create and append route stops details
        var stops = document.createElement("div");
        stops.classList.add("reservation-route-stops");
        locations.appendChild(stops);

        if (flightOrigin !== null && flightOrigin) {
          var dotLeft = document.createElement("div");
          dotLeft.classList.add("reservation-route-dots");
          stops.appendChild(dotLeft);

          // Check for available airline services (e.g., Wi-Fi)
          for (var j = 0; j < airlineObjects.length; j++) {
            var airlineObject = airlineObjects[j]; // Current airline object

            var wifi = document.createElement("img");
            wifi.classList.add("reservation-route-wifi");

            if (airlineObject.number === flightPlaneAssign.number) {
              // Determine Wi-Fi availability for the flight
              wifi.src = airlineObject.wifi
                ? "../Images/wifi.png"
                : "../Images/no-signal.png";
              stops.appendChild(wifi);
            }
          }
        }

        // Create and append stop locations
        var routes = document.createElement("div");
        routes.classList.add("reservation-route-text");

        for (var l = 0; l < flightStopCode.length; l++) {
          var code = flightStopCode[l].code; // Stop airport code
          var plane = flightStopCode[l].planeAssign; // Plane assigned for the stop

          // Find the airport object corresponding to the stop code
          for (var m = 0; m < airportObjects.length; m++) {
            var airportObject = airportObjects[m];

            if (airportObject.airportCode === code) {
              var routeText = document.createElement("p");
              routeText.classList.add("reservation-route-text");
              routeText.innerHTML = airportObject.airportShortName; // Display airport short name
              stops.appendChild(routeText);

              // Check if there is a plane assigned for this stop
              if (plane !== null) {
                for (var n = 0; n < airlineObjects.length; n++) {
                  var airlineObject = airlineObjects[n];

                  var wifi = document.createElement("img");
                  wifi.classList.add("reservation-route-wifi");

                  // Determine Wi-Fi availability for the plane
                  if (airlineObject.number === plane.number) {
                    wifi.src = airlineObject.wifi
                      ? "../Images/wifi.png"
                      : "../Images/no-signal.png";
                    stops.appendChild(wifi);
                  }
                }
              }
            }
          }
        }

        if (flightDestination !== null && flightDestination) {
          var dotRight = document.createElement("div");
          dotRight.classList.add("reservation-route-dots");
          stops.appendChild(dotRight);
        }

        var stopsLine = document.createElement("div");
        stopsLine.classList.add("reservation-route-line");
        stops.appendChild(stopsLine);

        // Create and append waiting time details
        var waitingTime = document.createElement("div");
        waitingTime.classList.add("reservation-route-waiting-time");
        locations.appendChild(waitingTime);

        for (var o = 0; o < flightStopCode.length; o++) {
          var code = flightStopCode[o].code; // Stop airport code
          var time = flightStopCode[o].waitingTime; // Waiting time at the stop

          // Find the airport object for the waiting time display
          for (var p = 0; p < airportObjects.length; p++) {
            var airportObject = airportObjects[p];
            if (airportObject.airportCode === code) {
              var waitingTimeText = document.createElement("p");
              waitingTimeText.innerHTML = "+ " + time; // Display waiting time
              waitingTime.appendChild(waitingTimeText);
            }
          }
        }

        // Create and append price details for different classes
        var priceDetailEconomy = document.createElement("div");
        priceDetailEconomy.classList.add("reservation-price-detail");
        list.appendChild(priceDetailEconomy);

        var priceEconomyPrice = document.createElement("p");
        priceEconomyPrice.innerHTML = "$" + flightObject.economy; // Economy price
        var priceEconomyText = document.createElement("p");
        priceEconomyText.innerHTML = ""; // Additional economy information
        priceDetailEconomy.appendChild(priceEconomyPrice);
        priceDetailEconomy.appendChild(priceEconomyText);

        var priceDetailPremium = document.createElement("div");
        priceDetailPremium.classList.add("reservation-price-detail");
        list.appendChild(priceDetailPremium);

        var pricePremiumPrice = document.createElement("p");
        pricePremiumPrice.innerHTML = "$" + flightObject.premium; // Premium price
        var pricePremiumText = document.createElement("p");
        pricePremiumText.innerHTML = "Mixed cabin"; // Premium class information
        priceDetailPremium.appendChild(pricePremiumPrice);
        priceDetailPremium.appendChild(pricePremiumText);

        var priceDetailBusiness = document.createElement("div");
        priceDetailBusiness.classList.add("reservation-price-detail");
        list.appendChild(priceDetailBusiness);

        var priceBusinessPrice = document.createElement("p");
        priceBusinessPrice.innerHTML = "$" + flightObject.business; // Business price
        var priceBusinessText = document.createElement("p");
        priceBusinessText.innerHTML = "Includes lie-flat seats"; // Business class information
        priceDetailBusiness.appendChild(priceBusinessPrice);
        priceDetailBusiness.appendChild(priceBusinessText);

        count++; // Increment flight count
        lists.appendChild(list); // Append the flight list to the reservation lists
      }
      flightFound.innerHTML = `Flight results: ${count} flights found`; // Update flight count
    }
  }, Math.floor(Math.random() * 5000) + 1000); // Simulated loading time
}

// Function to validate and process flight reservation inputs
function reservationFlights() {
  var from = document.form.from; // Departure airport input
  var to = document.form.to; // Destination airport input
  // Validate input selections
  if (
    (from.value === "Please Select" || from.value === "PLEASE SELECT") &&
    (to.value === "Please Select" || to.value === "PLEASE SELECT")
  ) {
    inputValidation(from); // Validate departure input
    inputValidation(to); // Validate destination input
  } else if (
    (from.value !== "Please Select" || from.value !== "PLEASE SELECT") &&
    (to.value !== "Please Select" || to.value !== "PLEASE SELECT")
  ) {
    var submitFrom = inputValidation(from); // Validate departure input
    var submitTo = inputValidation(to); // Validate destination input

    // Proceed to find flights if both inputs are valid
    if (submitFrom && submitTo) {
      flights(from.value, to.value); // Call flights function with valid inputs
    }
  } else if (
    (from.value === "Please Select" || from.value === "PLEASE SELECT") &&
    (to.value !== "" || to.value !== "")
  ) {
    inputValidation(from); // Validate departure input
    inputValidation(to); // Validate destination input
  } else if (
    (from.value !== "" || from.value !== "") &&
    (to.value === "Please Select" || to.value === "PLEASE SELECT")
  ) {
    inputValidation(from); // Validate departure input
    inputValidation(to); // Validate destination input
  }
}

// Function to initialize the reservation form on page load
function reservationOnLoad() {
  // References to the form elements for departure and destination airports
  var from = document.form.from; // Departure airport dropdown
  var to = document.form.to; // Destination airport dropdown
  var formOption; // Variable to hold the option elements

  // References to the form elements for adult and child passenger counts
  var adult = document.form.adult; // Adult passenger dropdown
  var child = document.form.child; // Child passenger dropdown

  // Populate the departure airport dropdown with options
  for (i = 0; i < airportObjects.length; i++) {
    var airportObject = airportObjects[i]; // Get the current airport object

    formOption = document.createElement("option"); // Create a new option element
    formOption.value = airportObject.location; // Set the value to the airport location
    formOption.innerHTML = airportObject.location; // Set the displayed text to the airport location
    from.appendChild(formOption); // Append the option to the departure dropdown
  }

  // Populate the destination airport dropdown with options
  for (i = 0; i < airportObjects.length; i++) {
    var airportObject = airportObjects[i]; // Get the current airport object

    formOption = document.createElement("option"); // Create a new option element
    formOption.value = airportObject.location; // Set the value to the airport location
    formOption.innerHTML = airportObject.location; // Set the displayed text to the airport location
    to.appendChild(formOption); // Append the option to the destination dropdown
  }

  // Populate the adult passengers dropdown with numbers 1 to 100
  for (i = 1; i <= 100; i++) {
    formOption = document.createElement("option"); // Create a new option element
    formOption.value = i; // Set the value to the current number
    formOption.innerHTML = i; // Set the displayed text to the current number
    adult.appendChild(formOption); // Append the option to the adult dropdown
  }

  // Populate the child passengers dropdown with numbers 0 to 100
  for (i = 0; i <= 100; i++) {
    formOption = document.createElement("option"); // Create a new option element
    formOption.value = i; // Set the value to the current number
    formOption.innerHTML = i; // Set the displayed text to the current number
    child.appendChild(formOption); // Append the option to the child dropdown
  }

  // Extend the Date prototype to add a method for adding a specified number of days
  Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days); // Update the date by adding the specified number of days
    return this; // Return the updated date
  };

  // Create date variables for 7 days, 14 days, and 1 year from now
  var sevenDays = new Date().addDays(7); // Date 7 days from now
  var fourteenDays = new Date().addDays(14); // Date 14 days from now
  var yearDays = new Date().addDays(365); // Date 1 year from now

  // Function to convert a date object to a string in the format YYYY-MM-DD
  function dateConvert(date) {
    return date.toISOString().split("T")[0]; // Convert to ISO string and split to get the date part
  }

  // Initialize the start date input field
  var startDate = document.querySelector(".start-date"); // Reference to the start date input field
  startDate.value = dateConvert(sevenDays); // Set the value to 7 days from now
  startDate.min = dateConvert(sevenDays); // Set the minimum date to 7 days from now
  startDate.max = dateConvert(yearDays); // Set the maximum date to 1 year from now

  // Initialize the return date input field
  var returnDate = document.querySelector(".end-date"); // Reference to the return date input field
  returnDate.value = dateConvert(fourteenDays); // Set the value to 14 days from now
  returnDate.min = dateConvert(sevenDays); // Set the minimum date to 7 days from now
  returnDate.max = dateConvert(yearDays); // Set the maximum date to 1 year from now
}

// Login page

////////////////////////// Login Signup and Signin Code ////////////////////////////////

// Function to display the registration form and hide the login form
function signUpButton() {
  document.querySelector(".login").style.display = "none"; // Hide the login form
  document.querySelector(".registration").style.display = "flex"; // Show the registration form
}

// Function to display the login form and hide the registration form
function signInButton() {
  document.querySelector(".login").style.display = "grid"; // Show the login form
  document.querySelector(".registration").style.display = "none"; // Hide the registration form
}

////////////////////////// Login Slider Code ////////////////////////////////

// Function to load images for the login slider
function loginLoadImage() {
  // Reset randomIndex if it exceeds the length of the image array
  if (randomIndex === sliderImageLength) {
    randomIndex = 0; // Reset to the first image
  }

  // Set the source of the slider image to the current image
  document.querySelector(".login-img-slider").src =
    imageArray[randomIndex].image; // Update the slider image source
  document.querySelector(".login-img-slider-name").innerHTML =
    imageArray[randomIndex].title; // Update the slider image title

  randomIndex++; // Increment the randomIndex for the next image
}

////////////////////////// Login SignIn Code ////////////////////////////////

// Variables to hold validation state, registration list, and registration object
var validation = false,
  registration = [],
  registerObject = {};

// Function to handle the sign-in form submission
function SignInSubmission() {
  var signInFormSubmission = document.getElementById("login"); // Get the sign-in form element

  // Add event listener for form submission
  signInFormSubmission.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    var username = e.target.querySelector(".username"); // Get the username input
    var password = e.target.querySelector(".password"); // Get the password input

    // Check if both username and password fields are filled
    if (username.value !== "" && password.value !== "") {
      var submitUsername = inputValidation(username); // Validate username input
      var submitPassword = inputValidation(password); // Validate password input

      // If both inputs are valid, save username to localStorage and redirect
      if (submitUsername[0] === submitPassword) {
        localStorage.setItem("SignIn", JSON.stringify(submitUsername[1])); // Store the username in localStorage
        document.location.href =
          "/S%20%26%20S%20Tour%20Travels/html/Profile.html"; // Redirect to the profile page
        checkLocalStorageSignin(); // Check if user is signed in
      }
    }
    // Handle validation for empty fields
    else if (username.value === "" && password.value === "") {
      inputValidation(username); // Validate username input
      inputValidation(password); // Validate password input
    } else if (username.value === "" && password.value !== "") {
      inputValidation(username); // Validate username input
    } else if (username.value !== "" && password.value === "") {
      inputValidation(password); // Validate password input
    }
  });
}

////////////////////////// Login SignUp Code ////////////////////////////////

// Function to generate a random password of specified length
function generatePassword() {
  var length = 8, // Length of the generated password
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", // Characters allowed in the password
    retVal = ""; // Variable to hold the generated password
  // Loop to generate a password character by character
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n)); // Randomly select a character from charset
  }
  return retVal; // Return the generated password
}

// Function to generate a random ID of specified length
function generateId() {
  var length = 8, // Length of the generated ID
    charset = "0123456789", // Characters allowed in the ID (numbers only)
    retVal = ""; // Variable to hold the generated ID
  // Loop to generate an ID character by character
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n)); // Randomly select a digit from charset
  }
  return retVal; // Return the generated ID
}

// Function to handle sign-up form submission
function SignUpSubmission() {
  var validation = false; // Variable to track validation state
  var signUpFormSubmission = document.getElementById("signup"); // Get the sign-up form element

  // Add event listener for form submission
  signUpFormSubmission.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    var getRegistrations = grabLocalStorageRegistration(); // Get existing registrations from localStorage
    var inputs = e.target.querySelectorAll("select, input ,textarea"); // Get all input fields

    // Loop through each input field for validation
    for (var i = 0; i < inputs.length; i++) {
      var submitForm = inputValidation(inputs[i]); // Validate current input
      if (submitForm) {
        validation = true; // Set validation to true if input is valid
        // Assign input name and value to registerObject
        Object.assign(registerObject, { [inputs[i].name]: inputs[i].value });
      } else {
        validation = false; // Set validation to false if any input is invalid
        break; // Exit the loop if validation fails
      }
    }

    // If all inputs are valid, create registration object and save it
    if (validation) {
      Object.assign(registerObject, {
        id: generateId(), // Generate a random ID
        password: generatePassword(), // Generate a random password
      });
      getRegistrations.push(registerObject); // Add new registration to the list
      localStorage.setItem("Registration", JSON.stringify(getRegistrations)); // Save updated registrations to localStorage
      // Clear input fields after successful submission
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ""; // Reset each input field to empty
      }
    }
  });
}

////////////////////////// Login Onload Function Code ////////////////////////////////

// Function to execute on login page load
function loginOnload() {
  grabArrayObjectData(); // Retrieve data for the login page

  loginLoadImage(); // Load initial image for the login slider
  setInterval(loginLoadImage, 3000); // Change image every 3 seconds

  SignInSubmission(); // Initialize sign-in submission handling
  SignUpSubmission(); // Initialize sign-up submission handling
}
