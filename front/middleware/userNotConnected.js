import session from '@/services/session';

export default function ({ redirect }) {
  // If we are connected
  if (session.isConnected()) {
    redirect('/');
  }
}
