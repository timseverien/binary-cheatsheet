export type IntegerString = string & { _format: 'INTEGER' };

function getPaddedArrayBuffer(buffer: ArrayBuffer, byteLength: number) {
	const view = new Uint8Array(buffer);
	const viewNew = new Uint8Array(byteLength);

	viewNew.set(view, byteLength - buffer.byteLength);

	return viewNew.buffer;
}

function getPaddedByteLength(byteLength: number) {
	return 2 ** Math.ceil(Math.log2(byteLength));
}

export function getIntegerStringFromArrayBuffer(buffer: ArrayBuffer) {
	const view = new DataView(getPaddedArrayBuffer(buffer, getPaddedByteLength(buffer.byteLength)));

	switch (view.byteLength) {
		case 1:
			return {
				type: 'uint8',
				value: view.getUint8(0).toString() as IntegerString,
			};
		case 2:
			return {
				type: 'uint16',
				value: view.getUint16(0).toString() as IntegerString,
			};
		case 3:
		case 4:
			return {
				type: 'uint32',
				value: view.getUint32(0).toString() as IntegerString,
			};
		case 5:
		case 6:
		case 7:
		case 8:
			return {
				type: 'uint64',
				value: view.getBigUint64(0).toString() as IntegerString,
			};

		default:
			return {
				type: null,
				value: 'Too big to parse' as IntegerString,
			};
	}
}
