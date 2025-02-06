import React, { useState } from "react";
import FormInput from "../components/smart-components/FormInput";
import PrimaryBtn from "../components/btn/PrimaryBtn";
import { IoIosArrowRoundForward } from "react-icons/io";
import AuthForm from "../components/smart-components/AuthForm";
import useAuthStore from "../hooks/useAuthStore";
import useAuthDB from "../hooks/useAuthDB";
import { NavLink, useNavigate } from "react-router";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { updateIsAuthenticated, updateUsername, error } = useAuthStore(true);
  const { signUp } = useAuthDB();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signUp(user);
    if (response) {
      updateIsAuthenticated(true);
      updateUsername(user.username);
      navigate("/trips");
    }
  };

  return (
    <AuthForm headline="Create your account!" onSubmit={handleSubmit}>
      <FormInput
        value={user.username}
        name="username"
        label="Username"
        minValue={4}
        onChange={handleChange}
      />
      <FormInput
        type="email"
        value={user.email}
        name="email"
        label="Email"
        onChange={handleChange}
      />
      <FormInput
        type="password"
        value={user.password}
        name="password"
        label="Password"
        minValue={8}
        onChange={handleChange}
      />
      {error && (
        <p className="mt-[-20px] mb-[-30px] w-full font-medium text-red-500 text-center">{error}</p>
      )}
      <div className="mt-4">
        <PrimaryBtn btnText="Sign Up" type="submit" icon={<IoIosArrowRoundForward size={30} />} />
      </div>
      <NavLink to="/sign-in" className="my-[-10px] text-center text-cyan-400">
        Already have an account? Sign in here
      </NavLink>
    </AuthForm>
  );
}
