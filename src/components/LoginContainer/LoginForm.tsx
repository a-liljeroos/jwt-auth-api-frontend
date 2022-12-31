import React, { useState, Dispatch, SetStateAction } from "react";
import { TLoginUser } from "../../Types";
import { useLoginUser } from "./Hooks/useLogin";
import Spinner from "./Spinner/Spinner";

type TPages = {
  page: "page1" | "page2";
};

const LoginForm = () => {
  const [formPage, setFormPage] = useState<TPages>({ page: "page1" });
  const [formData, setFormData] = useState<TLoginUser>({
    username: "admin",
    password: "admin",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormPage({ page: "page2" });
  };

  switch (formPage.page) {
    case "page1":
      return (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-input">
            <label htmlFor="">username</label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  username: e.target.value,
                });
              }}
              defaultValue={formData.username}
            />
          </div>
          <div className="form-input">
            <label htmlFor="">password</label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              defaultValue={formData.password}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      );
    case "page2":
      return <LoginFormSent setFormPage={setFormPage} formData={formData} />;
  }
};

interface ILoginFormSent {
  formData: TLoginUser;
  setFormPage: Dispatch<SetStateAction<TPages>>;
}

const LoginFormSent = ({ formData, setFormPage }: ILoginFormSent) => {
  const { data, isLoading, isError } = useLoginUser(formData);
  setTimeout(() => {
    setFormPage({ page: "page1" });
  }, 2000);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <>Error</>;
  }

  if (data.errors) {
    return <Spinner message={data.errors[0].msg} />;
  }
  console.log(data.accessToken);
  return (
    <>
      <Spinner message="Logged in successfully!" />;
    </>
  );
};

export default LoginForm;
