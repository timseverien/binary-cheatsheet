import { nanoid } from 'nanoid';
import { FunctionalComponent, VNode } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { DemoContainer } from '.';
import { BinaryString } from '../../functions/binaryString';
import { IntegerString } from '../../functions/integerString';
import { BinaryInput, IntegerInput } from '../Input';
import styles from './styles.module.css';

const Variable = ({ label, value }: { label: string; value: string }) => {
	const id = nanoid();

	return (
		<div class={styles.practicalVariable}>
			<div aria-describedby={id}>{value}</div>
			<div id={id} class={styles.practicalVariableName}>
				{label}
			</div>
		</div>
	);
};

const NamedField: FunctionalComponent<{ name: string }> = ({ children, name }) => {
	const id = nanoid();

	return (
		<div>
			<div id={id}>{name}</div>
			<div aria-describedby={id}>{children}</div>
		</div>
	);
};

const PracticalBinaryInput = ({
	value,
	onChange,
}: {
	value: BinaryString;
	onChange: (value: BinaryString) => any;
}) => <BinaryInput class={styles.operatorInput} size={4} value={value} onChange={onChange} />;

const PracticalIntegerInput = ({
	value,
	size = 3,
	onChange,
}: {
	value: number;
	size?: number;
	onChange: (value: number) => any;
}) => (
	<IntegerInput
		class={styles.operatorInput}
		size={size}
		value={value.toString() as IntegerString}
		onChange={(value: IntegerString) => onChange(Number.parseInt(value, 10))}
	/>
);

export const PracticalReadBit = ({
	initialBitmask,
	initialShift,
	initialValue,
}: {
	initialBitmask: BinaryString;
	initialShift: number;
	initialValue: BinaryString;
}) => {
	const [bitmask, setBitmask] = useState(initialBitmask);
	const [shift, setShift] = useState(initialShift);
	const [value, setValue] = useState(initialValue);

	const isChanged = bitmask !== initialBitmask || shift !== initialShift || value !== initialValue;

	const result = useMemo(
		() => (Number.parseInt(value, 2) >> shift) & Number.parseInt(bitmask, 2),
		[bitmask, shift, value]
	);

	const reset = () => {
		setBitmask(initialBitmask);
		setValue(initialValue);
		setShift(initialShift);
	};

	return (
		<DemoContainer isChanged={isChanged} onReset={reset}>
			<div class={styles.practicalReadBit}>
				<span>(</span>
				<NamedField name="value">
					<PracticalBinaryInput value={value} onChange={setValue} />
				</NamedField>
				<span>&gt;&gt;</span>
				<NamedField name="shift">
					<PracticalIntegerInput value={shift} onChange={setShift} />
				</NamedField>
				<span>)</span>
				<span>&</span>
				<NamedField name="bitmask">
					<PracticalBinaryInput value={bitmask} onChange={setBitmask} />
				</NamedField>
				<span>=</span>
				<pre class={styles.operatorOutput}>{result.toString(2)}</pre>
			</div>
		</DemoContainer>
	);
};

export const PracticalSetBitOne = ({
	initialShift,
	initialValue,
}: {
	initialShift: number;
	initialValue: BinaryString;
}) => {
	const [shift, setShift] = useState(initialShift);
	const [value, setValue] = useState(initialValue);

	const isChanged = shift !== initialShift || value !== initialValue;

	const result = useMemo(() => Number.parseInt(value, 2) | (0b1 << shift), [shift, value]);

	const reset = () => {
		setValue(initialValue);
		setShift(initialShift);
	};

	return (
		<DemoContainer isChanged={isChanged} onReset={reset}>
			<div class={styles.practicalSetBitOne}>
				<NamedField name="value">
					<PracticalBinaryInput value={value} onChange={setValue} />
				</NamedField>
				<span>|&nbsp;(1</span>
				<span>&lt;&lt;</span>
				<NamedField name="shift">
					<PracticalIntegerInput value={shift} onChange={setShift} />
				</NamedField>
				<span>)</span>
				<span>=</span>
				<pre class={styles.operatorOutput}>{result.toString(2)}</pre>
			</div>
		</DemoContainer>
	);
};

export const PracticalSetBitZero = ({
	initialShift,
	initialValue,
}: {
	initialShift: number;
	initialValue: BinaryString;
}) => {
	const [shift, setShift] = useState(initialShift);
	const [value, setValue] = useState(initialValue);

	const isChanged = shift !== initialShift || value !== initialValue;

	const result = useMemo(() => Number.parseInt(value, 2) & (0b0 << shift), [shift, value]);

	const reset = () => {
		setValue(initialValue);
		setShift(initialShift);
	};

	return (
		<DemoContainer isChanged={isChanged} onReset={reset}>
			<div class={styles.practicalSetBitZero}>
				<NamedField name="value">
					<PracticalBinaryInput value={value} onChange={setValue} />
				</NamedField>
				<span>&&nbsp;(0</span>
				<span>&lt;&lt;</span>
				<NamedField name="shift">
					<PracticalIntegerInput value={shift} onChange={setShift} />
				</NamedField>
				<span>)</span>
				<span>=</span>
				<pre class={styles.operatorOutput}>{result.toString(2)}</pre>
			</div>
		</DemoContainer>
	);
};

export const PracticalSetBit = ({
	initialBit,
	initialShift,
	initialValue,
}: {
	initialBit: BinaryString;
	initialShift: number;
	initialValue: BinaryString;
}) => {
	const [bit, setBit] = useState(initialBit);
	const [shift, setShift] = useState(initialShift);
	const [value, setValue] = useState(initialValue);

	const isChanged = shift !== initialShift || value !== initialValue;

	const result = useMemo(() => {
		const val = Number.parseInt(value, 2);
		return val ^ ((-bit ^ val) & (1 << shift));
	}, [bit, shift, value]);

	const reset = () => {
		setValue(initialValue);
		setShift(initialShift);
	};

	return (
		<DemoContainer isChanged={isChanged} onReset={reset}>
			<div class={styles.practicalSetBit}>
				<NamedField name="value">
					<PracticalBinaryInput value={value} onChange={setValue} />
				</NamedField>
				<span>^&nbsp;(-</span>
				<NamedField name="bit">
					<PracticalBinaryInput value={bit} onChange={setBit} />
				</NamedField>
				<span>^</span>
				<NamedField name="value">
					<PracticalBinaryInput value={value} onChange={setValue} />
				</NamedField>
				<span>)&nbsp;&&nbsp;(1&nbsp;&lt;&lt;</span>
				<NamedField name="shift">
					<PracticalIntegerInput value={shift} onChange={setShift} />
				</NamedField>
				<span>)</span>
				<span>=</span>
				<pre class={styles.operatorOutput}>{result.toString(2)}</pre>
			</div>
		</DemoContainer>
	);
};
