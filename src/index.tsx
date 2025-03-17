
import PostList from "./components/PostList";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

interface Post {
	id: number;
	title: string;
	mainCategory: string;
	subCategory: string;
	contents: string;
	created_at: string;
}

export default function Index() {

	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<Header />
				<div className="flex justify-start mt-4">
					<Login />
				</div>
				{/* 중앙 구분선 */}
				<div className="mx-auto mt-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
					<div className="grid grid-cols-4 gap-8">
						{/* 사이드 바 */}
						<Sidebar
							selectedCategories={selectedCategories}
							handleCategoryClick={handleCategoryClick}
							handleMainTitleClick={handleMainTitleClick}
						/>
						{/* 게시글 목록 영역 */}
						<main className="lg:col-span-3">
							<PostList posts={posts} />
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
