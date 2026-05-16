import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('expenses.db');

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT DEFAULT '',
      date TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS budgets (
      category TEXT PRIMARY KEY,
      monthly_limit REAL NOT NULL
    );
  `);
};

export type Expense = {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
  created_at: string;
};

export const getExpenses = (month?: string): Expense[] => {
  if (month) {
    return db.getAllSync(
      "SELECT * FROM expenses WHERE strftime('%Y-%m', date) = ? ORDER BY date DESC, created_at DESC",
      [month]
    ) as Expense[];
  }
  return db.getAllSync(
    'SELECT * FROM expenses ORDER BY date DESC, created_at DESC'
  ) as Expense[];
};

export const addExpense = (
  amount: number,
  category: string,
  description: string,
  date: string
) => {
  db.runSync(
    'INSERT INTO expenses (amount, category, description, date) VALUES (?, ?, ?, ?)',
    [amount, category, description, date]
  );
};

export const updateExpense = (
  id: number,
  amount: number,
  category: string,
  description: string,
  date: string
) => {
  db.runSync(
    'UPDATE expenses SET amount=?, category=?, description=?, date=? WHERE id=?',
    [amount, category, description, date, id]
  );
};

export const deleteExpense = (id: number) => {
  db.runSync('DELETE FROM expenses WHERE id=?', [id]);
};

export const getBudgets = (): Record<string, number> => {
  const rows = db.getAllSync('SELECT * FROM budgets') as {
    category: string;
    monthly_limit: number;
  }[];
  return rows.reduce(
    (acc, row) => ({ ...acc, [row.category]: row.monthly_limit }),
    {} as Record<string, number>
  );
};

export const setBudget = (category: string, limit: number) => {
  db.runSync(
    'INSERT OR REPLACE INTO budgets (category, monthly_limit) VALUES (?, ?)',
    [category, limit]
  );
};

export const getMonthlyStats = (
  month: string
): { category: string; total: number }[] => {
  return db.getAllSync(
    `SELECT category, SUM(amount) as total
     FROM expenses
     WHERE strftime('%Y-%m', date) = ?
     GROUP BY category
     ORDER BY total DESC`,
    [month]
  ) as { category: string; total: number }[];
};
