export interface BlogTypes{
    id: string;
    blog_title: string;
    blog_image: string;
    blog_body: { description: string };
    created_at: string;
    updated_at: string;
}
export interface QueryResultRow {
    id: string;
    blog_title: string;
    blog_image: string;
    blog_body: { description: string };
    created_at: string;
    updated_at: string;
  }
  
  export interface blogsType {
    data: QueryResultRow[];
    currentPage: number;
    totalPages: number;
    message: string;
    status: number;
  }