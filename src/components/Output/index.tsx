import { BinaryString, getArrayBufferFromBinaryString } from '../../functions/binaryString';
import {
	getFormattedHexadecimalString,
	getHexadecimalStringFromArrayBuffer,
} from '../../functions/hexadecimalString';
import { getIntegerStringFromArrayBuffer } from '../../functions/integerString';
import styles from './styles.module.css';

export enum OutputType {
	Integer,
	Hexadecimal,
	Unicode,
}

export const BinaryOutput = ({ value }: { value: BinaryString }) => <Output value={value} />;

export const HexadecimalOutput = ({ value }: { value: BinaryString }) => {
	const hexadecimalString = getFormattedHexadecimalString(
		getHexadecimalStringFromArrayBuffer(getArrayBufferFromBinaryString(value))
	);

	return <Output value={hexadecimalString} />;
};

export const IntegerOutput = ({ value }: { value: BinaryString }) => {
	const integerString = getIntegerStringFromArrayBuffer(
		getArrayBufferFromBinaryString(value)
	).value;

	return <Output value={integerString} />;
};

const Output = ({ value }: { value: string }) => <pre class={styles.output}>{value}</pre>;
