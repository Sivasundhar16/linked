import { useQueries } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export const HomePage = () => {
  const { data: recommendedUsers } = useQueries({
    queryKey: ["recommendedUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });
  const { data: posts } = useQueries({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  console.log("recommendeduser ", recommendedUsers);
  console.log("posts ", posts);

  return <div>HomePage</div>;
};
