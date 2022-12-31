import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";
import { isError } from "react-query";
import { TRegisterUser } from "../../Types";
import { useSendRegForm } from "./Hooks/useSendRegForm";
import { useSendVerificationCode } from "./Hooks/useSendVerificationCode";
import Spinner from "./Spinner/Spinner";
type TPages = {
  page: "page1" | "page2" | "page3";
};

interface IRegisterForm {
  setFlipForms: Dispatch<SetStateAction<boolean>>;
  setDisableSwitchBtn: Dispatch<SetStateAction<boolean>>;
}

var securityCode: number;

const RegisterForm = ({ setFlipForms, setDisableSwitchBtn }: IRegisterForm) => {
  const [formPage, setFormPage] = useState<TPages>({ page: "page1" });
  const [securityCode, setSecurityCode] = useState<string>("");
  const [formData, setFormData] = useState<TRegisterUser>({
    username: "admin2",
    password: "admin",
    repeatPw: "admin",
    email: "josh.dean@dean.com",
  });

  useEffect(() => {
    if (formPage.page === "page2" || formPage.page === "page3") {
      setDisableSwitchBtn(true);
    } else {
      setDisableSwitchBtn(false);
    }
  }, [formPage]);

  switch (formPage.page) {
    case "page1":
      return (
        <RegForm
          formData={formData}
          setFormData={setFormData}
          setFormPage={setFormPage}
        />
      );
    case "page2":
      return (
        <SendVerificationEmail
          setSecurityCode={setSecurityCode}
          formData={formData}
          setFormPage={setFormPage}
        />
      );
    case "page3":
      return (
        <EmailSent
          setDisableSwitchBtn={setDisableSwitchBtn}
          setFlipForms={setFlipForms}
          setFormPage={setFormPage}
          securityCode={securityCode}
        />
      );
  }
};

interface IRegForm {
  formData: TRegisterUser;
  setFormData: Dispatch<SetStateAction<TRegisterUser>>;
  setFormPage: Dispatch<SetStateAction<TPages>>;
}

const RegForm = ({ formData, setFormData, setFormPage }: IRegForm) => {
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.repeatPw) {
      toast("Email Sent!");
      setFormPage({ page: "page2" });
    }
  };

  useEffect(() => {
    if (formData.password !== formData.repeatPw) {
      setShowErrorMsg(true);
    } else {
      setShowErrorMsg(false);
    }
  }, [formData.repeatPw]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h3 className="form-title">Fill the form for registration</h3>
      <div className="form-input">
        <label htmlFor="">username</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          maxLength={10}
          defaultValue={formData.username}
          onChange={(e) => {
            setFormData({
              ...formData,
              username: e.target.value,
            });
          }}
          required
        />
      </div>
      {showErrorMsg && <ErrorMsg message="Passwords does not match" />}

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
          required
        />
      </div>
      <div className="form-input">
        <label htmlFor="">repeat password</label>
        <input
          type="password"
          name="repeatPw"
          autoComplete="off"
          defaultValue={formData.repeatPw}
          onChange={(e) => {
            setFormData({
              ...formData,
              repeatPw: e.target.value,
            });
          }}
          required
        />
      </div>
      <div className="form-input">
        <label htmlFor="">email</label>
        <input
          type="email"
          name="email"
          autoComplete="off"
          defaultValue={formData.email}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value,
            });
          }}
          required
        />
      </div>
      <button className="btn-blink-green" type="submit">
        Register
      </button>
    </form>
  );
};

interface ISendVerificationEmail {
  formData: TRegisterUser;
  setFormPage: Dispatch<SetStateAction<TPages>>;
  setSecurityCode: Dispatch<SetStateAction<string>>;
}

const SendVerificationEmail = ({
  setFormPage,
  formData,
  setSecurityCode,
}: ISendVerificationEmail) => {
  const { data, isLoading, isError } = useSendRegForm({ formData });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormPage({ page: "page3" });
  };
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <h3>Error occured</h3>;
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h3 className="form-title">Check your email and enter the code</h3>
      <div className="form-input">
        <p className="o5">the code is: {data.key}</p>

        <label htmlFor="">security code</label>

        <input
          type="number"
          name="security-code"
          autoComplete="off"
          minLength={4}
          maxLength={4}
          required
          onChange={(e) => {
            setSecurityCode(e.target.value);
          }}
        />
      </div>

      <button>Verify Email</button>
    </form>
  );
};

interface IemailSent {
  securityCode: string;
  setFormPage: Dispatch<SetStateAction<TPages>>;
  setFlipForms: Dispatch<SetStateAction<boolean>>;
  setDisableSwitchBtn: Dispatch<SetStateAction<boolean>>;
}

const EmailSent = ({
  setDisableSwitchBtn,
  setFlipForms,
  securityCode,
  setFormPage,
}: IemailSent) => {
  const securityCodeNumber = Number(securityCode);
  const { data, isLoading, isError } = useSendVerificationCode({
    verificationCode: securityCodeNumber,
  });
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <h3>Error occured</h3>;
  }
  if (data.errors) {
    setTimeout(() => {
      setFormPage({ page: "page2" });
    }, 2000);
    return (
      <div>
        <Spinner message={data.errors[0].msg} />
      </div>
    );
  }
  setTimeout(() => {
    setDisableSwitchBtn(false);
    setFlipForms(false);
  }, 2000);
  return (
    <div>
      <Spinner message={"Thank you for registering!"} />
    </div>
  );
};

export default RegisterForm;

interface IerrorMsg {
  message: string;
}

const ErrorMsg = ({ message }: IerrorMsg) => {
  return <p className="form-error-msg">{message}</p>;
};
