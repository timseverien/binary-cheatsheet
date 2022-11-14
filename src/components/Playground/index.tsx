// import { useState } from 'preact/hooks';
// import {
// 	BinaryString,
// 	getArrayBufferFromBinaryString,
// 	getSanitizedBinaryString,
// } from '../../functions/binaryString';
// import {
// 	getFormattedHexadecimalString,
// 	getHexadecimalStringFromArrayBuffer,
// } from '../../functions/hexadecimalString';
// import { getIntegerStringFromArrayBuffer, IntegerString } from '../../functions/integerString';
// import { getUnicodeStringFromArrayBuffer } from '../../functions/unicodeString';
// import { MaskedTextArea } from '../TextArea';
// import { BinaryInput } from './Input';
// import { HexadecimalOutput } from './Output';
// import styles from './styles.module.css';

// const BITWISE_OPERATORS = [
// 	{ name: 'Left shift', symbol: '<<' },
// 	{ name: 'Signed right shift', symbol: '>>' },
// 	{ name: 'Unsigned right shift', symbol: '>>>' },
// 	{ name: 'AND', symbol: '&' },
// 	{ name: 'OR', symbol: '|' },
// 	{ name: 'NOT', symbol: '~' },
// 	{ name: 'XOR', symbol: '^' },
// ];

// export enum OutputType {
// 	Integer,
// 	Hexadecimal,
// 	Unicode,
// }

// export const Playground = () => {
// 	const [value, setValue] = useState(
// 		'01001000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100 00100000 11110000 10011111 10010001 10001011 11110000 10011111 10001111 10111100' as BinaryString
// 	);

// 	return (
// 		<div class={styles.playground}>
// 			<div class={styles.playgroundInputContainer}>
// 				<BinaryField onChange={(value) => setValue(value)} value={value} />
// 			</div>
// 			<div>
// 				<PlaygroundIntegerOutput />
// 			</div>
// 			<div>
// 				<h2>Hexadecimal</h2>
// 				<HexadecimalOutput value={value} />
// 			</div>
// 			<UnicodeOutput value={value} />
// 		</div>
// 	);
// };

// const PlaygroundIntegerOutput = () => (
// 	<>
// 		<h2>Integer</h2>
// 		<small class={styles.playgroundInputDetail}>
// 			{integerType ? integerType : '160 bits, 20 bytes'}
// 		</small>
// 		<Output value={integerString} />
// 	</>
// );

// export const PlaygroundOperatorEmbed = () => {
// 	const [valueLeft, setValueLeft] = useState('00000101' as BinaryString);
// 	const [valueRight, setValueRight] = useState('2' as IntegerString);

// 	const [operator, setOperator] = useState(BITWISE_OPERATORS[0].symbol);
// 	const output = valueLeft;

// 	return (
// 		<div class={styles.playgroundOperator}>
// 			<Input
// 				mask={/^[01]{1,8}(\s?[01]{0,8})*$/}
// 				value={valueLeft}
// 				onChange={(value: string) => setValueLeft(value as BinaryString)}
// 			/>
// 			<select
// 				value={operator}
// 				onChange={(event) => setOperator((event.target as HTMLSelectElement).value)}
// 			>
// 				{BITWISE_OPERATORS.map((operator) => (
// 					<option value={operator.symbol}>{operator.name}</option>
// 				))}
// 			</select>
// 			<Input
// 				mask={/^[01]{1,8}(\s?[01]{0,8})*$/}
// 				value={valueLeft}
// 				onChange={(value: string) => setValueLeft(value as BinaryString)}
// 			/>
// 			<Output value={valueLeft} />
// 		</div>
// 	);
// };

// export const PlaygroundEmbed = ({
// 	initialValue,
// 	outputType,
// }: {
// 	initialValue: BinaryString;
// 	outputType: OutputType;
// }) => {
// 	const [value, setValue] = useState(initialValue);

// 	return (
// 		<div class={styles.playground}>
// 			<div class={styles.playgroundEmbedInputContainer}>
// 				<BinaryField onChange={(value) => setValue(value)} value={value} />
// 			</div>
// 			{outputType === OutputType.Hexadecimal && <HexadecimalOutput value={value} />}
// 			{outputType === OutputType.Integer && <IntegerOutput value={value} />}
// 			{outputType === OutputType.Unicode && <UnicodeOutput value={value} />}
// 		</div>
// 	);
// };

// const BinaryField = ({
// 	value,
// 	onChange,
// }: {
// 	value: BinaryString;
// 	onChange: (value: BinaryString) => any;
// }) => (
// 	<>
// 		<h2>Binary</h2>
// 		<small class={styles.playgroundInputDetail}>
// 			{getSanitizedBinaryString(value).length} bits,{' '}
// 			{Math.ceil(getSanitizedBinaryString(value).length / 8)} bytes
// 		</small>
// 		<BinaryInput value={value} onChange={onChange} />
// 	</>
// );

// const UnicodeOutput = ({ value }: { value: BinaryString }) => {
// 	const unicodeString = getUnicodeStringFromArrayBuffer(getArrayBufferFromBinaryString(value));
// 	const segmenter = new Intl.Segmenter();
// 	const segments = [...segmenter.segment(unicodeString)];

// 	return (
// 		<div>
// 			<h2>Unicode</h2>
// 			<small class={styles.playgroundInputDetail}>{segments.length} characters</small>
// 			<Output value={unicodeString} />
// 		</div>
// 	);
// };

// const Input = ({
// 	mask,
// 	value,
// 	onChange,
// }: {
// 	mask?: RegExp;
// 	value: string;
// 	onChange: (value: string, valueUnmasked: string) => any;
// }) => (
// 	<MaskedTextArea class={styles.playgroundInput} value={value} mask={mask} onChange={onChange} />
// );

// const Output = ({ value }: { value: string }) => <pre class={styles.playgroundOutput}>{value}</pre>;
