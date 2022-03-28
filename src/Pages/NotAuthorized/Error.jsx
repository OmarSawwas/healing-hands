import Logo from "../../Images/omar logo.png";
const Error = () => {
	return (
		<>
			<div className="min-h-full pt-16 pb-12 flex flex-col bg-[#3a3534]">
				<main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex-shrink-0 flex justify-center">
						<a href="/" className="inline-flex">
							<span className="sr-only">Healing Hands</span>
							<img className="h-36 w-36" src={Logo} alt="" />
						</a>
					</div>
					<div className="py-16">
						<div className="text-center">
							<h1 className="mt-2 text-4xl font-extrabold text-red-500 tracking-tight sm:text-5xl">
								Page authorized only for admins
							</h1>
							<p className="mt-2 text-base text-gray-100">
								You are not allowed to be here
							</p>
							<div className="mt-6">
								<a
									href="/"
									className="text-base font-medium text-indigo-500 hover:text-indigo-400"
								>
									Go back home<span aria-hidden="true"> &rarr;</span>
								</a>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};
export default Error;
