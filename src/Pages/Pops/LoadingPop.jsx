import {Fragment, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/outline";

export default function Example(props) {
	const [open, setOpen] = useState(true);

	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-[51] inset-0 overflow-y-auto"
				initialFocus={cancelButtonRef}
				onClose={setOpen}
			>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-[#292524] bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					></span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-[#292524] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
							<div className="p-6">
								<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#F2B400]">
									<CheckIcon
										className="h-6 w-6 text-[#292524]"
										aria-hidden="true"
									/>
								</div>
								<div className="mt-3 text-center sm:mt-5">
									<Dialog.Title
										as="h3"
										className="text-lg leading-6 font-bold underline text-white "
									>
										{props.name} Form
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-200">
											Please make sure to fill the case's information in detail.
										</p>
									</div>
								</div>
							</div>

							<button
								type="button"
								className="mt-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 rounded-md text-[#292524] font-bold bg-[#f2b400] hover:bg-[#d8a823] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f2b400]"
								onClick={() => setOpen(false)}
							>
								Okay
							</button>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
