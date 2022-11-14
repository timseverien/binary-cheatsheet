import { FunctionalComponent, JSX } from 'preact';
import styles from './styles.module.css';

export const ButtonText: FunctionalComponent<JSX.HTMLAttributes> = ({ children, ...props }) => (
	<button {...props} class={`${props.class} ${styles.buttonText}`}>
		{children}
	</button>
);
