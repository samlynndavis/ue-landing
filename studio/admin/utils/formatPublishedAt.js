const formatPublishedAt = publishedAt => {
	const splitDates = publishedAt.split('-');

	const month = splitDates[1];
	const date = splitDates[2];
	const year = splitDates[0];

	return `${month}-${date}-${year}`;
};

export default formatPublishedAt;