import { useQuery, useQueryClient } from "react-query";
import { URL } from "../../../constants";
import { TRegisterUser } from "../../../Types";
import { toast } from "react-hot-toast";
interface IuseSendRegForm {
  formData: TRegisterUser;
}

const useSendRegForm = ({ formData }: IuseSendRegForm) => {
  const queryClient = useQueryClient();
  delete formData.repeatPw;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["registerUser"],
    queryFn: async () => {
      const res = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ formData: formData }),
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

export { useSendRegForm };
