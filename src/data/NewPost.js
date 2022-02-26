export const checkBoxes = [
	{
		type: 'checkbox',
		name: 'Work',
		placeholder: '',
		class:
			'h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500',
	},
	{
		type: 'checkbox',
		name: 'Education',
		placeholder: '',
		class:
			'h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500',
	},
	{
		type: 'checkbox',
		name: 'Health',
		placeholder: '',
		class:
			'h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500',
	},
]
export const form = [
	{
		labelClass:
			"lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600",
		type: 'text',
		name: 'Name',
		placeholder: 'First name - Last name',
		class:
			'shadow-lg box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md',
		functionForChange: 'onChange={}',
		value: 'Name',
	},
	{
		labelClass:
			"lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600",
		type: 'text',
		name: 'Age',
		placeholder: '',
		class:
			'shadow-lg box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md',
	},
	{
		labelClass:
			"lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600",
		type: 'text',
		name: 'Number',
		placeholder: '',
		class:
			'shadow-lg box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md',
	},

	{
		labelClass:
			"lg:text-1.5xl after:content-['*'] after:ml-1 after:text-red-600",
		type: 'text',
		name: 'Address',
		placeholder: 'City-street address',
		class:
			'shadow-lg box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md',
	},
	{
		labelClass: '',
		type: 'email',
		name: 'Email',
		placeholder: '(Optional)',
		class:
			'shadow-lg box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md',
	},
]

export const learning = [
	{level: '--Select here--'},
	{level: 'no education'},
	{level: 'Grade1-9'},
	{level: 'Secondary'},
	{level: 'Bachelors'},
	{level: 'Technical School'},
]
