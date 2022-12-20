import createIMaskInstance from 'imask';
import { createRef, FunctionalComponent, JSX } from 'preact';
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
}: JSX.HTMLAttributes & {
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

const TextField: FunctionalComponent<
	Omit<JSX.HTMLAttributes, 'onChange'> & {
		mask: RegExp;
		value: string;
		onChange: (value: string, valueUnmasked: string) => any;
	}
> = ({ mask, value, onChange, ...props }) => {
	const ref = createRef<HTMLInputElement>();

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		console.log('Create imask instance');
		const instance = createIMaskInstance(ref.current, { mask: /.*/ });

		console.log('Register imask handler');
		instance.on('accept', () => {
			console.log('imask accept event', instance.value, instance.unmaskedValue);
			onChange(instance.value, instance.unmaskedValue);
		});

		return () => instance.destroy();
	}, [ref.current]);

	return (
		<input
			{...props}
			type="text"
			ref={ref}
			value={value}
			// onInput={() => {
			// 	console.log(iMask.value);
			// 	iMask && console.log({ value: iMask.value, unmasked: iMask.unmasked });
			// 	iMask && onChange(iMask.value, iMask.valueUnmasked);
			// }}
		/>
	);
};
