interface SidebarProps {
	selectedCategories: string[];
	handleCategoryClick: (cat: string) => void;
	handleMainTitleClick: (main: string, subs: string[]) => void;
}

export default function Sidebar({
	selectedCategories,
	handleCategoryClick,
	handleMainTitleClick,
}: SidebarProps) {
	return (
		<aside className="lg:col-span-1">
			<nav className="space-y-6">
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
									selectedCategories.includes("Azure") ? "font-bold" : ""
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
							handleMainTitleClick("Project", [
								"Tech Blog",
								"AWS Cloud School 8th",
							])
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
									selectedCategories.includes("Tech Blog") ? "font-bold" : ""
								}`}
							>
								Tech Blog
							</button>
						</li>
						<li>
							<button
								onClick={() => handleCategoryClick("AWS Cloud School 8th")}
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
							handleMainTitleClick("Computer Science", ["CS Basics"])
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
									selectedCategories.includes("CS Basics") ? "font-bold" : ""
								}`}
							>
								CS Basics
							</button>
						</li>
					</ul>
				</div>
			</nav>
		</aside>
	);
}
