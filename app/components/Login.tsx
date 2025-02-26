import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.client";
import { useNavigate } from "@remix-run/react";

interface UserInfo {
	email: string;
	name: string;
	uid: string | undefined;
	isRoot: boolean;
}

export default function Login() {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	// 컴포넌트가 마운트되면 세션을 확인
	useEffect(() => {
		checkSession();
	}, []);

	async function checkSession() {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (session) {
			// Supabase Auth가 생성한 세션에서 사용자 정보를 가져옴
			const email = session.user.user_metadata.email as string;
			const name = session.user.user_metadata.name as string;
			const uid = session.user.identities?.[0].id;

			// DB의 users 테이블에서 해당 uid로 사용자 조회
			const { data: dbUser, error: dbError } = await supabase
				.from("users")
				.select("email, name, uid, is_root")
				.eq("uid", uid)
				.single();

			let isRoot = false;
			if (!dbError && dbUser) {
				// 이메일, 이름, uid가 모두 일치하는 경우 isRoot를 설정
				if (
					dbUser.email === email &&
					dbUser.name === name &&
					dbUser.uid === uid
				) {
					isRoot = dbUser.is_root;
				}
			}
			setUserInfo({ email, name, uid, isRoot });
		}
	}

	async function handleLogin() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
		});
	}

	// async function getUser() {
	// 	const { data, error } = await supabase.auth.getSession();
	// 	console.log(data.session?.user.user_metadata.email);
	// 	console.log(data.session?.user.user_metadata.name);
	//  console.log(data.session?.user.identities.0.id); // uid
	// }

	// when logout -> data.session == null;

	async function handleLogout() {
		await supabase.auth.signOut();
		setUserInfo(null);
	}

	return (
		<div>
			{/* 로그인하지 않은 경우 */}
			{!userInfo && (
				<button
					onClick={handleLogin}
					className="px-4 py-2 bg-blue-500 text-white"
				>
					Login with Google
				</button>
			)}
			{/* 로그인한 경우 */}
			{userInfo && (
				<div>
					<div className="flex items-center gap-2">
						<span>Nice to meet you, {userInfo.name}!</span>
					</div>
					<div className="mt-3">
						{userInfo.isRoot && (
							<button
								onClick={() => navigate("/write")}
								className="px-2 py-1 bg-green-500 text-white rounded mr-3"
							>
								Write a post
							</button>
						)}
						<button
							onClick={handleLogout}
							className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:text-gray-200 hover:bg-gray-600"
						>
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
