import {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const List = () => {
	const currentURL = window.location.href;
	return (
		<Menu as="div" className="relative  text-left z-50">
			<div>
				<Menu.Button
					className={classNames(
						currentURL.includes("Care")
							? "inline-flex border-yellow-400 border-b-2 bg-stone-800 text-yellow-400 text-sm font-medium  shadow-sm  mx-2"
							: "relative inline-flex items-center px-4 py-2 border border-transparent bg-stone-800 hover:text-yellow-400 text-sm font-medium rounded-md text-white shadow-sm hover:bg-stone-800 mx-2"
					)}
				>
					Healing-Hands
					<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-stone-800 ring-1 ring-black ring-opacity-5 divide-y divide-yellow-400 focus:outline-none">
					<div className="px-4 py-3 flex  justify-center">
						<p className="text-sm font-medium text-yellow-400 truncate">
							Human Cases:
						</p>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({active}) => (
								<div className="px-4 py-3">
									<Link
										to="/Human-Care/Health"
										className={classNames(
											active ? "text-yellow-400" : "text-white",
											"block px-4 py-2 text-sm"
										)}
									>
										Health-Care
									</Link>
								</div>
							)}
						</Menu.Item>
						<Menu.Item>
							{({active}) => (
								<div className="px-4 py-3">
									<Link
										to="/Human-Care/Work"
										className={classNames(
											active ? "text-yellow-400" : "text-white",
											"block px-4 py-2 text-sm"
										)}
									>
										Work-Assistance
									</Link>
								</div>
							)}
						</Menu.Item>
						<Menu.Item>
							{({active}) => (
								<div className="px-4 py-3">
									<Link
										to="/Human-Care/Education"
										className={classNames(
											active ? "text-yellow-400" : "text-white",
											"block px-4 py-2 text-sm"
										)}
									>
										Education-Assistance
									</Link>
								</div>
							)}
						</Menu.Item>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({active}) => (
								<div className="px-4 py-3 flex  justify-start">
									<Link
										to="/Animal-Care"
										className={classNames(
											active ? "text-yellow-400" : "text-white",
											"block px-4 py-2 text-sm"
										)}
									>
										Animal-Cases
									</Link>
								</div>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
export default List;
