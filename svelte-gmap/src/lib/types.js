/**
 * @class GPSCoordinates
 * @property {number} latitude
 * @property {number} longitude
 */
class GPSCoordinates {

  /**
   * @param {number} latitude 
   * @param {number} longitude 
   */
  constructor( latitude, longitude ) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}


/**
 * @class LocationMeta
 * @property {string} address
 * @property {string} google_maps_link
 * @property {GPSCoordinates} gps_coordinates
 */
class LocationMeta {

  /**
   * @param {string} address 
   * @param {string} google_maps_link 
   * @param {GPSCoordinates} gps_coordinates 
   */
  constructor( address, google_maps_link, gps_coordinates ) {
    this.address = address;
    this.google_maps_link = google_maps_link;
    this.gps_coordinates = gps_coordinates;
  }
}


/**
 * @class StoreLocation
 * @property {string} title
 * @property {LocationMeta} meta
 */
class StoreLocation {

  /**
   * @param {string} title 
   * @param {string} meta 
   */
  constructor( title, meta ) {
    this.title = title;
    this.meta = meta;
  }
}

export {
  GPSCoordinates,
  LocationMeta,
  StoreLocation
};