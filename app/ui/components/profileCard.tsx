"use client";
import Image from "next/image";
import Typical from "react-typical";
import Link from "next/link";
import { MdOutlineOpenInNew } from "react-icons/md";

const ProfileCard = ({ className }: { className?: string }) => {
  const typicalOptions = [
    "Proficient In Frontend.",
    1500,
    "Proficient In Backend.",
    1500,
    "Proficient In MERN.",
    1500,
    "And above all, An Programmer.",
    2000,
  ];

  return (
    <section className={` ${className}`}>
      <div className="w-full h-full max-w-sm mx-auto ">
        <div className="h-full">
          <div className="flex h-full flex-col justify-between  items-center space-y-4">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border border-slate-800">
              <Image
                src="/pic-two.png"
                alt="Profile picture"
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold">Debjeet Biswas</h2>
              <p className="text-emerald-600">
                <Typical
                  steps={typicalOptions}
                  loop={Infinity}
                  wrapper="span"
                />
              </p>
            </div>

            <div className="w-full space-y-2">
              <div className="flex justify-between py-2">
                <span className="text-gray-800">Residence:</span>
                <span>
                  <b>India</b>
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-800">City:</span>
                <span>Kolkata</span>
              </div>
            </div>


            <div className="w-full">
              <h3 className="text-lg font-semibold mb-4">Skills</h3>
              <div className="flex gap-4 justify-evenly ">
                {[
                  { name: "JavaScript", value: 90 },
                  { name: "Python", value: 40 },
                  { name: "PHP", value: 50 },
                ].map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center scale-[.8] hover:scale-[.85] transition-all cursor-default"
                  >
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-[8px] border-[#262a29]"></div>
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-white"
                          strokeDasharray={`${
                            (skill.value / 100) * 175.9
                          } 175.9`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm">
                        {skill.value}%
                      </div>
                    </div>
                    <span className="mt-2 text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/Resume.pdf" target="_blank" className="w-full text-nowrap flex justify-center items-center border border-slate-800 rounded-md py-3 mt-auto hover:bg-slate-800 hover:text-white transition-all">
                Download Resume{" "}
                <span className="ps-3">
                  <MdOutlineOpenInNew />
                </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
