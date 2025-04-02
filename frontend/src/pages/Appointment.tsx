import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import { Doctor } from "../models/doctor";
// @ts-ignore
import {assets} from '../assets/assets';
import RelatedDoctors from "../components/RelatedDoctors";

export default function Appointment() {
  const { docId } = useParams();
  const {doctors, currencySymbol} = useContext(AppContext);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInWeek = 7;

  const [docInfo, setDocInfo] = useState<Doctor | null>(null);
  const [docSlots, setDocSlots] = useState<{ dateTime: Date; time: string; }[][]>([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc: Doctor) => doc._id === docId);
    if (docInfo) {
        setDocInfo(docInfo);
        console.log(docInfo);
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < daysInWeek; i++) {
      // getting the date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // settings end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //settings hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        //add slot to the array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime
        });

        //increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => ([...prev, timeSlots]));
    }
  }

  useEffect(() => {
      fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return docInfo && ( 
    <div>
      {/* -------- Doctor Details -------------------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="bg-blue-500 w-full sm:max-w-72 rounded-lg" src={docInfo?.image} alt="doctor_image" />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ---------- Doc Info: name, degree, experience -----------*/}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name} 
            <img className="w-5" src={assets.verified_icon} alt="verified_icon" />
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>

          {/* ---------- Doctor About -----------*/}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="info_icon" />
            </p>
            <p className="text-sm text-gray-500 mx-w-[700px] mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* --------- Booking Available Slots -------------- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots.map((item: { dateTime: Date, time: string }[], index: number) => (
              <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-500 text-white' : 'border border-gray-200'}`}>
                <p>
                  {item[0] && daysOfWeek[(item[0].dateTime.getDate()) >= 7 ? 
                  Math.abs((item[0].dateTime.getDate()) - 7) : (item[0].dateTime.getDate())]}
                </p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length && docSlots[slotIndex].map((item: { dateTime: Date, time: string }, index) => (
            <p onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-500 text-white' : 'text-gray-400 border border-gray-200'}`} 
              key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button className="bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
      </div>

      {/*--------- Listing Related Doctors ------*/}
      {docId && docInfo.speciality && (
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      )}
    </div>
  )
}
