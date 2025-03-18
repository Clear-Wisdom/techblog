export default function Header() {
	return (
		<div className="mx-auto max-w-2xl lg:mx-0">
			<a
				className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl"
				href="/"
			>
				Randy&apos;s Tech
			</a>
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
	);
}
