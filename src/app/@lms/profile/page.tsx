import UserProfileContent from '@/components/modules/profile/UserProfileContent';
import Navbar from '@/components/ui/navbar';


export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <Navbar /> 
      <UserProfileContent />
    </main>
  );
}
