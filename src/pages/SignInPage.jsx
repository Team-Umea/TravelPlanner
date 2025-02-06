import React, { useState } from "react";
import FormInput from "../components/smart-components/FormInput";
import PrimaryBtn from "../components/btn/PrimaryBtn";
import { IoIosArrowRoundForward } from "react-icons/io";
import AuthForm from "../components/smart-components/AuthForm";
import useAuthStore from "../hooks/useAuthStore";
import useAuthDB from "../hooks/useAuthDB";
import { NavLink, useNavigate } from "react-router";

export default function SignInPage() {
  const navigate = useNavigate();
  const { updateIsAuthenticated, updateUsername, error } = useAuthStore(true);
  const { signIn } = useAuthDB();
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn(user);
    if (response) {
      updateIsAuthenticated(true);
      updateUsername(response.username);
      navigate("/trips");
    }
  };

  return (
    <AuthForm headline="Access your account!" onSubmit={handleSubmit}>
      <FormInput
        value={user.identifier}
        name="identifier"
        label="Username or email"
        onChange={handleChange}
      />
      <FormInput
        type="password"
        value={user.password}
        name="password"
        label="Password"
        onChange={handleChange}
      />
      {error && (
        <p className="mt-[-20px] mb-[-30px] w-full font-medium text-red-500 text-center">{error}</p>
      )}
      <div className="mt-4">
        <PrimaryBtn btnText="Sign In" type="submit" icon={<IoIosArrowRoundForward size={30} />} />
      </div>
      <NavLink to="/sign-in" className="my-[-10px] text-center text-cyan-400">
        Dont't have an account? Sign up here
      </NavLink>
    </AuthForm>
  );
}
