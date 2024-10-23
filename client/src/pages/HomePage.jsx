import { useQueries } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const HomePage = () => {
  const { data: recommendedUsers } = useQueries({
    queryKey: ["recommendedUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/users/recommended");
        return res.data;
      } catch (error) {
        toast.error(error.response.data.message || "Something went Wrong");
      }
    },
  });
  return <div>HomePage</div>;
};
