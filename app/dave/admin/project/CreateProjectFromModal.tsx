import { Button } from "@/components/ui/button";
import ProjectForm from "./ProjectForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function CreateProjectFromModal() {
  return (
    <>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Project</Button>
      </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Project</DialogTitle>
            <DialogDescription>
              Fill out the form. Click submit when you`re done.
            </DialogDescription>
          </DialogHeader>
          <ProjectForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
