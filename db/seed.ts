import { db, Role, User, Product, ProductImage } from 'astro:db';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';
import { seedProducts } from './seed-data';


// https://astro.build/db/seed
export default async function seed() {
	const roles = [
		{ id: 'admin', name: 'Administrator' },
		{ id: 'user', name: 'Customer' },
	];

	const jhonDoe = {
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
	await db.insert(User).values([jhonDoe, janeDoe]);

	const queries: any = [];

	seedProducts.forEach((p) => {
		const product = {
			id: uuid(),
			description: p.description,
			gender: p.gender,
			price: p.price,
			sizes: p.sizes.join(','),
			slug: p.slug,
			stock: p.stock,
			tags: p.tags.join(','),
			title: p.title,
			type: p.type,
			user: jhonDoe.id,
		};

		queries.push(db.insert(Product).values(product));

		p.images.forEach((image) => {
			const productImage = {
				id: uuid(),
				productId: product.id,
				image,
			};

			queries.push(db.insert(ProductImage).values(productImage));
		});
	});

	await db.batch(queries);
}
