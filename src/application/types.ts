export type TableOfContents = {
	url: string;
	title: string;
	operator?: string;
	children?: TableOfContents;
}[];
