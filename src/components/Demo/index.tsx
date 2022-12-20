import { FunctionalComponent } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { BinaryString, getFormattedBinaryString } from '../../functions/binaryString';
import { ButtonText } from '../Button';
import { BinaryInput } from '../Input';
import styles from './styles.module.css';

const BITWISE_UNARY_OPERATORS = ['~'] as const;
type BitwiseUnaryOperator = typeof BITWISE_UNARY_OPERATORS[number];

const BITWISE_BINARY_OPERATORS = ['&', '|', '^'] as const;
type BitwiseBinaryOperator = typeof BITWISE_BINARY_OPERATORS[number];

const BITWISE_SHIFT_OPERATORS = ['<<', '>>', '>>>'] as const;
type BitwiseShiftOperator = typeof BITWISE_SHIFT_OPERATORS[number];

const BITWISE_UNARY_OPERATOR_PERFORM = new Map<BitwiseUnaryOperator, (x: number) => number>([
	['~', (x) => ~x],
]);

const BITWISE_BINARY_OPERATOR_PERFORM = new Map<
	BitwiseBinaryOperator,
	(x: number, y: number) => number
>([
	['&', (x, y) => x & y],
	['|', (x, y) => x | y],
	['^', (x, y) => x ^ y],
]);

const BITWISE_SHIFT_OPERATOR_PERFORM = new Map<
	BitwiseShiftOperator,
	(x: number, y: number) => number
>([
	['<<', (x, y) => x << y],
	['>>', (x, y) => x >> y],
	['>>>', (x, y) => x >>> y],
]);

export const DemoContainer: FunctionalComponent<{ isChanged: boolean; onReset: () => any }> = ({
	children,
	isChanged,
	onReset,
}) => (
	<div class={styles.operator}>
		{children}

		<ButtonText class={styles.operatorResetButton} disabled={!isChanged} onClick={onReset}>
			Undo changes
		</ButtonText>
	</div>
);

export const DemoBitwiseBinaryOperator = ({
	initialLeftBinaryValue,
	initialRightBinaryValue,
	initialOperator,
}: {
	initialLeftBinaryValue: BinaryString;
	initialRightBinaryValue: BinaryString;
	initialOperator: BitwiseBinaryOperator;
}) => {
	const [binaryLeft, setBinaryLeft] = useState(initialLeftBinaryValue);
	const [binaryRight, setBinaryRight] = useState(initialRightBinaryValue);
	const [operator, setOperator] = useState<BitwiseBinaryOperator>(initialOperator);

	const isChanged =
		binaryLeft !== initialLeftBinaryValue ||
		binaryRight !== initialRightBinaryValue ||
		operator !== initialOperator;

	const result = useMemo(() => {
		const binaryLeftAsInteger = Number.parseInt(binaryLeft, 2);
		const binaryRightAsInteger = Number.parseInt(binaryRight, 2);

		const result = BITWISE_BINARY_OPERATOR_PERFORM.get(operator)(
			binaryLeftAsInteger,
			binaryRightAsInteger
		);

		return getFormattedBinaryString(result.toString(2) as BinaryString);
	}, [binaryLeft, binaryRight, operator]);

	const handleOperatorChange = (event: JSXInternal.TargetedEvent<HTMLSelectElement>) =>
		setOperator(event.currentTarget.value as BitwiseBinaryOperator);

	const reset = () => {
		setBinaryLeft(initialLeftBinaryValue);
		setBinaryRight(initialRightBinaryValue);
		setOperator(initialOperator);
	};

	return (
		<DemoContainer isChanged={isChanged} onReset={reset}>
			<div class={styles.operatorBitwiseBinary}>
				<BinaryInput
					class={styles.operatorInput}
					size={2}
					value={binaryLeft}
					onChange={setBinaryLeft}
				/>

				<select class={styles.operatorInput} value={operator} onChange={handleOperatorChange}>
					{BITWISE_BINARY_OPERATORS.map((operator) => (
						<option value={operator}>{operator}</option>
					))}
				</select>

				<BinaryInput
					class={styles.operatorInput}
					size={2}
					value={binaryRight}
					onChange={setBinaryRight}
				/>

				<span>=</span>
				<pre class={styles.operatorOutput}>{result}</pre>
			</div>
		</DemoContainer>
	);
};

