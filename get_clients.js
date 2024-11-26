const axios = require("axios");
const { API_URL } = require("./constants");

async function AuthApi(username) {
	if (!username) {
		return;
	}
	const { data } = await axios.post(API_URL + "/auth/login", {
		username,
	});
	if (data.message) {
		return;
	}

	return data.token;
}

async function GetClientsApi(token, limit = 0, offset = 0) {
	if (!token || (limit < 0 && limit > 1000)) {
		return;
	}
	const { data } = await axios.get(API_URL + `/clients?limit=${limit}&offset=${offset}`, {
		headers: {
			Authorization: `${token}`,
		},
	});
	if (data.message) {
		return;
	}
	const userIds = data.map((item) => item.id);
	const userStatus = await GetStatusClientsApi(userIds, token);

	const result = mergeArrays([data, userStatus]);

	return result;
}

async function GetStatusClientsApi(userIds, token) {
	if (!userIds || !token) {
		return;
	}

	const { data } = await axios.post(
		API_URL + "/clients",
		{ userIds },
		{
			headers: {
				Authorization: `${token}`,
			},
		}
	);

	return data;
}
const mergeArrays = (arrays, property = "id") => {
	const arr = arrays.flatMap((item) => item);

	const obj = arr.reduce((acc, item) => {
		return {
			...acc,
			[item[property]]: { ...acc[item[property]], ...item },
		};
	}, {});

	return Object.values(obj);
};

module.exports = { AuthApi, GetClientsApi, mergeArrays, GetStatusClientsApi };
