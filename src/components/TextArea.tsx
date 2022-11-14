import { createRef, FunctionalComponent, JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import createIMaskInstance from 'imask';

export const MaskedTextArea: FunctionalComponent<
	Omit<JSX.HTMLAttributes, 'onChange'> & {
		mask: RegExp;
		value: string;
		onChange: (value: string, valueUnmasked: string) => any;
	}
> = ({ mask, value, onChange, ...props }) => {
	const ref = createRef<HTMLTextAreaElement>();
	let iMaskInstance = null;

	useEffect(() => {
		iMaskInstance = ref.current ? createIMaskInstance(ref.current, { mask }) : null;
		console.log(iMaskInstance);
	}, [ref.current]);

	return (
		<textarea
			{...props}
			ref={ref}
			value={value}
			onInput={() => iMaskInstance && onChange(iMaskInstance.value, iMaskInstance.valueUnmasked)}
		/>
	);
};

// export const TextArea: FunctionalComponent<
// 	JSX.HTMLAttributes & {
// 		mask?: string;
// 		value: string;
// 		onAccept: (value: string, mask: string) => any;
// 		onChange: (value: string) => any;
// 	}
// > = ({ pattern, onChange, value, ...props }) => {
// 	const patternRegex = pattern ? new RegExp(`^${pattern}$`) : null;

// 	const handleKeyEvent = (event: ClipboardEvent | KeyboardEvent) => {
// 		if (!patternRegex) return;

// 		const value = (event.target as HTMLTextAreaElement).value ?? '';

// 		console.log({
// 			value,
// 			result: patternRegex.test(value),
// 		});

// 		if (value.length > 0 && !patternRegex.test(value)) {
// 			event.preventDefault();
// 			return false;
// 		}
// 	};

// 	return (
// 		<textarea
// 			{...props}
// 			value={value}
// 			onInput={(event) => onChange((event.target as HTMLTextAreaElement).value)}
// 			onPaste={handleKeyEvent}
// 			onKeyDown={handleKeyEvent}
// 			onKeyUp={handleKeyEvent}
// 		/>
// 	);
// };
