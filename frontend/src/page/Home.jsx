/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Map } from "../components";
import { Drawer } from "vaul";
import { MdBusAlert, MdClose, MdLocationPin } from "react-icons/md";
import { MdDirectionsBus } from "react-icons/md";
import { Link } from "react-router-dom";
import { AdminPortal } from "@frontegg/react";

const Home = ({ userProfile }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState([]);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleShowProfile = () => {
    AdminPortal.show();
  };

  const renderAboutLink = () => {
    if (window.innerWidth <= 640) {
      return (
        <img
          className={"w-[3rem] h-[3rem] shadow-lg rounded-full ring-1 ring-white"}
          onClick={toggleDialog}
          src={userProfile?.profilePictureUrl}
          alt={userProfile?.name}
        />
      );
    } else {
      return (
        <Link
          to={"/about"}
          className="font-inter text-black bg-white px-3 py-1 rounded-md font-medium"
        >
          About
        </Link>
      );
    }
  };

  useEffect(() => {
    const fetchDataAndUpdateMarkers = () => {
      fetch("https://bt-server.onrender.com/payloads")
        .then((response) => response.json())
        .then((data) => {
          const lastTwo = data.slice(-2);
          if (
            lastTwo.length === 2 &&
            lastTwo[0].deviceName ===
              lastTwo[1].deviceName
          ) {
            setDeviceInfo([lastTwo[0]]);
          } else {
            setDeviceInfo(lastTwo.reverse());
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchDataAndUpdateMarkers();
    const interval = setInterval(fetchDataAndUpdateMarkers, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div>
        <div className="absolute z-50 left-5 top-[2rem]">
          {renderAboutLink()}
        </div>

        <Map />
        <Drawer.Root shouldScaleBackground>
          <Drawer.Trigger asChild>
            <div>
              <div className="fixed bottom-9 right-3 border border-gray-200 shadow-lg rounded-full">
                <div className="bg-white rounded-full p-3">
                  <svg
                    className="h-5 w-5 text-black"
                    viewBox="0 0 13 16"
                    fill="currentColor"
                  >
                    <MdBusAlert className="w-6 h-6" />
                  </svg>
                </div>
              </div>
            </div>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-white flex flex-col overflow-auto rounded-t-[20px] h-[40%] mt-24 fixed bottom-0 left-0 right-0">
              <div className="p-4 bg-white rounded-t-[10px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-3" />
                <div className="max-w-md mx-auto">
                  <Drawer.Title className="font-bold mb-2">
                    Available Shuttles
                  </Drawer.Title>

                  {deviceInfo?.length === 0 ? (
                    <div className="flex w-full max-w-md px-2 py-6 mb-1 border items-center justify-center rounded-lg bg-gray-800 border-gray-700">
                      <h3 className="text-lg font-medium font-lato text-white">
                        Shuttles Unavailable⌛
                      </h3>
                    </div>
                  ) : (
                    <div>
                      {deviceInfo.map((item, index) => (
                        <div
                          key={index}
                          className="w-full max-w-md p-4 mb-1 border  rounded-lg bg-gray-800 border-gray-700"
                        >
                          <div className="flow-root">
                            <div>
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-black">
                                    <MdDirectionsBus className="w-5 h-6" />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-md font-bold truncate text-white">
                                    Shuttle {item.deviceName}
                                  </p>
                                  <div className="flex items-center gap-1 text-sm text-gray-400">
                                    <MdLocationPin />
                                    <p>UCC Campus</p>
                                  </div>
                                </div>
                                <div className="inline-flex justify-center border border-dashed border-gray-200 rounded-full px-2 text-white items-center text-base">
                                  {/* <p className="text-xs">ETA:</p> */}
                                  <p className="font-bold text-sm">Aayalolo</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>

        {isDialogOpen && (
          <div
            onClick={toggleDialog}
            className="fixed inset-0 bg-black bg-opacity-50 flex px-5 justify-center items-center"
          >
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
              <div className="flex justify-end px-2 pt-2">
                <button
                  onClick={toggleDialog}
                  className="font-inter text-black rounded-md block"
                >
                  <MdClose className="text-gray-300 text-lg" />
                </button>
              </div>

              <div className="flex flex-col items-center pb-6">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={userProfile?.profilePictureUrl}
                  alt="Bonnie image"
                />
                <div className="flex">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                    {userProfile?.name}
                  </h5>
                  <span className="inline-flex items-center justify-center ml-1 mb-1 text-xs">
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                      />
                      <path
                        fill="#fff"
                        d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                      />
                    </svg>
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {userProfile?.email}
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                  <a
                    onClick={handleShowProfile}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-black/80"
                  >
                    Profile
                  </a>
                  <Link
                    to={"/about"}
                    onClick={toggleDialog}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
