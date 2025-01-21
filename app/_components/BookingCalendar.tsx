'use client';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Install with: npm install react-calendar
import 'react-calendar/dist/Calendar.css';
import { db } from '@/app/_lib/firebase'; // Import Firebase Firestore
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];


  useEffect(() => {
    const fetchBookedSlots = async () => {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const q = query(collection(db, "appointments"), where("date", "==", formattedDate));
      const querySnapshot = await getDocs(q);
      const bookedTimes = querySnapshot.docs.map(doc => doc.data().time);
      setBookedSlots(bookedTimes);
    };

    if (showModal) {
      fetchBookedSlots();
    }
  }, [selectedDate, showModal]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleTimeSelect = async (time) => {
    setSelectedTime(time);

    // alert(`Booking confirmed for ${selectedDate.toDateString()} at ${time}`);
  };

  const submitAppointment = async () => {
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }
    await addDoc(collection(db, "appointments"), { date: selectedDate.toISOString().split('T')[0], selectedTime });
    setShowModal(false);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Book an Appointment</h1>
      <Calendar onClickDay={handleDateChange} minDate={new Date()} maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} />
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Select Time Slot for {selectedDate.toDateString()}</h2>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button key={time} className={`p-2 rounded ${bookedSlots.includes(time) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`} onClick={() => !bookedSlots.includes(time) && handleTimeSelect(time)} disabled={bookedSlots.includes(time)}>
                  {time}
                </button>
              ))}
            </div>
            <div className='flex flex-row justify-between'>
              <button className="mt-4 text-red-500" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="mt-4 text-white bg-blue-500 p-2 rounded-md" onClick={submitAppointment}>Submit</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}


