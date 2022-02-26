import React from "react";
import classnames from "classnames";

const Wrapper = ({loading, children, classes}, restProp) => {
	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 my-5" />
			</div>
		);
	}

	return (
		<div {...restProp} className={classnames("min-h-full p-0 m-0", classes)}>
			{children}
		</div>
	);
};

export default Wrapper;
