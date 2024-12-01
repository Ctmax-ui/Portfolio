import Section from "./ui/anim/Section";
import HeroSect from "./ui/components/HeroSect";
import ProfileCard from "./ui/components/profileCard";

const Page: React.FC = () => {
  return (
    <div className="absolute w-full lg:w-[62%] px-2 md:px-5 lg:px-0 lg:left-[30%] flex flex-col justify-center items-center gap-10 pb-[25%] top-[8%]">
      <Section className="h-[570px] w-full block lg:hidden flex justify-center">
        <ProfileCard
          className={
            "max-w-[380px] w-[95%] p-4 h-full glass-gradient border border-black"
          }
        />
      </Section>
      <Section className="border glass-gradient border-black  h-auto lg:h-[570px] w-full ">
        <HeroSect />
      </Section>
      <Section className="border glass-gradient border-black h-[90vh] lg:h-[570px] w-full ">
        about page
      </Section>
      <Section className="border glass-gradient border-black h-[90vh] lg:h-[570px] w-full">
        skills page
      </Section>
    </div>
  );
};

export default Page;
