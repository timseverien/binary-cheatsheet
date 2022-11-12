export type UnicodeString = string & { _format: 'UNICODE' };

export function getUnicodeStringFromArrayBuffer(buffer: ArrayBuffer) {
	const decoder = new TextDecoder();

	return decoder.decode(buffer) as UnicodeString;
}
