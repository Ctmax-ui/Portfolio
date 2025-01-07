import CreateProjectFromModal from "./CreateProjectFromModal";
import ProjectTable from "./ProjectTable";

const page = () => {

  return (
    <div className="m=">
      <div className="flex justify-end mb-2">
        <CreateProjectFromModal />
      </div>
      <div className="">
        <ProjectTable />
      </div>
    </div>
  );
};

export default page;
