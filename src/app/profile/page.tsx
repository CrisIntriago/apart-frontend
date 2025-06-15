import UserProfileContent from './UserProfileContent';
import Navbar from '../components/navbar'; 


export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <Navbar /> {/* Add the Navbar here */}
      <UserProfileContent />
    </main>
  );
}
