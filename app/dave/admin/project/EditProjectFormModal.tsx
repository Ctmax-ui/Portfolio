import ProjectEditForm from "./ProjectEditForm";
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

const EditProjectFormModal = ({
  project,
  setUpdateState,
  setToastType,
  setToastMessage,
}: {
  project: QueryResultRow;
  setUpdateState: React.Dispatch<React.SetStateAction<string>>;
  setToastType: React.Dispatch<
    React.SetStateAction<"success" | "error" | "info" | "warning">
  >;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
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
            <DialogTitle>Edit Project : {project.blog_title}</DialogTitle>
            <DialogDescription>
              Fill out the form. Click submit when you`re done.
            </DialogDescription>
          </DialogHeader>
          <ProjectEditForm
            project={project}
            setToastType={setToastType}
            setUpdateState={setUpdateState}
            setToastMessage={setToastMessage}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProjectFormModal;
