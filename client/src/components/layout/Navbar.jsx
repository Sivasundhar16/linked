import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const Navbar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: notificaions } = useQuery({
    queryKey: ["nofifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });
  // eslint-disable-next-line no-unused-vars
  const { data: connectionRequest } = useQuery({
    queryKey: ["connectionRequest"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  // eslint-disable-next-line no-unused-vars
  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
  });

  // eslint-disable-next-line no-unused-vars
  const unreadNotification = notificaions?.data.filter(
    (notif) => !notif.read
  ).length;

  return <div>Navbar</div>;
};
