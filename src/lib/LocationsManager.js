/// <reference types="@types/googlemaps" />

import { Location } from "./Location";

/**
 * This class manages all the locations on the map.
 * 
 * @class LocationsManager
 * @property {Location[]} locations
 * @property {google.maps.Map} mapInstance
 * 
 * @method {void} addLocations
 * @method {void} closeAllInfoWindows
 * @method {void} updateMapLocations
 */
export class LocationsManager {

  /**
   * 
   * @param {Location[]} locations 
   * @param {google.maps.Map} mapInstance 
   */
  constructor( locations, mapInstance ) {
    this.locations = locations;
    this.mapInstance = mapInstance;
  }

  /**
   * This method adds locations to the locations array.
   * 
   * @param {Location[]} locations
   * 
   * @returns {void}
   */
  addLocations ( locations ) {
    this.locations = this.locations.concat( locations );
  }

  /**
   * This method closes all the info windows on the map.
   * 
   * @returns {void}
   */
  closeAllInfoWindows () {
    this.locations.forEach( location => {
      location.infoWindow.close();
      location.infoWindowState = false;
    } );
  }

}