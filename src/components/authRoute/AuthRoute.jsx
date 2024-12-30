import React from "react";
import Login from "../Home/Login";
import { useQuery } from "@tanstack/react-query";
import { checkAuthenticatedAPI } from "../../APIServices/usersApi/usersApi";
import { Navigate } from "react-router-dom";
import AuthCheckingComponent from "../AuthCheckingComponent";

export default function AuthRoute({ children }) {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: checkAuthenticatedAPI,
  });
  console.log(data);
  if (isLoading) return <AuthCheckingComponent />;
  //in case a user is not login
  if (!data) {
    return <Navigate to="/login" />;
  }
  //render
  return children;
}
