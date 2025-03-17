// src/components/PostList.tsx
import { Post } from "../../types/Post"; // 공통 타입을 사용한다면

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
    return (
        <div className="grid grid-cols-2 gap-8">
            {posts.map((post) => (
                <article
                    key={post.id}
                    className="flex max-w-xl flex-col items-start justify-between"
                >
                    <div className="flex items-center gap-x-2 text-xs">
                        {post.created_at}
                        <p className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600">
                            {post.mainCategory}
                        </p>
                        <p className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600">
                            {post.subCategory}
                        </p>
                    </div>
                    <div className="group relative">
                        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                            <a href={post.id}>
                                <span className="absolute inset-0" />
                                {post.title}
                            </a>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                            {post.contents.slice(0, 100)}...
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
}
