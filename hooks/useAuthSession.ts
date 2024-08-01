import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import axios from "axios";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setUser(response.data));
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          dispatch(clearAuth());
          localStorage.removeItem('token');
        }
      }
    };

    fetchUser();
  }, [dispatch]);
  

  return user;
};

export default useAuthSession;