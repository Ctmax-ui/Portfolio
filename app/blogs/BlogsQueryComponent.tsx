import React, { Dispatch, SetStateAction } from "react";

const BlogsQueryComponent: React.FC<{
  inputQuery: string;
  setInputQuery: Dispatch<SetStateAction<string>>;
  queryFetcherHandler: (e:React.FormEvent) => void;
}> = ({ inputQuery, setInputQuery, queryFetcherHandler }) => {
  return (
    <form
      onSubmit={queryFetcherHandler}
      className="hover:bg-gray-200 dark:hover:bg-slate-900 rounded-md"
    >
      <input
        onChange={(e) => setInputQuery(e.target.value)}
        value={inputQuery}
        name="queryInput"
        id="qInput"
        type="text"
        placeholder="Search Blogs...."
        className="border outline-none rounded-md rounded-e-none border-slate-300 focus:border-slate-500 dark:focus:border-slate-200 bg-transparent  px-3 py-2 "
      />
      <button
        type="submit"
        className="border border-l-0 focus:border-l rounded-md rounded-s-none border-slate-300  focus:border-slate-500 px-3 py-2 hover:bg-gray-200 dark:hover:text-black"
      >
        Search
      </button>
    </form>
  );
};

export default BlogsQueryComponent;
