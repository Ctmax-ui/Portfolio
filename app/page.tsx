import Section from "./ui/anim/Section";
import AboutSection from "./ui/components/AboutSection";
import BlogSection from "./ui/components/BlogSection";
import ContactSection from "./ui/components/ContactSection";
import HeroSect from "./ui/components/HeroSect";
import ProfileCard from "./ui/components/profileCard";
import ProjectsSection from "./ui/components/ProjectsSection";
import SkillsSection from "./ui/components/SkillCategory ";
import WorkExperienceSection from "./ui/components/WorkExpSection";
import Navbar from "@/app/ui/components/navbar";
import CanvasAnimation from "./ui/anim/CanvasAnim";

const Page = () => {
  return (
    <>
      <CanvasAnimation />
      <div className="py-8 relative h-svh w-svh container mx-auto">
        <ProfileCard
          className={
            "h-[570px] w-[25%] max-w-[400px] fixed left-10 top-[8%] p-5 glass-gradient hidden lg:block"
          }
        />

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
          <Section className="border glass-gradient border-black h-auto lg:h-[570px] w-full ">
            <AboutSection />
          </Section>
          <Section className="border glass-gradient border-black h-auto xl:h-[570px] w-full">
            <SkillsSection />
          </Section>
          <Section className="border glass-gradient border-black h-auto xl:h-[570px] w-full">
            <WorkExperienceSection />
          </Section>
          <Section className="border glass-gradient border-black h-auto w-full">
            <ProjectsSection />
          </Section>
          <Section className="border glass-gradient border-black h-auto w-full">
            <BlogSection />
          </Section>
          <Section className="border glass-gradient border-black h-auto xl:h-[570px] w-full">
            <ContactSection />
          </Section>
        </div>

        <Navbar />
      </div>
    </>
  );
};

export default Page;
