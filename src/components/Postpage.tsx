import ReactMarkdown from "react-markdown";
import Header from "./Header";
import { getPosts } from "../utils/loadPosts";
import { Post } from "../../types/Post";
import { useParams } from "react-router-dom";

export default function PostPage() {
	const { main, sub, created_at, title } = useParams();
	const id = [main, sub, created_at, title].join("/");

	const allPosts: Post[] = getPosts();
	const post = allPosts.find((p) => p.id === id);

	if (!post) {
		return (
			<div>
				<Header />
				<div className="mx-auto max-w-7xl px-6 lg:px-8 border-t border-gray-200 pt-10">
					<h1 className="text-3xl font-bold">404 - Post Not Found</h1>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<Header />
				<div className="mx-auto mt-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
					<div className="grid grid-cols-1 gap-8">
						<div className="relative mb-6 pb-4">
							<h1 className="text-4xl font-bold text-center">{post.title}</h1>
							<span className="absolute bottom-0 right-0 text-sm text-gray-500">
								{post.created_at}
							</span>
						</div>

						<div className="prose max-w-none text-lg">
							<ReactMarkdown>{post.rawContent}</ReactMarkdown>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
