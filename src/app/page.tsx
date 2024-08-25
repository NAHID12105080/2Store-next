import { getPosts } from "@/server/actions/get-posts";

export default async function Home() {
  const { error, successful } = await getPosts();
  if (error) {
    return <div>{error}</div>;
  }

  if (successful) {
    return (
      <div>
        {successful.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
          </div>
        ))}
      </div>
    );
  }
}
