import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { checkAuthenticatedAPI } from "../../APIServices/usersApi/usersApi";
import AuthCheckingComponent from "../AuthCheckingComponent";
const AuthRoute = ({ children }) => {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthenticatedAPI,
  });

  console.log(data);

  //for loading
  if (isLoading) return <AuthCheckingComponent />;
  //in case a user is not login
  if (!data) {
    return <Navigate to="/login" />;
  }
  //render
  return children;
};

export default AuthRoute;
