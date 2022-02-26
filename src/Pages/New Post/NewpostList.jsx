import {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const List = () => {
	return (
		<Menu as="div" className="relative text-left z-50">
			<div>
				<Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-gray-100 focus:ring-indigo-500">
					New-Post
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
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
					<div className="px-4 py-3 flex  justify-center">
						<p className="text-sm font-medium text-gray-900 truncate">
							Human Cases:
						</p>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({active}) => (
								<Link
									to="/Human-Care/Health-Form"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm"
									)}
								>
									Health-Care Form
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({active}) => (
								<Link
									to="/Human-Care/Work-Form"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm"
									)}
								>
									Work-Assistance Form
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({active}) => (
								<Link
									to="/Human-Care/Education-Form"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm"
									)}
								>
									Education-Assistance Form
								</Link>
							)}
						</Menu.Item>
					</div>
					<div className="py-1">
						<div className="px-4 py-3">
							<Menu.Item>
								{({active}) => (
									<div className="px-4 py-3 flex justify-center">
										<Link
											to="/Animal-Care-Form"
											className={classNames(
												active ? "bg-gray-100 text-gray-900" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
										>
											Animal Cases
										</Link>
									</div>
								)}
							</Menu.Item>
						</div>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
export default List;