export default function formatMoney(priceInCents = 0, currency = "USD", locale = "en-US") {
	const options = {
		style: "currency",
		currency,
		minimumFractionDigits: 2,
	};

	if (priceInCents % 100 === 0) {
		options.minimumFractionDigits = 0;
	}
	const formatter = new Intl.NumberFormat(locale, options);
	return formatter.format(priceInCents / 100);
}
