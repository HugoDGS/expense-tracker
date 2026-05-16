export type Category = {
  id: string;
  label: string;
  color: string;
  icon: string;
};

export const CATEGORIES: Category[] = [
  { id: 'food', label: 'Food & Drink', color: '#f59e0b', icon: '🍔' },
  { id: 'transport', label: 'Transport', color: '#6366f1', icon: '🚗' },
  { id: 'shopping', label: 'Shopping', color: '#ec4899', icon: '🛍️' },
  { id: 'health', label: 'Health', color: '#22c55e', icon: '💊' },
  { id: 'entertainment', label: 'Entertainment', color: '#06b6d4', icon: '🎬' },
  { id: 'housing', label: 'Housing', color: '#f97316', icon: '🏠' },
  { id: 'other', label: 'Other', color: '#8b5cf6', icon: '📦' },
];

export const getCategoryById = (id: string): Category =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
