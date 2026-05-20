import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getCategoryById } from '../constants/categories';
import { Expense } from '../lib/database';

type Props = {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
};

export default function ExpenseItem({ expense, onEdit, onDelete }: Props) {
  const category = getCategoryById(expense.category);
  const date = new Date(expense.date + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onEdit(expense)}
      activeOpacity={0.7}
    >
      <View style={[styles.icon, { backgroundColor: category.color + '22' }]}>
        <Text style={styles.emoji}>{category.icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.description} numberOfLines={1}>
          {expense.description || category.label}
        </Text>
        <Text style={styles.meta}>
          {category.label} · {date}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>-€{expense.amount.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => onDelete(expense.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.delete}>✕</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1d2e',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#2e3150',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: { fontSize: 22 },
  info: { flex: 1 },
  description: { color: '#e2e8f0', fontSize: 14, fontWeight: '500' },
  meta: { color: '#8892a4', fontSize: 12, marginTop: 2 },
  right: { alignItems: 'flex-end', gap: 6 },
  amount: { color: '#e2e8f0', fontSize: 14, fontWeight: '600' },
  delete: { color: '#8892a4', fontSize: 11 },
});
