import { useState, useEffect } from "react";
import { currentUser } from "../service/auth";
import { useNavigate } from "react-router";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await currentUser();

        if (isMounted) {
          setUser(response.data.data);
        }
      } catch (err) {
        if (isMounted) setError(err);
        navigate("/sign", { isRegister: false });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading, error };
};

export default useUser;
