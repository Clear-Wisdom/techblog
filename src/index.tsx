import PostList from "./components/PostList";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";
import { getPosts } from "./utils/loadPosts";
import { Post } from "../types/Post";

export default function Index() {
	const allPosts: Post[] = getPosts();
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	// 카테고리(단일) 클릭 시 토글
	function handleCategoryClick(cat: string) {
		setSelectedCategories((prev) =>
			prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
		);
	}

	// 메인 카테고리 클릭 시, 해당 subCategory 전체를 토글하는 예시
	function handleMainTitleClick(main: string, subs: string[]) {
		const allSelected = subs.every((sub) => selectedCategories.includes(sub));
		if (allSelected) {
			// 이미 모든 하위 카테고리가 선택된 상태면, 해제
			setSelectedCategories((prev) =>
				prev.filter((cat) => !subs.includes(cat))
			);
		} else {
			// 하나라도 선택 안 되어 있으면 모두 선택
			setSelectedCategories((prev) => {
				const newSet = new Set(prev);
				subs.forEach((sub) => newSet.add(sub));
				return Array.from(newSet);
			});
		}
	}

	// 선택된 카테고리에 따라 필터링
	const filteredPosts = allPosts.filter((post) => {
		// 만약 selectedCategories가 비어있다면 => 모든 글 표시
		if (selectedCategories.length === 0) return true;
		// mainCategory 또는 subCategory가 선택된 카테고리에 포함되면 표시
		return (
			selectedCategories.includes(post.mainCategory) ||
			selectedCategories.includes(post.subCategory)
		);
	});

	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<Header />
				<div className="mx-auto mt-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
					<div className="grid grid-cols-4 gap-8">
						{/* Sidebar에 allPosts 포함 */}
						<Sidebar
							allPosts={allPosts}
							selectedCategories={selectedCategories}
							handleCategoryClick={handleCategoryClick}
							handleMainTitleClick={handleMainTitleClick}
						/>
						<main className="lg:col-span-3">
							<PostList posts={filteredPosts} />
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
