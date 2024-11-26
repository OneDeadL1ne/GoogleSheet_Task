const SCOPES = [
	"https://www.googleapis.com/auth/spreadsheets",
	"https://www.googleapis.com/auth/drive.file",
];

const API_URL = ""; // адрес API
const LIMIT = 1000; // параметр для запроса GetClientsApi
const OFFSET = 50; // параметр для запроса GetClientsApi
const DELAY = 1000; // задерджка для добаления данных в таблицу Google Sheet

const AUTH = {
	client_email: "", // сервисный акаунт, который будет взаимодействовать с Google Sheet
	private_key: "", // сервисный ключ, который будет взаимодействовать с Google Sheet
};
const ID_SHEET = ""; // id Google Sheet
const USERNAME = ""; // пользователь для авторизации

module.exports = {
	USERNAME,
	API_URL,
	ID_SHEET,
	AUTH,
	SCOPES,
	LIMIT,
	OFFSET,
	DELAY,
};
