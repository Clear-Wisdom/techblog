import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { supabase } from "../utils/supabase.client";
import Markdown from "react-markdown";
import Header from "../components/Header";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export const meta: MetaFunction = () => {
	return [
		{ title: "Writing page" },
		{
			name: "description",
			content: "Randy's blog, writing some posts.",
		},
	];
};

export default function WriteRoute() {
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [mainCategory, setMainCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [contents, setContents] = useState("");

	// 취소 버튼
	function handleCancel() {
		navigate("/"); // 홈으로 돌아가기
	}

	// 저장 버튼
	async function handleSave() {
		//DB에 저장하기
		const { error } = await supabase
			.from("posts")
			.insert([{ title, mainCategory, subCategory, contents }])
			.single();

		if (error) {
			alert("Failed to save the post");
		}

		navigate("/");
	}

	// Drag & Drop 핸들러
	async function handleDrop(e: React.DragEvent<HTMLTextAreaElement>) {
		e.preventDefault();

		// 1. 현재 로그인 세션 확인
		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (!session) {
			alert("You must be logged in to upload images.");
			return;
		}
		const uid = session.user.identities?.[0].id;

		// 3. 드래그앤드롭한 파일 처리
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const file = e.dataTransfer.files[0];
			// 파일 이름의 공백을 하이픈으로 대체하여 URL-safe 파일 이름 생성
			const sanitizedFileName = `${Date.now()}-${file.name.replace(
				/\s+/g,
				"-"
			)}`;

			// Supabase Storage에 파일 업로드 (metadata의 owner에 uid를 저장)
			const { data, error } = await supabase.storage
				.from("images")
				.upload(sanitizedFileName, file, {
					metadata: { owner: uid },
				});
			if (error) {
				alert("Upload failed: " + error.message);
				return;
			}

			// public URL 받아오기
			const {
				data: { publicUrl },
			} = supabase.storage.from("images").getPublicUrl(sanitizedFileName);

			// 마크다운 이미지 문법으로 삽입
			setContents((prev) => prev + `\n![${file.name}](${publicUrl})\n`);
			e.dataTransfer.clearData();
		}
	}

	function handleDragOver(e: React.DragEvent<HTMLTextAreaElement>) {
		e.preventDefault();
	}

	return (
		<div className="bg-white py-24 sm:py-32">
			{/* 상단 레이아웃 (Header 등) */}
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<Header />
				{/* 중앙 구분선 */}
				<div className="mx-auto mt-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16" />
				{/* 글쓰기 폼 */}
				<div className="grid grid-cols-2 gap-4">
					{/* 왼쪽: 입력 */}
					<div>
						<div className="mb-4 flex items-center">
							<label htmlFor="title" className="font-semibold mr-2">
								Title:
							</label>
							<input
								id="title"
								className="border-b border-gray-300 focus:outline-none flex-1"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="mainCategory" className="font-semibold mr-2">
								Main Category:
							</label>
							<input
								id="mainCategory"
								className="border-b border-gray-300 focus:outline-none flex-1"
								value={mainCategory}
								onChange={(e) => setMainCategory(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="subCategory" className="font-semibold mr-2">
								Sub Category:
							</label>
							<input
								id="subCategory"
								className="border-b border-gray-300 focus:outline-none flex-1"
								value={subCategory}
								onChange={(e) => setSubCategory(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="contents" className="block font-semibold mb-2">
								Contents (Markdown):
							</label>
							<textarea
								id="contents"
								className="border-l p-1 w-full h-60"
								value={contents}
								onChange={(e) => setContents(e.target.value)}
								onDrop={handleDrop}
								onDragOver={handleDragOver}
							/>
						</div>

						{/* 취소 / 저장 버튼 */}
						<div className="flex gap-2">
							<button onClick={handleCancel} className="px-3 py-1 bg-gray-300">
								취소
							</button>
							<button
								onClick={handleSave}
								className="px-3 py-1 bg-blue-500 text-white"
							>
								저장
							</button>
						</div>
					</div>

					{/* Preview */}
					<div className="border p-2 h-full overflow-auto">
						<h3 className="font-semibold mb-2">Preview:</h3>
						<Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
							{contents}
						</Markdown>
					</div>
				</div>
			</div>
		</div>
	);
}
