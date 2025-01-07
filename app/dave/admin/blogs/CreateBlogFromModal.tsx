import { Button } from "@/components/ui/button";
import BlogForm from "./BlogForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function CreateBlogFromModal() {
  return (
    <>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Blogs</Button>
      </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Blog</DialogTitle>
            <DialogDescription>
              Fill out the form. Click submit when you`re done.
            </DialogDescription>
          </DialogHeader>
          <BlogForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
