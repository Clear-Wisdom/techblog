import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Randy's Tech" },
		{
			name: "description",
			content: "Randy's blog talks about Tech, especially Cloud",
		},
	];
};

const posts = [
	{
		id: 1,
		title: "Boost your conversion rate",
		href: "#",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		date: "Mar 16, 2021",
		category: { mainTitle: "Cloud", subTitle: "AWS", href: "#" },
	},
	{
		id: 2,
		title: "This is example 2",
		href: "#",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		date: "Mar 16, 2020",
		category: { mainTitle: "Cloud", subTitle: "Azure", href: "#" },
	},
	{
		id: 3,
		title: "This is example 3",
		href: "#",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		date: "Mar 16, 2020",
		category: { mainTitle: "Cloud", subTitle: "GCP", href: "#" },
	},
	{
		id: 4,
		title: "Example 4",
		href: "#",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		date: "Mar 16, 2023",
		category: { mainTitle: "Project", subTitle: "Tech Blog", href: "#" },
	},
	{
		id: 5,
		title: "Example 5",
		href: "#",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		date: "Apr 16, 2020",
		category: {
			mainTitle: "Project",
			subTitle: "AWS Cloud School 8th",
			href: "#",
		},
	},
	{
		id: 6,
		title: "testtesttest",
		href: "#",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		date: "Mar 16, 2024",
		category: {
			mainTitle: "Computer Science",
			subTitle: "CS Basics",
			href: "#",
		},
	},
];

export default function Index() {
	// 카테고리 클릭
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

	// 1) 필터링 & 정렬된 배열 만들기
	const filteredPosts = posts
		.filter((post) => {
			// 선택된 카테고리가 하나도 없으면 전체 표시
			if (selectedCategories.length === 0) return true;
			// mainTitle 또는 subTitle 중 하나라도 포함되어 있으면 표시
			return (
				selectedCategories.includes(post.category.mainTitle) ||
				selectedCategories.includes(post.category.subTitle)
			);
		})
		.sort((a, b) => {
			// 날짜 최신순 정렬 (예: "Mar 16, 2024" 형태라 파싱 필요)
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});

	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
						Randy&apos;s Tech
					</h2>
					<p className="mt-2 text-lg/8 text-gray-400">
						Email: seoho38hwang@gmail.com
					</p>
					<a
						className="mt-2 text-lg/8 text-gray-400"
						href="https://www.linkedin.com/in/seoho-hwang-078a23233/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Linkedin Profile
					</a>
				</div>
				{/* 중앙 구분선 */}
				<div className="mx-auto mt-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
					{/* 2단 레이아웃 (사이드바 + 게시글 목록) */}
					<div className="grid grid-cols-4 gap-8">
						{/* 사이드바 영역 */}
						<aside className="lg:col-span-1">
							<nav className="space-y-6">
								{/* Cloud */}
								<div>
									<button
										onClick={() =>
											handleMainTitleClick("Cloud", ["AWS", "Azure", "GCP"])
										}
										className="mb-2 font-semibold text-gray-900 hover:underline"
									>
										Cloud
									</button>
									<ul className="ml-2 space-y-1 text-gray-600">
										<li>
											<button
												onClick={() => handleCategoryClick("AWS")}
												className={`hover:underline ${
													selectedCategories.includes("AWS") ? "font-bold" : ""
												}`}
											>
												AWS
											</button>
										</li>
										<li>
											<button
												onClick={() => handleCategoryClick("Azure")}
												className={`hover:underline ${
													selectedCategories.includes("Azure")
														? "font-bold"
														: ""
												}`}
											>
												Azure
											</button>
										</li>
										<li>
											<button
												onClick={() => handleCategoryClick("GCP")}
												className={`hover:underline ${
													selectedCategories.includes("GCP") ? "font-bold" : ""
												}`}
											>
												GCP
											</button>
										</li>
									</ul>
								</div>

								{/* Project */}
								<div>
									<button
										onClick={() =>
											handleMainTitleClick("Cloud", ["AWS", "Azure", "GCP"])
										}
										className="mb-2 font-semibold text-gray-900 hover:underline"
									>
										Project
									</button>
									<ul className="ml-2 space-y-1 text-gray-600">
										<li>
											<button
												onClick={() => handleCategoryClick("Tech Blog")}
												className={`hover:underline ${
													selectedCategories.includes("Tech Blog")
														? "font-bold"
														: ""
												}`}
											>
												Tech Blog
											</button>
										</li>
										<li>
											<button
												onClick={() =>
													handleCategoryClick("AWS Cloud School 8th")
												}
												className={`hover:underline ${
													selectedCategories.includes("AWS Cloud School 8th")
														? "font-bold"
														: ""
												}`}
											>
												AWS Cloud School 8th
											</button>
										</li>
									</ul>
								</div>

								{/* Computer Science */}
								<div>
									<button
										onClick={() =>
											handleMainTitleClick("Cloud", ["AWS", "Azure", "GCP"])
										}
										className="mb-2 font-semibold text-gray-900 hover:underline"
									>
										Computer Science
									</button>
									<ul className="ml-2 space-y-1 text-gray-600">
										<li>
											<button
												onClick={() => handleCategoryClick("CS Basics")}
												className={`hover:underline ${
													selectedCategories.includes("CS Basics")
														? "font-bold"
														: ""
												}`}
											>
												CS Basics
											</button>
										</li>
										{/* 필요하다면 추가 항목을 넣으세요 */}
									</ul>
								</div>
							</nav>
						</aside>
						{/* 게시글 목록 영역 */}
						<main className="lg:col-span-3">
							<div className="grid grid-cols-2 gap-8">
								{filteredPosts.map((post) => (
									<article
										key={post.id}
										className="flex max-w-xl flex-col items-start justify-between"
									>
										<div className="flex items-center gap-x-4 text-xs">
											{post.date}
											<a
												href={post.category.href}
												className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
											>
												{post.category.mainTitle}
											</a>
											<a
												href={post.category.href}
												className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
											>
												{post.category.subTitle}
											</a>
										</div>
										<div className="group relative">
											<h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
												<a href={post.href}>
													<span className="absolute inset-0" />
													{post.title}
												</a>
											</h3>
											<p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
												{post.description}
											</p>
										</div>
									</article>
								))}
							</div>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}
