import { Post } from "../../types/Post";

function formatCreatedAt(createdAt: string): string {
	// created_at이 6자리가 아닐 경우 그대로 반환
	if (createdAt.length !== 6) return createdAt;

	const year = 2000 + parseInt(createdAt.slice(0, 2), 10);
	const month = parseInt(createdAt.slice(2, 4), 10);
	const day = parseInt(createdAt.slice(4, 6), 10); 

	const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// 월 예외처리
	const monthName = monthNames[month - 1] || "??";

	return `${String(day).padStart(2, '0')} ${monthName}, ${year}`;
}

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
						<p className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600">
							{post.mainCategory}
						</p>
						<p className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600">
							{post.subCategory}
						</p>
						{formatCreatedAt(post.created_at)}
					</div>
					<div className="group relative">
						<h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
							<a href={`/${post.id}`}>
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
