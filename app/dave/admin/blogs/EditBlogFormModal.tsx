import BlogEditForm from "./BlogEditForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import { QueryResultRow } from "@vercel/postgres";

const EditBlogFormModal = ({
  blog,
  setUpdateState,
  setToastType,
  setToastMessage
}: {
  blog: QueryResultRow;
  setUpdateState: React.Dispatch<React.SetStateAction<string>>;
  setToastType:React.Dispatch<React.SetStateAction<"success" | "error" | "info" | "warning">>
  setToastMessage:React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="border px-2 py-2 hover:bg-blue-600 hover:text-white transition-all rounded-md hover:border-blue-500">
            <FaEdit />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Blog : {blog.blog_title}</DialogTitle>
            <DialogDescription>
              Fill out the form. Click submit when you`re done.
            </DialogDescription>
          </DialogHeader>
          <BlogEditForm blog={blog} setToastType={setToastType} setUpdateState={setUpdateState} setToastMessage={setToastMessage} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditBlogFormModal;
