import { useState, useCallback, useEffect } from 'react';
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getMonthlyStats,
  Expense,
} from '../lib/database';

const currentMonth = () => new Date().toISOString().slice(0, 7);

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [stats, setStats] = useState<{ category: string; total: number }[]>([]);
  const [month, setMonth] = useState(currentMonth());

  const refresh = useCallback(() => {
    setExpenses(getExpenses(month));
    setStats(getMonthlyStats(month));
  }, [month]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = (
    amount: number,
    category: string,
    description: string,
    date: string
  ) => {
    addExpense(amount, category, description, date);
    refresh();
  };

  const update = (
    id: number,
    amount: number,
    category: string,
    description: string,
    date: string
  ) => {
    updateExpense(id, amount, category, description, date);
    refresh();
  };

  const remove = (id: number) => {
    deleteExpense(id);
    refresh();
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { expenses, stats, total, month, setMonth, add, update, remove, refresh };
};
