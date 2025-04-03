import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import AllDoctors from './AllDoctors';
import { useNavigate } from 'react-router-dom';

export default function TopDoctors() {
  const {doctors} = useContext(AppContext);
  const navigate = useNavigate();
    
  return (
    <AllDoctors doctors={doctors} endNumber={10} onNavigate={(doctorId) => {
      navigate(`/appointment/${doctorId}`);
    }}/>
  )
}
