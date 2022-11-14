import { useMemo, useState } from 'preact/hooks';
import {
	BinaryString,
	getBytePaddedBinaryString,
	getFormattedBinaryString,
} from '../../functions/binaryString';
import { ButtonText } from '../Button';
import { BinaryInput, IntegerInput } from './Input';
import styles from './styles.module.css';

const BITWISE_SHIFT_OPERATORS = ['<<', '>>', '>>>'] as const;
type BitwiseShiftOperator = typeof BITWISE_SHIFT_OPERATORS[number];

const BITWISE_SHIFT_OPERATOR_PERFORM = new Map<
	BitwiseShiftOperator,
	(x: number, y: number) => number
>([
	['<<', (x, y) => x << y],
	['>>', (x, y) => x >> y],
	['>>>', (x, y) => x >>> y],
]);

export const PlaygroundBitwiseShiftOperator = ({
	initialBinaryValue,
	initialOperator,
	initialShiftValue,
}: {
	initialBinaryValue: BinaryString;
	initialOperator: BitwiseShiftOperator;
	initialShiftValue: number;
}) => {
	const [binary, setBinary] = useState(initialBinaryValue);
	const [operator, setOperator] = useState<BitwiseShiftOperator>(initialOperator);
	const [shift, setShift] = useState(initialShiftValue);

	const result = useMemo(() => {
		const binaryAsInteger = Number.parseInt(binary, 2);
		const result = BITWISE_SHIFT_OPERATOR_PERFORM.get(operator)(binaryAsInteger, shift);
		const resultFormatted = getFormattedBinaryString(result.toString(2) as BinaryString);

		return initialOperator === '>>>'
			? resultFormatted.padStart(binary.length, '0')
			: resultFormatted;
	}, [binary, operator, shift]);

	const handleOperatorChange = (event) =>
		setOperator((event.target as HTMLSelectElement).value as BitwiseShiftOperator);

	const reset = () => {
		setBinary(initialBinaryValue);
		setOperator(initialOperator);
		setShift(initialShiftValue);
	};

	return (
		<div class={styles.playgroundOperator}>
			<BinaryInput
				class={`${styles.playgroundOperatorInput} ${styles.playgroundOperatorBinary}`}
				value={binary}
				onChange={setBinary}
			/>

			<select
				class={styles.playgroundOperatorInput}
				value={operator}
				onChange={handleOperatorChange}
			>
				{BITWISE_SHIFT_OPERATORS.map((operator) => (
					<option value={operator}>{operator}</option>
				))}
			</select>

			<input
				class={styles.playgroundOperatorInput}
				type="number"
				max={8}
				min={0}
				step={1}
				value={shift}
				onChange={(event) => setShift((event.target as HTMLInputElement).valueAsNumber)}
			/>

			<span>=</span>
			<pre class={styles.playgroundOperatorOutput}>{result}</pre>

			<div class={styles.playgroundOperatorReset}>
				<ButtonText class={styles.playgroundOperatorResetButton} onClick={reset}>
					Undo changes
				</ButtonText>
			</div>
		</div>
	);
};
