// hashPasswords.js

import bcrypt from 'bcrypt';
import fs from 'fs/promises';

const users = [
    { username: 'user1', email: 'user1@example.com', password: 'password1' },
    { username: 'user2', email: 'user2@example.com', password: 'password2' },
    { username: 'user3', email: 'user3@example.com', password: 'password3' }
];

// Function to hash passwords
async function hashPasswords() {
    const saltRounds = 10;
    const hashedUsers = await Promise.all(
        users.map(async (user) => {
            const hash = await bcrypt.hash(user.password, saltRounds);
            return { ...user, password_hash: hash };
        })
    );

    // Create SQL insert statements
    let sql = '-- Seed Users\n';
    sql += 'INSERT INTO users (username, email, password_hash) VALUES\n';
    sql += hashedUsers
        .map((user) => `    ('${user.username}', '${user.email}', '${user.password_hash}')`)
        .join(',\n');
    sql += ';\n';

    // Write SQL to seeds file (use 'a' to append to the file)
    await fs.appendFile('seeds.sql', sql);
    console.log('Seed file updated with hashed passwords.');
}

hashPasswords().catch(console.error);
