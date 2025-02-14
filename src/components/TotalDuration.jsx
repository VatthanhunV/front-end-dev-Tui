import { React, useState, useEffect } from 'react';
import axios from 'axios';

function Totalduration() {
  const [duration, setDuration] = useState(0);
  const idtoken = localStorage.getItem('idtoken');
  if (idtoken) {
    const decoded = jwt_decode(idtoken);
    var userID = decoded.user.userID;
  }
 
 
  const BACKEND_URL = 'https://infinity-fit-backend.onrender.com';
  const FURI = 'https://infinityfitbackenddev.onrender.com';


  const fetchDuration = async (userID) => {
    const res = await axios.get(`${BACKEND_URL}/activities/`);
    const activities = res.data;
    console.log(activities);

    const totalDuration = activities.reduce((accumulator, activity) => {
      return accumulator + activity.duration;
    }, 0);
    setDuration(totalDuration);
    console.log(totalDuration);
  };

  
  useEffect(() => {
    fetchDuration(userID);
  }, [userID]);

  return (
    <div>
      <div className="card-total-duration mt-10 max-lg:ml-10">
        <div className="w-[450px] h-[250px] bg-sky-950 rounded-[13px]">
          <div className="bmi-card flex flex-auto">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/11432/11432052.png"
                className="pt-16 pl-7"
                alt="duration-pic"
              />
            </div>
            <div className="total-duration">
              <h2 className="text-2xl text-bold text-white text-center pt-10 pl-14">
                Total Duration
              </h2>
              <h2 className="text-3xl text-bold text-blue-500 text-center pt-7 pl-10">
                {duration} Minutes
              </h2>
              <progress
                className="progress progress-info w-56 pl-10 mt-10"
                value="70"
                max="100"
              ></progress>
              <h3></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Totalduration;