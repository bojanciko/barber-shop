
import BookingCalendar from "../_components/BookingCalendar"
import LogoutButton from "../_components/LogoutBtn"
import ProtectedRoute from "../_components/ProtectedRoute"

// app/appointments/page.tsx
export default function AppointmentsPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">Appointments</h1>
        <BookingCalendar />
        <LogoutButton />
      </div>
    </ProtectedRoute>
  )
}