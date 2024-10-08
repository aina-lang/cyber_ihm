import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import LogoW from "../../client/src/assets/logo-1.png";
import LogoB from "../../client/src/assets/logo-2.png";
import Post from "../../client/src/assets/post.png";
import { LogOut, MessageSquareQuote, Play, Pause } from "lucide-react";
import clip from "./assets/video.mp4";
import { MdComputer } from "react-icons/md";
const particlesOptions = {
  particles: {
    number: {
      value: 80,

      density: {
        enable: true,

        value_area: 800,
      },
    },
  },
};
const ENDPOINT = "http://localhost:8000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

async function notifyUser() {
  if (!("Notification" in window)) {
    alert("Votre navigateur ne supporte pas les notifications.");
  } else if (Notification.permission === "denied") {
    alert("Les notifications sont bloquées dans votre navigateur.");
  } else {
    await Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          new Notification("Notification autorisée");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function App({ clients, logo }) {
  const [compteur, setCompteur] = useState({});
  const [notificationPermission, setNotificationPermission] = useState(null);
  const [userResponded, setUserResponded] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Registration successful");
        })
        .catch((error) => {
          console.log("Service worker registration failed");
        });
    }
  }, []);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, connectionOptions);

    socket.on("compteurChanged", (data) => {
      const { clientIp, elapsedTime } = data;
      setCompteur((prevState) => ({
        ...prevState,
        [clientIp]: elapsedTime,
      }));
    });

    const clientIp = "192.168.1.101";
    socket.emit("connectClient", clientIp);

    const storedPermission = localStorage.getItem("notificationPermission");
    if (storedPermission) {
      setNotificationPermission(storedPermission);
    }

    notifyUser();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNotificationPermission = async (permission) => {
    localStorage.setItem("notificationPermission", permission);
    setNotificationPermission(permission);
    setUserResponded(true);
    await notifyUser();
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="  h-screen">
      {/* <div className="px-12 py-4  w-full  flex items-center justify-start space-x-3 "> */}
      {/* <img src={LogoW} alt="Logo black" className="w-32" /> */}
      {/* <span className="font-semibold text-xl text-[#f04e19]">CAPMADA</span>
      </div> */}
      <div className=" flex w-full h-full ">
        <div className="w-2/3  p-10 h-full  items-center rounded-lg">
          <div className="flex bg-[#e4edf4] rounded-md py-3  items-center justify-between  mx-auto px-12">
            <div className="flex gap-4 space-y-2 items-start w-fit justify-center">
              {/* <img src={Post} alt="Post" className="p-8  rounded-xl" /> */}
              <MdComputer className="h-full w-[140px]" 
              // color="rgb(14 ,159 ,110)"
              />
              <div class="flex flex-col space-y-2 p-3">
                <h2 className="font-semibold text-2xl text-[#4183bb]">
                  HP WINDOWS
                </h2>
                <span className="px-2 text-base text-text rounded-md border w-fit">
                  192.168.70.121
                </span>
                {/* <span className="px-2 text-base text-text rounded-md  border  w-fit">
                  40 Ar / min
                </span> */}
              </div>
            </div>
            <div className="flex  items-center justify-center gap-4">
              <button
                className="w-8 h-8 flex justify-center items-center  rounded-full"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause size={20} color="#4f8a10" />
                ) : (
                  <Play size={20} color="#d8000c" />
                )}
              </button>
              <button class="w-8 h-8 flex justify-center items-center  rounded-full">
                <MessageSquareQuote size={20} />
              </button>
              <button class="w-8 h-8 flex justify-center items-center  rounded-full">
                <LogOut size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2   mx-auto gap-8 mt-8">
            <div className="flex bg-white items-center justify-center min-h-fit border rounded-lg  relative px-8 py-4">
              <span className="absolute -top-[20px] left-4 bg-white text-gray-700 shadow-md px-3 py-2 rounded-lg">
                Heure de début
              </span>
              <span className="text-5xl text-gray-800">12 : 32 : 00</span>
            </div>
            <div className="flex bg-white items-center justify-center min-h-fit border rounded-lg  relative px-8 py-4">
              <span className="absolute -top-[20px] left-4 bg-white text-gray-700  shadow-md px-3 py-2 rounded-lg">
                Temps écoulé
              </span>
              <span className="text-5xl text-gray-800">12 : 32 : 00</span>
            </div>
            <div className="flex bg-white items-center justify-center min-h-fit border rounded-lg  relative px-8 py-4">
              <span className="absolute -top-[20px] left-4 text-gray-700 bg-white shadow-md px-3 py-2 rounded-lg">
                Heure de fin
              </span>
              <span className="text-5xl">12 : 32 : 00</span>
            </div>
            <div className="flex  bg-white items-center justify-center min-h-fit border rounded-lg  relative px-8 py-4">
              <span className="absolute -top-[20px] left-4 text-gray-700 bg-white shadow-md px-3 py-2 rounded-lg">
                Temps restant
              </span>
              <span className="text-5xl text-gray-800">12 : 32 : 00</span>
            </div>
            <div className="flex bg-[#e4edf4]  col-span-2 items-center justify-center min-h-fit border rounded-lg  relative px-8 py-4">
              <span className="absolute -top-[20px] left-4 bg-[#4183bb] text-white shadow-md px-3 py-2 rounded-lg">
                Payer
              </span>
              <span className="text-5xl text-[#4183bb]">4.000 Ariary</span>
            </div>
          </div>
        </div>
        <div className="w-1/3 h-full bg-[#4183bb] relative flex items-center justify-center">
          <h1 className="text-[80px] p-5 absolute z-50 text-white shadow-md font-bold">
            Cyber <span className="text-[#4183bb]">Diamond</span>
          </h1>
          <video id="background-video" loop autoPlay  className=" top-0 left-0 w-full h-full z-0 object-cover">
            <source src={clip} type="video/mp4" />
            <source src={clip} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default App;
