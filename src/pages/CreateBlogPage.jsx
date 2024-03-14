import CreateBlogForm from "../components/form/CreateBlogForm";

export default function CreateBlogPage() {
  return (
    <main>
      <section>
        <div className='container'>
          <h2 className='text-3xl font-bold mb-6 text-center'>Create A Blog</h2>
          {/* <!-- Form Input field for creating Blog Post --> */}
          <CreateBlogForm />
        </div>
      </section>
    </main>
  );
}
