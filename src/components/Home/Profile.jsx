import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { checkAuthenticatedAPI } from "../../APIServices/usersApi/usersApi";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../../redux/slice/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: checkAuthenticatedAPI,
  });
  //dispatch to store
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);
  return <div>Profile</div>;
}
