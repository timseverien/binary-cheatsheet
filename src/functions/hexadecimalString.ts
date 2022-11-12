const SYMBOLS_PER_BYTE = 2;

export type HexadecimalString = string & { _format: 'HEXADECIMAL' };

export function getFormattedHexadecimalString(value: HexadecimalString) {
	return (value
		.toUpperCase()
		.match(/[0-9A-F]{2}/gi)
		?.join(' ') ?? '') as HexadecimalString;
}

export function getHexadecimalStringFromArrayBuffer(buffer: ArrayBuffer) {
	const bytes = Array.from(new Uint8Array(buffer));

	return getPaddedHexadecimalString(
		bytes.map((b) => b.toString(16).padStart(2, '0'))?.join('') as HexadecimalString
	);
}

function getPaddedHexadecimalString(value: HexadecimalString) {
	const targetLength = SYMBOLS_PER_BYTE * Math.ceil(value.length / SYMBOLS_PER_BYTE);

	return value.padStart(targetLength, '0') as HexadecimalString;
}
