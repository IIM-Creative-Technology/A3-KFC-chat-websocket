import session from '@/services/session';

export default function ({ redirect }) {
  // If we are not connected
  if (!session.isConnected()) {
    redirect('/login');
  }
}
