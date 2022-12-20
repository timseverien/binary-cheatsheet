import { useMemo, useState } from 'preact/hooks';
import { DemoContainer } from '.';
import { BinaryString } from '../../functions/binaryString';
import { IntegerString } from '../../functions/integerString';
import { BinaryInput, IntegerInput } from '../Input';
import styles from './styles.module.css';

const Variable = ({ label, value }: { label: string; value: string }) => (
	<div class={styles.practicalVariable}>
		{value}
		{label}
	</div>
);

const PracticalBinaryInput = ({
	value,
	onChange,
}: {
	value: BinaryString;
	onChange: (value: BinaryString) => any;
}) => (
	<BinaryInput
		class={`${styles.operatorInput} ${styles.operatorInputSmall}`}
		size={8}
		value={value}
		onChange={onChange}
	/>
);

const PracticalIntegerInput = ({
	value,
	onChange,
}: {
	value: number;
	onChange: (value: number) => any;
}) => (
	<IntegerInput
		class={`${styles.operatorInput} ${styles.operatorInputSmall}`}
		size={8}
		value={value.toString() as IntegerString}
		onChange={(value) => onChange(Number.parseInt(value, 10))}
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

	console.log({
		value,
		shift,
		bitmask,
	});

	return (
		<DemoContainer isChanged={isChanged} onReset={reset}>
			<pre class={styles.practicalCode}>
				<code>
					<div>
						bitmask = <PracticalBinaryInput value={bitmask} onChange={setBitmask} />
					</div>
					<div>
						value = <PracticalBinaryInput value={value} onChange={setValue} />
					</div>
					<div>
						shift = <PracticalIntegerInput value={shift} onChange={setShift} />
					</div>
					<div>
						<Variable label="value" value={value} /> &gt;&gt;{' '}
						<Variable label="shift" value={shift.toString()} /> &{' '}
						<Variable label="bitmask" value={bitmask} /> = {result}
					</div>
				</code>
			</pre>
		</DemoContainer>
	);
};
