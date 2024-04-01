<script>
  /**
   * @typedef {import('./lib/types').StoreLocation} StoreLocation
   */

  import { MapLib } from "./lib/Utils";
  import { Location } from "./lib/Location";
  import { LocationsManager } from "./lib/LocationsManager";

  ((g) => {
    var h,
      a,
      k,
      p = "The Google Maps JavaScript API",
      c = "google",
      l = "importLibrary",
      q = "__ib__",
      m = document,
      b = window;
    b = b[c] || (b[c] = {});
    var d = b.maps || (b.maps = {}),
      r = new Set(),
      e = new URLSearchParams(),
      u = () =>
        h ||
        (h = new Promise(async (f, n) => {
          await (a = m.createElement("script"));
          e.set("libraries", [...r] + "");
          for (k in g)
            e.set(
              k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
              g[k]
            );
          e.set("callback", c + ".maps." + q);
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
          d[q] = f;
          a.onerror = () => (h = n(Error(p + " could not load.")));
          a.nonce = m.querySelector("script[nonce]")?.nonce || "";
          m.head.append(a);
        }));
    d[l]
      ? console.warn(p + " only loads once. Ignoring:", g)
      : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
  })({
    key: "",
    v: "weekly",
  });

  (async () => {
    const position_ware = {
      lat: 42.260394990146736,
      lng: -72.23952752826688,
    };
    const position_Worcester = {
      lat: 42.2625, // 42.262546549204835,
      lng: -71.8028, // -71.80178577238325
    };

    async function initMap() {
      const isSmallScreen = window.innerWidth < 960;
      const isPhone = window.innerWidth < 640;

      return new MapLib.Map(document.getElementById("locations_map"), {
        zoom: isPhone ? 9 : 10,
        center: isSmallScreen ? position_Worcester : position_ware,
        mapId: "sungrow_bear_locations",
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
        },
        keyboardShortcuts: false,
      });
    }

    // Initialize and add the map
    let map = await initMap();

    // Add the markers from the locations post types.
    /** @type {Array<StoreLocation>} locations */
    const locations = [
      {
        title: "Walmart Supercenter",
        meta: {
          address: "1105 Boston Rd, Springfield, MA 01119",
          google_maps_link: "https://maps.app.goo.gl/LeErPDihFcrrKMu78",
          gps_coordinates: {
            latitude: 42.1371528367327,
            longitude: -72.50677063943961,
          },
        },
      },
      {
        title: "Costco Wholesale",
        meta: {
          address: "75 Freshwater Blvd, Enfield, CT 06082",
          google_maps_link: "https://maps.app.goo.gl/zsoFCXtLrN5fhyur7",
          gps_coordinates: {
            latitude: 41.99414067145701,
            longitude: -72.57489727608359,
          },
        },
      },
    ];

    const locationsManager = new LocationsManager([], map);

    const location_markers = locations
      .map((location) => {
        const locations = [];

        locations.push(
          new Location(map, location.title, location.meta, locationsManager)
        );

        return locations;
      })
      .flat();
  })();
</script>

<main>
  <div class="map" id="locations_map"></div>
</main>

<style>
</style>
