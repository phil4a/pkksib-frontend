export function getFirstSentence(text: string): string {
	const match = text.match(/^.*?[.!?](?=\s|$)/);

	return match ? match[0] : text;
}