export const DemoBitwiseUnaryOperator = ({
	initialBinaryValue,
	initialOperator,
}: {
	initialBinaryValue: BinaryString;
	initialOperator: BitwiseUnaryOperator;
}) => {
	const [binary, setBinary] = useState(initialBinaryValue);
	const [operator, setOperator] = useState<BitwiseUnaryOperator>(initialOperator);

	const isChanged = binary !== initialBinaryValue || operator !== initialOperator;

	const result = useMemo(() => {
		const binaryAsInteger = Number.parseInt(binary, 2);
		const result = BITWISE_UNARY_OPERATOR_PERFORM.get(operator)(binaryAsInteger);

		return getFormattedBinaryString(result.toString(2) as BinaryString);
	}, [binary, operator]);

	const handleOperatorChange = (event: JSXInternal.TargetedEvent<HTMLSelectElement>) =>
		setOperator(event.currentTarget.value as BitwiseUnaryOperator);

	const reset = () => {
		setBinary(initialBinaryValue);
		setOperator(initialOperator);
	};

	return (
		<DemoContainer isChanged={isChanged} onReset={reset}>
			<div class={styles.operatorBitwiseUnary}>
				{BITWISE_UNARY_OPERATORS.length > 1 ? (
					<select class={styles.operatorInput} value={operator} onChange={handleOperatorChange}>
						{BITWISE_UNARY_OPERATORS.map((operator) => (
							<option value={operator}>{operator}</option>
						))}
					</select>
				) : (
					<input class={styles.operatorInput} value={operator} size={1} readonly />
				)}

				<BinaryInput class={styles.operatorInput} value={binary} onChange={setBinary} />

				<span>=</span>
				<pre class={styles.operatorOutput}>{result}</pre>
			</div>
		</DemoContainer>
	);
};

export const DemoBitwiseShiftOperator = ({
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

	const isChanged =
		binary !== initialBinaryValue || operator !== initialOperator || shift !== initialShiftValue;

	const result = useMemo(() => {
		const binaryAsInteger = Number.parseInt(binary, 2);
		const result = BITWISE_SHIFT_OPERATOR_PERFORM.get(operator)(binaryAsInteger, shift);
		const resultFormatted = getFormattedBinaryString(result.toString(2) as BinaryString);

		return operator === '>>>' ? resultFormatted.padStart(binary.length, '0') : resultFormatted;
	}, [binary, operator, shift]);

	const handleOperatorChange = (event: JSXInternal.TargetedEvent<HTMLSelectElement>) =>
		setOperator(event.currentTarget.value as BitwiseShiftOperator);

	const reset = () => {
		setBinary(initialBinaryValue);
		setOperator(initialOperator);
		setShift(initialShiftValue);
	};

	return (
		<DemoContainer isChanged={isChanged} onReset={reset}>
			<div class={styles.operatorBitwiseShift}>
				<BinaryInput class={styles.operatorInput} value={binary} onChange={setBinary} />

				<select class={styles.operatorInput} value={operator} onChange={handleOperatorChange}>
					{BITWISE_SHIFT_OPERATORS.map((operator) => (
						<option value={operator}>{operator}</option>
					))}
				</select>

				<input
					class={styles.operatorInput}
					type="number"
					max={8}
					min={0}
					step={1}
					value={shift}
					onChange={(event) => setShift((event.target as HTMLInputElement).valueAsNumber)}
				/>

				<span>=</span>
				<pre class={styles.operatorOutput}>{result}</pre>
			</div>
		</DemoContainer>
	);
};
