import { useEffect, useState } from "react";

interface Article { id: string; title: string; excerpt: string; image: string; url: string; }

export default function BlogPreview() {
  const [posts, setPosts] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/blog/recent")
      .then(res => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  if (!posts.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Conseils Beauté</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(p => (
            <a key={p.id} href={p.url} className="block bg-white rounded-lg shadow hover:shadow-lg transition">
              <img src={p.image} className="w-full h-48 object-cover rounded-t-lg" alt={p.title} />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{p.title}</h3>
                <p className="text-gray-600 line-clamp-3">{p.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
