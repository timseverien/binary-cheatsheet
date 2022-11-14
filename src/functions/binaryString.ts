const SYMBOLS_PER_BYTE = 8;

export type BinaryString = string & { _format: 'BINARY' };

export function getArrayBufferFromBinaryString(value: BinaryString) {
	const binaryStringSanitized = getBytePaddedBinaryString(getSanitizedBinaryString(value));
	const view = new Uint8Array(binaryStringSanitized.length / SYMBOLS_PER_BYTE);

	for (let i = 0; i < binaryStringSanitized.length; i += SYMBOLS_PER_BYTE) {
		const byte = Number.parseInt(binaryStringSanitized.slice(i, i + SYMBOLS_PER_BYTE), 2);
		view[Math.floor(i / 8)] = byte;
	}

	return view.buffer;
}

export function getBinaryStringFromArrayBuffer(value: ArrayBuffer) {
	const bytes = Array.from(new Uint8Array(value));

	return bytes.reduce((value, byte) => value + byte.toString(2), '') as BinaryString;
}

export function getBytePaddedBinaryString(value: BinaryString) {
	const targetLength = SYMBOLS_PER_BYTE * Math.ceil(value.length / SYMBOLS_PER_BYTE);

	return value.padStart(targetLength, '0') as BinaryString;
}

export function getFormattedBinaryString(value: BinaryString) {
	const v = getSanitizedBinaryString(value);

	if (v.length <= 8) {
		return v;
	}

	let r = '';

	for (const [i, c] of [...v].entries()) {
		r += c;
		if (i > 0 && i % 8 === 0) r += ' ';
	}

	return r as BinaryString;
}

export function getSanitizedBinaryString(value: BinaryString) {
	return value.replace(/[^01]/g, '') as BinaryString;
}
