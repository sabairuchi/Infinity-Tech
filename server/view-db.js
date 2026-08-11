import { initDatabaseConnection, getPool, getMySQLStatus, memoryStore } from './db.js';

async function viewDatabase() {
  console.log('\n======================================================');
  console.log('   📊 DIGIRO MYSQL DATABASE VIEWER & INSPECTOR  ');
  console.log('======================================================\n');

  const connected = await initDatabaseConnection();
  const status = getMySQLStatus();

  console.log(`[Database Host]     : ${status.host}:${status.port}`);
  console.log(`[Database Name]     : ${status.database}`);
  console.log(`[Connection Status] : ${connected ? 'CONNECTED (MySQL Engine)' : 'OFFLINE (Local Memory Store Active)'}\n`);

  if (connected) {
    const pool = getPool();
    try {
      console.log('--- 👤 USERS TABLE (`users`) ---');
      const [users] = await pool.query('SELECT id, name, email, role, created_at FROM users');
      console.table(users);

      console.log('\n--- 🛒 ORDERS TABLE (`orders`) ---');
      const [orders] = await pool.query('SELECT * FROM orders');
      console.table(orders);

      console.log('\n--- 🔑 USER PURCHASES & LICENSES TABLE (`user_purchases`) ---');
      const [purchases] = await pool.query('SELECT * FROM user_purchases');
      console.table(purchases);

      console.log('\n--- 📦 PRODUCTS TABLE (`products`) ---');
      const [products] = await pool.query('SELECT id, name, category, pricing FROM products');
      console.table(products);

      console.log('\n--- 📬 CONTACT MESSAGES TABLE (`contact_messages`) ---');
      const [messages] = await pool.query('SELECT id, name, email, service, created_at FROM contact_messages');
      console.table(messages);
    } catch (err) {
      console.error('Error reading MySQL tables:', err.message);
    } finally {
      process.exit(0);
    }
  } else {
    console.log('--- 👤 IN-MEMORY USERS ---');
    console.table(memoryStore.users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })));

    console.log('\n--- 🛒 IN-MEMORY ORDERS ---');
    console.table(memoryStore.orders);

    console.log('\n--- 🔑 IN-MEMORY PURCHASES ---');
    console.table(memoryStore.purchases);

    console.log('\n--- 📬 IN-MEMORY CONTACT MESSAGES ---');
    console.table(memoryStore.contactMessages || []);
    process.exit(0);
  }
}

viewDatabase();
