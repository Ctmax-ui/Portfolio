import BlogTable from "./BlogTable";
import CreateBlogFromModal from "./CreateBlogFromModal";
const Page = () => {
  return (
    <div className="m=">
      <div className="flex justify-end mb-4">
        <CreateBlogFromModal />
      </div>
      <div className="">
        <BlogTable />
      </div>
    </div>
  );
};
export default Page;