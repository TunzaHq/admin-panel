import React, { useState } from "react";
import { makeGetRequest, makePostRequest } from "../Api/ApiHandler";
import "../Style/Login.css";
import { toast } from "react-toastify";
import Loader from "./Loader/Loader";
import { IUser } from "../interfaces/user.interface";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLoading, setLoader] = useState<boolean>(false);
  const [emailExpanded, setEmailExpanded] = useState<boolean>(false);
  const [passwordExpanded, setPasswordExpanded] = useState<boolean>(false);
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  function handleFocus(e: React.FocusEvent): void {
    if ((e.target as HTMLInputElement).name === "email") {
      setEmailExpanded(true);
    } else if ((e.target as HTMLInputElement).name === "password") {
      setPasswordExpanded(true);
    }
  }
  function leaveFocus(e: React.FocusEvent): void {
    if ((e.target as HTMLInputElement).name === "email") {
      setEmailExpanded(false);
    } else if ((e.target as HTMLInputElement).name === "password") {
      setPasswordExpanded(false);
    }
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoader(true);
      const req1 = await makePostRequest(
        "https://tunza.mybackend.studio/auth/login",
        loginFormData
      );
      if (req1.hasOwnProperty("token")) {
        const token = req1.token;
        await sessionStorage.setItem("token", `Bearer ${token}`);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const req2 = await makeGetRequest(
          "https://tunza.mybackend.studio/users/me",
          headers
        );
        const user: IUser = req2;
        if (user.role === "admin") {
          toast.success("Success")
          await sessionStorage.setItem("user", JSON.stringify(user));
          navigate("/dashboard");          
        } else {
          toast.warning("Unauthorized");
        }
        setLoader(false);
      } else {
        toast.error("Invalid credentials! Please try again.");
        setLoader(false);
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", error);
      // You can handle the login error here
    }
  };

  const handleLoginFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="mt-10" style={{ display: "grid", placeItems: "center" }}>
      <div className="flex">
        <img
          style={{ width: "10em" }}
          src="/assets/svg/logo.svg"
          alt="tunza logo"
        />
        <h1 className="mt-auto font-bold tunza-font">
          <span style={{ color: "var(--orange)" }}>T</span>
          <span style={{ color: "var(--blue)" }}>
            unza Administrator Portal
          </span>
        </h1>
      </div>

      <div className="mt-4 pt-4 mb-5 pb-3 flex flex-col">
        <h1
          className="px-auto font-semibold py-3"
          style={{ color: "var(--blue)", fontSize: "1.8em" }}
        >
          Login
        </h1>
        <div
          style={{
            width: "5.9em",
            height: "4px",
            backgroundColor: "var(--blue)",
          }}
        ></div>
      </div>

      {/* {loginMessage && <p className="success">{loginMessage}</p>} */}
      {/* {error && <p className="error">{error}</p>} */}
      <div className="form-container">
        <form onSubmit={handleLogin} className="">
          <div
            className="relative rounded-lg my-3 py-2 w-60%"
            style={{
              border: emailExpanded ? "none" : "var(--light-gray) solid 1px",
            }}
          >
            <div className="flex">
              <img
                src="/assets/svg/securePerson.svg"
                className="px-3"
                alt="person icon"
                style={{ width: "3em" }}
              />
              <input
                type="email"
                name="email"
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => leaveFocus(e)}
                className="input-style py-3 pl-2 rounded-lg"
                placeholder="Email"
                value={loginFormData.email}
                onChange={handleLoginFormChange}
                style={{ width: "100%" }}
              />
            </div>
            <div
              className={`my-1 line ${emailExpanded ? "expanded" : ""}`}
            ></div>
          </div>

          <div
            className="relative my-3 py-2 rounded-lg w-60%"
            style={{
              border: passwordExpanded ? "none" : "var(--light-gray) solid 1px",
            }}
          >
            <div className="flex">
              <img
                src="/assets/svg/password.svg"
                className="px-3"
                alt="person icon"
                style={{ width: "3em" }}
              />
              <input
                type="password"
                name="password"
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => leaveFocus(e)}
                className="input-style py-3 pl-2 rounded-lg"
                placeholder="Password"
                value={loginFormData.password}
                onChange={handleLoginFormChange}
                style={{ width: "100%" }}
              />
            </div>
            <div
              className={`my-1 line ${passwordExpanded ? "expanded" : ""}`}
            ></div>
          </div>

          <div>
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="border py-2 px-9 rounded-2xl login-btn text-lg"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
