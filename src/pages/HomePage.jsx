import React from "react";
import PrimaryBtn from "../components/btn/PrimaryBtn";
import SecondaryBtn from "../components/btn/SecondaryBtn";
import DangerBtn from "../components/btn/DangerBtn";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoArrowForwardSharp } from "react-icons/io5";

export default function HomePage() {
  return (
    <div className="home-page">
      <h1 className="home-page-header">Travel Planer</h1>
      <ul className="home-page-contributor-list">
        <li>ozzoDev</li>
        <li>shema</li>
        <li>Bigbigboymanboy</li>
      </ul>
      <div className="space-y-2 p-6">
        <PrimaryBtn btnText="Primary" icon={<IoMdCheckmark size={24} />}></PrimaryBtn>
        <SecondaryBtn btnText="Secondary" icon={<IoArrowForwardSharp size={24} />} />
        <DangerBtn btnText="Danger" icon={<FaRegTrashCan size={24} />} />
      </div>
    </div>
  );
}
