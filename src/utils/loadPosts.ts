import removeMd from "remove-markdown";
import { Post } from "../../types/Post";

const markdownFiles = import.meta.glob("../posts/**/*.md", {
	eager: true,
	query: "?raw",
    import: "default",
});

export function getPosts(): Post[] {
	return Object.entries(markdownFiles).map(([filePath, fileContent]) => {
		const parts = filePath.split("/");

        const id = parts.slice(2, 6).join("/").replace(/\.md$/, "");
		const mainCategory = parts[2];
		const subCategory = parts[3];
		const created_at = parts[4];
		const rawFileName = parts[5];
		const title = rawFileName.replace(/\.md$/, "");

		const rawContent = fileContent as string;
		const cleanedContent = removeMd(rawContent);
		const contents = cleanedContent.slice(0, 100) || "No content";

		console.log(rawContent);

		return {
			id,
			mainCategory,
			subCategory,
			created_at,
			title,
			contents,
			rawContent,
		};
	});
}
