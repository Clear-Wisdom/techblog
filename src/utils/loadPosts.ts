// src/utils/loadPosts.ts
interface Post {
    id: string;
    mainCategory: string;
    subCategory: string;
    created_at: string;
    title: string;
    contents: string;
}

// Vite 4 이상에서는 import.meta.glob() 시점에 { eager: true } 옵션을 사용하면
// 파일 내용을 바로 가져올 수 있습니다. (MDX가 아니라 .md 파일이라면 별도 처리 필요)
const markdownFiles = import.meta.glob("../../posts/**/*.md", { eager: true });

export function getPosts(): Post[] {
    return Object.entries(markdownFiles).map(([filePath, fileModule]) => {
        // filePath 예시: /posts/Cloud/AWS/240219/test.md
        // 원하는 형태로 path를 잘라서 mainCategory, subCategory, created_at, title을 추출
        const parts = filePath.split("/");
        // parts 예시: ["..", "posts", "Cloud", "AWS", "240219", "test.md"]

        // 폴더 구조를 기준으로 매핑:
        const mainCategory = parts[2];
        const subCategory = parts[3];
        const created_at = parts[4];
        const rawFileName = parts[5];

        // 파일 이름에서 .md 확장자를 떼고 title로 사용
        const title = rawFileName.replace(/\.md$/, "");

        // fileModule이 어떤 형태로 불러와지는지 확인해야 합니다.
        // - 보통 raw string으로 불러오거나, default export로 내용이 들어있을 수 있음
        //   (Vite/rollup-plugin-markdown 설정에 따라 다름)
        //   예: const contents = (fileModule as any).default;
        // - MDX를 사용한다면, React 컴포넌트로 불러올 수도 있음
        // 여기서는 단순히 raw 문자열로 가정
        const contents = (fileModule as any).default || "No content";

        return {
            id: filePath, // 고유 식별자로 경로를 임시 사용
            mainCategory,
            subCategory,
            created_at,
            title,
            contents,
        };
    });
}
