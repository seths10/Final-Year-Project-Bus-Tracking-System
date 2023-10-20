/* eslint-disable react/prop-types */
import { MdArrowBack } from "react-icons/md";
import { ContextHolder } from "@frontegg/react";
import { Link } from "react-router-dom";
import { useState } from "react";

const About = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  return (
    <>
      <section className="max-w-7xl mx-auto">
        <div className="mx-3 mt-5">
          <Link
            to={"/"}
            className="font-inter text-white bg-white border border-gray px-2 py-1 rounded-lg"
          >
            <button className="font-inter text-black rounded-md mb-3">
              <MdArrowBack />
            </button>
          </Link>
          <h1 className="font-extrabold text-[#222328] mt-5 text-[32px]">
            About
          </h1>

          <p>Welcome, {userProfile?.name}</p>

          <div className="max-w-7xl mx-auto mt-5 w-full bg-white border border-gray-200 rounded-lg shadow">
            <ul
              className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50"
              id="defaultTab"
              role="tablist"
            >
              <li className="mr-2">
                <button
                  id="about-tab"
                  onClick={() => handleTabClick("about")}
                  type="button"
                  role="tab"
                  aria-controls="about"
                  aria-selected={activeTab === "about"}
                  className={`inline-block p-4 ${
                    activeTab === "about"
                      ? "text-blue-600 rounded-tl-lg hover:bg-gray-100 "
                      : "hover:text-gray-600 hover:bg-gray-100 "
                  }`}
                >
                  About
                </button>
              </li>
              <li className="mr-2">
                <button
                  id="services-tab"
                  onClick={() => handleTabClick("services")}
                  type="button"
                  role="tab"
                  aria-controls="services"
                  aria-selected={activeTab === "services"}
                  className={`inline-block p-4 ${
                    activeTab === "services"
                      ? "text-blue-600 hover:bg-gray-100"
                      : "hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Services
                </button>
              </li>
              <li className="mr-2">
                <button
                  id="statistics-tab"
                  onClick={() => handleTabClick("statistics")}
                  type="button"
                  role="tab"
                  aria-controls="statistics"
                  aria-selected={activeTab === "statistics"}
                  className={`inline-block p-4 ${
                    activeTab === "statistics"
                      ? "text-blue-600 hover:bg-gray-100"
                      : "hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Facts
                </button>
              </li>
            </ul>
            <div id="defaultTabContent">
              <div
                className={` p-4 bg-white rounded-lg md:p-8  ${
                  activeTab === "about" ? "block" : "hidden"
                }`}
                id="about"
                role="tabpanel"
                aria-labelledby="about-tab"
              >
                <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 ">
                  Final Year Project
                </h2>
                <p className="mb-3 text-gray-500 ">
                  This was developed to provide proper management of time for
                  students on campus.
                </p>

                <div className="flex flex-col justify-between">
                  Made with ♥ by: <br />
                  <a
                    href="https://github.com/seths10"
                    className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
                  >
                    Seth Addo
                  </a>
                  <a
                    href="https://github.com/shineteye"
                    className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
                  >
                    Shine Teye
                  </a>
                </div>
              </div>
              <div
                className={` p-4 bg-white rounded-lg md:p-8  ${
                  activeTab === "services" ? "block" : "hidden"
                }`}
                id="services"
                role="tabpanel"
                aria-labelledby="services-tab"
              >
                <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 ">
                  We show you the location of all available buses
                </h2>
                <ul role="list" className="space-y-4 text-gray-500 ">
                  <li className="flex space-x-2 items-center">
                    <svg
                      className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="leading-tight">
                      Dynamic maps and interaction
                    </span>
                  </li>
                  <li className="flex space-x-2 items-center">
                    <svg
                      className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="leading-tight">Location of shuttles</span>
                  </li>
                  {/* <li className="flex space-x-2 items-center">
                    <svg
                      className="flex-shrink-0 w-3.5 h-3.5 text-blue-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="leading-tight">Nice User Interface</span>
                  </li> */}
                  <li className="flex space-x-2 items-center">
                    <svg
                      className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="leading-tight">Easy to Use</span>
                  </li>
                </ul>

                <a
                  href="https://github.com/seths10/bt-front"
                  className="inline-flex items-center mt-4 font-medium text-blue-600 hover:text-blue-800"
                >
                  Learn more
                  <svg
                    className="w-2.5 h-2.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
              <div
                className={` p-4 bg-white rounded-lg md:p-8  ${
                  activeTab === "statistics" ? "block" : "hidden"
                }`}
                id="statistics"
                role="tabpanel"
                aria-labelledby="statistics-tab"
              >
                <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
                  <div className="flex flex-col">
                    <dt className="mb-2 text-3xl font-extrabold">2</dt>
                    <dd className="text-gray-500 ">Developers</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="mb-2 text-3xl font-extrabold">100+</dt>
                    <dd className="text-gray-500 ">Students have used this</dd>
                  </div>
                  {/* <div className="flex flex-col">
                    <dt className="mb-2 text-3xl font-extrabold">0</dt>
                    <dd className="text-gray-500 ">Issues</dd>
                  </div> */}
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <button
              className="mr-4 mt-10 text-lg px-3 float-right border py-2 bg-white rounded-lg text-red-600"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
