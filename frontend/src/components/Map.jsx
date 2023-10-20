import { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MdLocationPin } from "react-icons/md";
import { Drawer } from "vaul";
import addNotification from "react-push-notification";
import toast from "react-hot-toast";
import "mapbox-gl/dist/mapbox-gl.css";
import * as shuttleStations from "../data/stations.json";
import Loader from "./Loader";

export default function Map() {
  const NUM_OF_NODES = 2;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [notificationSent, setNotificationSent] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [toastShown, setToastShown] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 5.1154645,
    longitude: -1.2908544,
    pitch: 90,
    zoom: 16,
  });

  useEffect(() => {
    const fetchDataAndUpdateMarkers = () => {
      fetch("https://bt-server.onrender.com/payloads")
        .then((response) => response.json())
        .then((data) => {
          const uniqueDevices = new Set();
          const newMarkers = [];

          for (let i = data.length - 1; i >= 0; i--) {
            const payload = data[i];
            const deviceAddr = payload.deviceName;
            if (
              !uniqueDevices.has(deviceAddr) &&
              newMarkers.length < NUM_OF_NODES
            ) {
              uniqueDevices.add(deviceAddr);
              const { latitude, longitude } = payload.decodedPayload;
              newMarkers.push({ latitude, longitude });
            }

            if (newMarkers.length === NUM_OF_NODES) {
              break;
            }
          }
          setMarkers(newMarkers);
          setIsLoading(false);

          newMarkers.forEach((busMarker) => {
            shuttleStations.stations.forEach((station) => {
              const distance = calculateDistance(
                busMarker.latitude,
                busMarker.longitude,
                station.latitude,
                station.longitude
              );

              if (distance < 0.1 && !toastShown[station.name]) {
                setToastShown((prevToastShown) => ({
                  ...prevToastShown,
                  [station.name]: true,
                }));

                sendPushNotification(station.name);

                toast(`Bus is close to ${station.name}`, {
                  icon: "🚌",
                  duration: 5000,
                  style: {
                    padding: "2px 10px",
                    borderRadius: "10px",
                    marginTop: "20px",
                    color: "#000",
                  },
                });
              }
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    };

    const cleanToastInterval = setInterval(() => {
      setToastShown({});
    }, 300000);
    const interval = setInterval(fetchDataAndUpdateMarkers, 3000);
    
    return () => {
      clearInterval(interval);
      clearInterval(cleanToastInterval);
    };
  }, [notificationSent, toastShown]);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function handleMapLoad() {
    setIsLoading(false);
  }

  const sendPushNotification = (stationName) => {
    addNotification({
      title: "UCC Bus Tracking",
      subtitle: "Notice",
      message: `The shuttle is at ${stationName}`,
      theme: "light",
      native: true,
    });
  };

  const handleStationButtonClick = (station) => {
    toast.success(() => (
      <span>
        Pickup location set to <b>{station.name}</b>
      </span>
    ));
    setNotificationSent(station.name);
  };

  return (
    <div>
      {isLoading && (
        <div className="absolute inset-0 z-0 min-h-[85vh] flex justify-center items-center bg-[rgba(0,0,0,0.05)]">
          <Loader />
        </div>
      )}
      <div
        style={{
          display: isLoading ? "none" : "block",
          borderRadius: "0px",
          overflow: "hidden",
        }}
      >
        <ReactMapGL
          {...viewport}
          className=""
          width="100%"
          height="calc(100vh - 2px)"
          mapboxApiAccessToken="pk.eyJ1Ijoic2V0aHMxMCIsImEiOiJjbGg5ZXBodm8wNnVwM3JwZDFpZ3M5MW5iIn0.sW5drJM7yvG0z0qkiwQj-w"
          onViewportChange={(nextViewport) => setViewport({ ...nextViewport })}
          minZoom={5}
          onLoad={handleMapLoad}
          maxZoom={30}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v9"
        >
          {markers.map((mark, index) => (
            <Marker
              key={index}
              latitude={mark.latitude}
              longitude={mark.longitude}
            >
              <div className="marker">
                <FontAwesomeIcon
                  icon={faBus}
                  className=""
                  color="#ffffff"
                  size="xs"
                />
              </div>
            </Marker>
          ))}

          {shuttleStations.stations.map((station, index) => (
            <Marker
              key={index}
              latitude={station.latitude}
              longitude={station.longitude}
            >
              <div
                className="station"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedStation(station);
                }}
              >
                <FontAwesomeIcon
                  icon={faMapLocationDot}
                  className=""
                  color="#ffffff"
                  size="xs"
                />
              </div>
            </Marker>
          ))}

          {selectedStation ? (
            <Popup
              latitude={selectedStation.latitude}
              longitude={selectedStation.longitude}
              onClose={() => {
                setSelectedStation(null);
              }}
            >
              <div>
                <h2>{selectedStation.name}</h2>
              </div>
            </Popup>
          ) : null}

          <div className="absolute top-7 right-[2.8rem] z-10">
            <NavigationControl
              style={{
                boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
              }}
              showCompass={true}
            />
          </div>

          <div className="absolute top-[8rem] right-[2.8rem]  z-10">
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              showUserLocation
              showAccuracyCircle
            />
          </div>

          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
              <div>
                <div className="fixed bottom-[6rem] right-3 border border-gray-200 shadow-lg rounded-full">
                  <div className="bg-white rounded-full p-3">
                    <svg
                      className="h-5 w-5 text-black"
                      viewBox="2 1 11 14"
                      fill="currentColor"
                    >
                      <MdLocationPin className="w-6 h-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-white flex flex-col rounded-t-[20px] h-[40%] mt-24 fixed bottom-0 left-0 right-0">
                <div className="p-4 bg-white rounded-t-[10px] flex-1">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-3" />
                  <div className="max-w-md mx-auto">
                    <Drawer.Title className="font-bold mb-2 text-lg">
                      Select Pickup Location
                    </Drawer.Title>
                    <div>
                      <div className="flex mt-4 space-x-3 md:mt-6">
                        {shuttleStations.stations.map((station, index) => (
                          <button
                            key={index}
                            onClick={() => handleStationButtonClick(station)}
                            className={`inline-flex items-center px-2 py-2 whitespace-nowrap overflow text-sm font-semibold text-center ${
                              notificationSent === station.name
                                ? "text-white bg-black rounded-lg hover:bg-black/80"
                                : "text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                            }`}
                          >
                            {station.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setNotificationSent(null);
                      }}
                      className="inline-flex items-center mt-5 pl-2 underline py-2 text-sm font-medium text-center text-red-600 bg-white hover:text-red-800"
                    >
                      Cancel Reminder
                    </button>

                    <div className="bg-gray-200 mt-3 px-3 py-2 rounded">
                      <p className="text-xs">
                        <span className="font-bold">Note: </span>you can select
                        a location to set a reminder when the bus gets to that
                        location
                      </p>
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </ReactMapGL>
      </div>
    </div>
  );
}
