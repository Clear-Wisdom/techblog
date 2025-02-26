import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { supabase } from "~/utils/supabase.client";
import PostList from "~/components/PostList";
import Sidebar from "~/components/Sidebar";
import Header from "~/components/Header";
import Login from "~/components/Login";

export const meta: MetaFunction = () => {
	return [
		{ title: "Randy's Tech" },
		{
			name: "description",
			content: "Randy's blog talks about Tech, especially Cloud",
		},
	];
};

interface Post {
	id: number;
	title: string;
	mainCategory: string;
	subCategory: string;
	contents: string;
	created_at: string;
}

export default function Index() {
	// DB에서 데이터 불러오기
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		async function fetchPosts() {
			const { data, error } = await supabase
				.from("posts")
				.select("id, title, mainCategory, subCategory, contents, created_at")
				.order("id", { ascending: false });
			if (!error && data) {
				setPosts(data);
			}
		}
		fetchPosts();
	}, []);

	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	function handleCategoryClick(category: string) {
		setSelectedCategories(
			(prev) =>
				prev.includes(category)
					? prev.filter((c) => c !== category) // 이미 선택된 경우 제거
					: [...prev, category] // 선택 안 된 경우 추가
		);
	}

	function handleMainTitleClick(main: string, subTitles: string[]) {
		// 만약 해당 그룹의 모든 subTitle이 선택되어 있다면 모두 해제, 아니면 모두 선택
		if (subTitles.every((sub) => selectedCategories.includes(sub))) {
			setSelectedCategories((prev) =>
				prev.filter((item) => !subTitles.includes(item))
			);
		} else {
			setSelectedCategories((prev) => {
				const newSet = new Set(prev);
				subTitles.forEach((sub) => newSet.add(sub));
				return Array.from(newSet);
			});
		}
	}

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
