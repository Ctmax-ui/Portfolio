import React from "react";
import { TiThMenuOutline } from "react-icons/ti";
const navbar = () => {
  return (
    <>
      <div className="border glass-gradient h-[570px] w-[60px] fixed right-5 top-[8%] hidden lg:block rounded-full">
        navbar
      </div>
      <div className="block lg:hidden">
        <button className="h-[40px] w-[40px] fixed top-5 right-5 flex justify-center items-center border glass-gradient rounded-sm ">
          <TiThMenuOutline />
        </button>
      </div>
    </>
  );
};

export default navbar;
