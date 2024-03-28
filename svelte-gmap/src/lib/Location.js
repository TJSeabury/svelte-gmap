/**
 * This class represents a location on the map,
 * and contains other useful information and utility
 * methods.
 * 
 * @class Location
 * @property {google.maps.Map} map
 * @property {string} title
 * @property {LocationMeta} meta
 * @property {LocationsManager} locationsManager
 * @property {google.maps.LatLng} position
 * @property {google.maps.Marker} marker
 * @property {google.maps.InfoWindow} infoWindow
 * @property {boolean} infoWindowState
 * 
 * @method {void} openInfoWindow
 * @method {void} closeInfoWindow
 * @method {void} toggleInfoWindow
 * @method {void} setInfoWindowContent
 * @method {void} setInfoWindowPosition
 * @method {void} setInfoWindowMap
 * @method {void} setInfoWindowTitle
 * 
 * @method {void} setMarkerMap
 * @method {void} setMarkerPosition
 * @method {void} setMarkerTitle
 * 
 * @method {void} render
 */
export class Location {
  /**
   * @param {google.maps.Map} map
   * @param {string} title
   * @param {LocationMeta} meta
   * @param {LocationsManager} locationsManager
   * 
   * @throws {Error} Location must have gps coordinates.
   * 
   */
  constructor( map, title, meta, locationsManager ) {
    this.map = map;
    this.title = title;
    this.meta = meta;
    this.locationsManager = locationsManager;
    this.locationListElement = null;
    this.marker = null;

    if ( !meta.gps_coordinates
      || !meta.gps_coordinates.latitude
      || !meta.gps_coordinates.longitude
    ) {
      throw new Error( 'Location must have gps coordinates.' );
    }

    this.position = new google.maps.LatLng(
      meta.gps_coordinates.latitude,
      meta.gps_coordinates.longitude
    );

    this.infoWindow = new InfoWindow( {
      content: `
              <div class="info-window">
                <h3>${this.title}</h3>
                <p>${this.meta.address.value}</p>
                <p><a href="${this.meta.google_maps_link.value}" target="_blank">Directions</a></p>
              </div>
            `,
    } );

    google.maps.event.addListener(
      this.infoWindow,
      'closeclick',
      () => {
        this.closeAdditionalMetaDrawer();
      }
    );

    this.infoWindowState = false;


    const markerImageContainer = document.createElement( 'div' );
    markerImageContainer.setAttribute(
      'style',
      `
              position: relative;
              display: block;
              width: 32px;
              height: 32px;
              --bottom-step: 4px;
              --left-step: 8px;
              `
    );

    const marker = new AdvancedMarkerElement( {
      map: map,
      position: this.position,
      title: title,
    } );

    marker.addListener( 'click', this.clickHandler.bind( this ) );

    this.marker = marker;

    this.locationsManager.addLocations( [this] );

    this.openInfoWindow.bind( this );
    this.closeInfoWindow.bind( this );
    this.toggleInfoWindow.bind( this );
    this.setInfoWindowContent.bind( this );
    this.setInfoWindowPosition.bind( this );
    this.setInfoWindowMap.bind( this );
    this.setInfoWindowTitle.bind( this );

  }

  /**
   * Handles the click event on the marker.
   * 
   * @returns {void}
   */
  clickHandler () {
    if ( this.infoWindowState ) {
      this.infoWindow.close();
      this.closeAdditionalMetaDrawer();
      this.infoWindowState = false;
    } else {
      this.locationsManager.closeAllInfoWindows();
      this.infoWindowState = true;
      this.infoWindow.open(
        this.map,
        this.marker
      );
      this.openAdditionalMetaDrawer();
    }
  }

  /**
   * Opens the info window.
   * 
   * @returns {void}
   */
  openInfoWindow () {
    //close all other info windows.
    this.locationsManager.closeAllInfoWindows();
    this.infoWindow.open(
      this.map,
      this.marker
    );
    this.infoWindowState = true;
  }

  closeInfoWindow () {
    this.infoWindow.close();
    this.infoWindowState = false;
  }

  /**
   * Toggles the info window.
   * 
   * @returns {void}
   */
  toggleInfoWindow () {
    if ( this.infoWindowState ) {
      this.closeInfoWindow();
    } else {
      this.openInfoWindow();
    }
  }

  /**
   * Sets the content of the info window.
   * 
   * @param {string} content
   * 
   * @returns {void}
   */
  setInfoWindowContent ( content ) {
    this.infoWindow.setContent( content );
  }

  /**
   * Sets the position of the info window.
   * 
   * @param {object} position
   * 
   * @returns {void}
   */
  setInfoWindowPosition ( position ) {
    this.infoWindow.setPosition( position );
  }

  /**
   * Sets the map of the info window.
   * 
   * @param {google.maps.Map} map
   * 
   * @returns {void}
   */
  setInfoWindowMap ( map ) {
    this.infoWindow.setMap( map );
  }

  /**
   * Sets the title of the info window.
   * 
   * @param {string} title
   * 
   * @returns {void}
   */
  setInfoWindowTitle ( title ) {
    this.infoWindow.setTitle( title );
  }

  /**
   * Sets the map of the marker.
   * 
   * @param {google.maps.Map} map
   * 
   * @returns {void}
   */
  setMarkerMap ( map ) {
    this.marker.setMap( map );
  }

  /**
   * Sets the position of the marker.
   * 
   * @param {object} position
   * 
   * @returns {void}
   */
  setMarkerPosition ( position ) {
    this.marker.setPosition( position );
  }

  /**
   * Sets the title of the marker.
   * 
   * @param {string} title
   * 
   * @returns {void}
   */
  setMarkerTitle ( title ) {
    this.marker.setTitle( title );
  }

  /**
   * Toggles the active state of the location.
   * 
   * @returns {void}
   */
  toggle () {
    this.active = !this.active;
  }

}