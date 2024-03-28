import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader( {
  apiKey: 'YOUR_API_KEY',
  version: 'weekly',
  libraries: ['maps', 'marker'],
} );

export const Map = await loader.importLibrary( 'maps' );
export const Marker = await loader.importLibrary( 'marker' );

/**
 * This function takes the location_hours object from the location post type
 * and returns a string of the business hours.
 * 
 * @param {object} data 
 * @returns {string}
 */
export function displayBusinessHours ( data ) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let label = `<strong>${data.label}</strong><br />`;
  let hours = '';

  daysOfWeek.forEach( day => {
    const dayData = data.values[`${day.toLowerCase()}_location_hoursValueFields`];
    if ( dayData.value === '' ) return;

    hours += `<span>${day}: ${dayData.value}</span><br />`;
  } );

  if ( hours === '' ) {
    return '';
  }

  return label + hours;
}



/**
 * This function adds intentful interaction event handling to an element.
 * 
 * Intentful interaction is when the user intends to interact with an UI element.
 * Intent here is defined as the user clicking or tapping the element sharply.
 * This naturally filters out accidental interactions, hesitant interactions, and incorrect interactions such as dragging.
 * 
 * @param {HTMLElement} element
 * @param {function} callback
 * 
 * @returns {void}
 */
export function withIntentfulInteraction ( element, callback ) {
  let mouseDownTime;

  function startAction ( event ) {
    // Only proceed if the left button is pressed
    if ( event.button !== 0 ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    // Record the time when the mouse button is pressed down or screen is touched
    mouseDownTime = new Date();
  }

  function endAction ( event ) {
    // Only proceed if the left button is released
    if ( event.button !== 0 ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    let mouseUpTime = new Date();
    let timeDiff = mouseUpTime - mouseDownTime;

    // If the time difference is less than a certain threshold (e.g., 200 milliseconds), trigger the click event
    if ( timeDiff < 333 ) {
      callback();
    }

  }

  function cancelAction () {
    // If the mouse leaves the element before the mouseup event or touch is cancelled, reset the mousedown time
    mouseDownTime = null;
  }

  element.addEventListener( 'mousedown', startAction );
  element.addEventListener( 'mouseup', endAction );
  element.addEventListener( 'mouseleave', cancelAction );
}