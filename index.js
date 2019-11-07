'use strict';

function getDogImage(breed) {
  //create a url variable to build our request
  let url ="";
  // get form input. If the input is two words, split into breed and subBreed
  if (breed.includes(" ")) {
    let subBreed = breed.split(" ")[0];
    breed = breed.split(" ")[1];
    url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`;
  } else {
    url = `https://dog.ceo/api/breed/${breed}/images/random`;
  }
  // fetch the images with the request url
  fetch(url)
    .then(response => {
      // if the response comes back without a 200, throw a new error
      if(!response.ok) {
        // throw an error with the status
        console.log(response.status);
        throw new Error(response.status);
      // otherwise, if we get a 200, return the response json
      }
      return response.json();       
    })
    // with a 200 status, display the results
    .then(responseJson => {
      console.log(responseJson);
      displayResults(responseJson, null)
    })
    // if its not a 200 status, display the error     
    .catch(error => {
      displayResults(null, error);
    })  
}

function displayResults(responseJson, error) {
  // cache the jquery selector
  let results = $('.results');
  //clear the previous results
  results.html('');
  // if there is no error, write the images to the DOM
  if (error === null) {
    results.append(`<img src="${responseJson.message}" class="results-img">`)
  }
  //if the error is a 404, tell the user
  else if (error.toString().includes('404')) {
    results.html(`<h2>${error}<br>Can't find that breed. Please try again.</h2>`)
  }
  // if the error is not a 404, tell the user
  else {
    results.html(`<h2>${error}<br>Not a 200 or 404. Is your internet connection okay? The Dog API might be down as well.</h2>`)
  }
  //display the results section
  results.removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let breed = $('form').find('#breed').val();
    getDogImage(breed);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});