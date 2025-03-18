import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./index";
import PostPage from "./components/Postpage";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/:main/:sub/:created_at/:title" element={<PostPage />} />
			</Routes>
		</BrowserRouter>
	);
}
