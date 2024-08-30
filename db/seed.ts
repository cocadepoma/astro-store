import { db, Role, User } from 'astro:db';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';


// https://astro.build/db/seed
export default async function seed() {
	const roles = [
		{ id: 'admin', name: 'Administrator' },
		{ id: 'user', name: 'Customer' },
	];

	const jhohDoe = {
		id: uuid(),
		name: 'John Doe',
		email: 'jhon.doe@google.com',
		password: bcrypt.hashSync('123456', 10),
		role: 'admin',
	};

	const janeDoe = {
		id: uuid(),
		name: 'Jane Doe',
		email: 'jane.doe@google.com',
		password: bcrypt.hashSync('123456', 10),
		role: 'user',
	};

	await db.insert(Role).values(roles);
	await db.insert(User).values([jhohDoe, janeDoe]);
}
