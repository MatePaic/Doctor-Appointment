import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { Doctor } from "../models/doctor";
import AllDoctors from "./AllDoctors";
import { useNavigate } from "react-router-dom";

type Props = {
    docId: string
    speciality: string,
}

export default function RelatedDoctors({docId, speciality}: Props) {
  const {doctors} = useContext(AppContext);
  const [relDoc, setRelDoc] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
        const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
        setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <AllDoctors doctors={relDoc} endNumber={5} onNavigate={(doctorId) => {
        navigate(`/appointment/${doctorId}`);
        window.scrollTo(0, 0);
    }}/>
  )
}
