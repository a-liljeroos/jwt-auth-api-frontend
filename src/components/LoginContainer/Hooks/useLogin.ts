import { useQuery, useQueryClient } from "react-query";
import { URL } from "../../../constants";
import { TLoginUser } from "../../../Types";
import { toast } from "react-hot-toast";

const useLoginUser = ({ username, password }: TLoginUser) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["registerUser"],
    queryFn: async () => {
      const res = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      return res.json();
    },
    refetchOnWindowFocus: false,

    onError: (error) => {
      toast.error(`Something went wrong: ${error}`);
    },
  });
  return { data, isLoading, isError };
};

export { useLoginUser };
