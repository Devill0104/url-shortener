
import { redirect } from '@tanstack/react-router';
import { getCurrentUser } from '../api/user.api';
import { login } from '../store/slice/authSlice';

const checkAuth = async ({ context }) => {
  try {
    const { store, queryClient } = context;

    const user = await queryClient.fetchQuery({
      queryKey: ['currentUser'],
      queryFn: getCurrentUser
    });

    if (!user) return false;

    store.dispatch(login(user)); 

    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) {
      return false;
    }

    return true;
  } catch (e) {
    console.log(e);
    return redirect({ to: '/' });
  }
};

export default checkAuth;
