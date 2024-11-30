import Section from "./ui/anim/Section";

const Page: React.FC = () => {

  return (
    <div className="absolute w-[65%] right-28 ps-[80px] flex flex-col gap-10 pb-8 ">
      <Section className="border glass-gradient border-black h-[90vh] w-[95%]" >
        hero page
      </Section>
      <Section className="border glass-gradient border-black h-[90vh] w-[95%]">
        about page
      </Section>
      <Section className="border glass-gradient border-black h-[90vh] w-[95%]">
        skills page
      </Section>
      <div>
      
    </div>
    </div>
  );
};

export default Page;
