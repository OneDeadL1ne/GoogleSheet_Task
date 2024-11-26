const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const auth = require("./client_secret.json");

const { AuthApi, GetClientsApi, GetStatusClientsApi } = require("./get_clients");

const { LIMIT, OFFSET, DELAY, SCOPES, ID_SHEET, USERNAME } = require("./constants");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const serviceAccountAuth = new JWT({
	email: auth.client_email,
	key: auth.private_key,
	scopes: SCOPES,
});

async function main() {
	const doc = new GoogleSpreadsheet(ID_SHEET, serviceAccountAuth);

	await doc.loadInfo();

	const sheet = doc.sheetsById[0];
	if (sheet.getRows()) {
		await sheet.clear();
	}
	sheet.setHeaderRow([
		"id",
		"firstName",
		"lastName",
		"gender",
		"address",
		"city",
		"phone",
		"email",
		"status",
	]);

	const token = await AuthApi(USERNAME);

	const users = await GetClientsApi(token, LIMIT, OFFSET);

	for (const user of users) {
		try {
			const row = [
				user.id,
				user.firstName,
				user.lastName,
				user.gender,
				user.address,
				user.city,
				user.phone,
				user.email,
				user.status,
			];
			await sheet.addRow(row);
			await delay(2000);
		} catch (error) {
			console.log(user.id, error);
		}
	}
	console.log("SUCCES DATA");
}

main();
