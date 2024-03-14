import BlogContainer from "../components/blogs/BlogContainer";
import SideBar from "../components/blogs/sidebar/SideBar";

export default function HomePage() {
  return (
    <>
      <main>
        {/* <!-- Begin Blogs --> */}
        <section>
          <div className='container'>
            <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
              {/* <!-- Blog Contents --> */}
              <BlogContainer />
              {/* <!-- Sidebar --> */}
              <SideBar />
            </div>
          </div>
        </section>
        {/* <!-- End Blogs --> */}
      </main>
    </>
  );
}
