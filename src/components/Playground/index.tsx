import { useState } from 'preact/hooks';
import {
	BinaryString,
	getArrayBufferFromBinaryString,
	getSanitizedBinaryString,
} from '../../functions/binaryString';
import {
	getFormattedHexadecimalString,
	getHexadecimalStringFromArrayBuffer,
} from '../../functions/hexadecimalString';
import { getIntegerStringFromArrayBuffer } from '../../functions/integerString';
import { getUnicodeStringFromArrayBuffer } from '../../functions/unicodeString';
import styles from './styles.module.css';

export const Playground = () => {
	const [value, setValue] = useState(
		'01001000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100 00100000 11110000 10011111 10010001 10001011 11110000 10011111 10001111 10111100' as BinaryString
	);

	return (
		<div class={styles.playground}>
			<BinaryInput onChange={(value) => setValue(value)} value={value} />
			<IntegerOutput value={value} />
			<HexadecimalOutput value={value} />
			<UnicodeOutput value={value} />
		</div>
	);
};

const BinaryInput = ({
	value,
	onChange,
}: {
	value: BinaryString;
	onChange: (value: BinaryString) => any;
}) => (
	<div class={styles.playgroundInputContainer}>
		<h2>Binary</h2>
		<small>
			{getSanitizedBinaryString(value).length} bits,{' '}
			{Math.ceil(getSanitizedBinaryString(value).length / 8)} bytes
		</small>
		<Input onChange={(value: string) => onChange(value as BinaryString)} value={value} />
	</div>
);

const HexadecimalOutput = ({ value }: { value: BinaryString }) => {
	const hexadecimalString = getFormattedHexadecimalString(
		getHexadecimalStringFromArrayBuffer(getArrayBufferFromBinaryString(value))
	);

	return (
		<div>
			<h2>Hexadecimal</h2>
			<Output value={hexadecimalString} />
		</div>
	);
};

const IntegerOutput = ({ value }: { value: BinaryString }) => {
	const { type: integerType, value: integerString } = getIntegerStringFromArrayBuffer(
		getArrayBufferFromBinaryString(value)
	);

	return (
		<div>
			<h2>Integer</h2>
			<small>{integerType ? integerType : '-'}</small>
			<Output value={integerString} />
		</div>
	);
};

const UnicodeOutput = ({ value }: { value: BinaryString }) => {
	const unicodeString = getUnicodeStringFromArrayBuffer(getArrayBufferFromBinaryString(value));
	const segmenter = new Intl.Segmenter();
	const segments = [...segmenter.segment(unicodeString)];

	return (
		<div>
			<h2>Unicode</h2>
			<small>{segments.length} characters</small>
			<Output value={unicodeString} />
		</div>
	);
};

const Input = ({ value, onChange }: { value: string; onChange: (value: string) => any }) => (
	<textarea
		class={styles.playgroundInput}
		onInput={(event) => onChange((event.target as HTMLTextAreaElement).value)}
		value={value}
	/>
);

const Output = ({ value }: { value: string }) => <pre class={styles.playgroundOutput}>{value}</pre>;
