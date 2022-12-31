import { useQuery, useQueryClient } from "react-query";
import { URL } from "../../../constants";
import { TRegisterUser } from "../../../Types";
import { toast } from "react-hot-toast";

interface IuseSendVerficationCode {
  verificationCode: number;
}

const useSendVerificationCode = ({
  verificationCode,
}: IuseSendVerficationCode) => {
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ["verifyEmail"],
    queryFn: async () => {
      console.log(verificationCode);
      const res = await fetch(`${URL}/api/auth/verifyemail`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ verificationCode }),
      });
      return res.json();
    },
    refetchOnWindowFocus: false,
    onError: (error) => {
      toast.error(`Something went wrong: ${error}`);
    },
  });
  return { data, isLoading, isError, status };
};

export { useSendVerificationCode };
