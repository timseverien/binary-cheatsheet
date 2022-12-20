import createIMaskInstance, { AnyMaskedOptions } from 'imask';
import { createRef, FunctionalComponent, JSX, RefObject } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { BinaryString } from '../../functions/binaryString';
import { HexadecimalString } from '../../functions/hexadecimalString';
import { IntegerString } from '../../functions/integerString';
import styles from './styles.module.css';

export enum InputType {
	Integer,
	Hexadecimal,
	Unicode,
}

export const BinaryInput = ({
	value,
	onChange,
	...props
}: Omit<JSX.HTMLAttributes, 'onChange' | 'value'> & {
	value: BinaryString;
	onChange: (value: BinaryString) => any;
}) => (
	<TextField
		{...props}
		class={`${props.class ?? ''} ${styles.inputBinary}`}
		mask={/^[01]{1,8}(\s?[01]{0,8})*$/}
		value={value}
		onChange={(value: string) => onChange(value as BinaryString)}
	/>
);

export const HexadecimalInput = ({
	value,
	onChange,
}: {
	value: HexadecimalString;
	onChange: (value: HexadecimalString) => any;
}) => (
	<TextField
		mask={/^[0-9a-f]*$/i}
		value={value}
		onChange={(value: string) => onChange(value as HexadecimalString)}
	/>
);

export const IntegerInput = ({
	value,
	onChange,
	...props
}: Omit<JSX.HTMLAttributes, 'onChange'> & {
	value: IntegerString;
	onChange: (value: IntegerString) => any;
}) => (
	<TextField
		{...props}
		mask={/^[0-9]*$/i}
		value={value}
		onChange={(value: string) => onChange(value as IntegerString)}
	/>
);

function useIMask(options: AnyMaskedOptions, initialValue: string): [RefObject<any>, string] {
	const ref = createRef();
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		if (!ref) return;

		const instance = createIMaskInstance(ref.current, options);
		instance.on('accept', () => setValue(instance.value));
	}, [ref, options]);

	return [ref, value];
}

const TextField: FunctionalComponent<
	Omit<JSX.HTMLAttributes, 'onChange'> & {
		mask: RegExp;
		value: string;
		onChange: (value: string) => any;
	}
> = ({ mask, value, onChange, ...props }) => {
	const [ref, inputValue] = useIMask({ mask }, value);

	useEffect(() => onChange(inputValue), [inputValue]);

	return <input {...props} ref={ref} value={value} />;
};
