import { Post } from "../../types/Post";

interface SidebarProps {
    allPosts: Post[];
    selectedCategories: string[];
    handleCategoryClick: (cat: string) => void;
    handleMainTitleClick: (main: string, subs: string[]) => void;
}

export default function Sidebar({
    allPosts,
    selectedCategories,
    handleCategoryClick,
    handleMainTitleClick,
}: SidebarProps) {
    // 1) 모든 mainCategory를 중복 없이 추출
    const mainCategories = Array.from(
        new Set(allPosts.map((post) => post.mainCategory))
    );

    // 2) mainCategory별 subCategory 목록 구성
    const subCategoriesByMain: Record<string, string[]> = {};
    allPosts.forEach((post) => {
        const main = post.mainCategory;
        if (!subCategoriesByMain[main]) {
            subCategoriesByMain[main] = [];
        }
        if (!subCategoriesByMain[main].includes(post.subCategory)) {
            subCategoriesByMain[main].push(post.subCategory);
        }
    });

    return (
        <aside className="lg:col-span-1">
            <nav className="space-y-6">
                {mainCategories.map((main) => (
                    <div key={main}>
                        <button
                            onClick={() =>
                                handleMainTitleClick(
                                    main,
                                    subCategoriesByMain[main]
                                )
                            }
                            className="mb-2 font-semibold text-gray-900 hover:underline"
                        >
                            {main}
                        </button>
                        <ul className="ml-2 space-y-1 text-gray-600">
                            {subCategoriesByMain[main].map((sub) => (
                                <li key={sub}>
                                    <button
                                        onClick={() => handleCategoryClick(sub)}
                                        className={`hover:underline ${
                                            selectedCategories.includes(sub)
                                                ? "font-bold"
                                                : ""
                                        }`}
                                    >
                                        {sub}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
