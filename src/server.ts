import { Server } from 'http';
import app from './app';
import config from './app/config';
import seedAdmin from './app/helpers/seedAdmin';

async function main() {
	const server: Server = app.listen(config.port, () => {
		console.log(`GetBack Server is running on http://localhost:${config.port}`);
	});

	seedAdmin();
}
main();
