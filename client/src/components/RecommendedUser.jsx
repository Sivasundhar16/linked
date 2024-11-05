import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export const RecommendedUser = ({ user }) => {
  const { data: connectionStatus, isLoading } = useQuery({
    queryKey: ["connectionstatus", user._id],
    queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
  });

  return <div>RecommendedUser</div>;
};
