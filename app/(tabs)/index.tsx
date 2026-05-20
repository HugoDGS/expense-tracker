import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { getBudgets } from '../../lib/database';
import { Expense } from '../../lib/database';
import SummaryCard from '../../components/SummaryCard';
import ExpenseItem from '../../components/ExpenseItem';

export default function HomeScreen() {
  const router = useRouter();
  const { expenses, total, month, remove } = useExpenses();
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    const budgets = getBudgets();
    setTotalBudget(Object.values(budgets).reduce((s, v) => s + v, 0));
  }, []);

  const handleEdit = (expense: Expense) => {
    router.push({ pathname: '/add', params: { id: String(expense.id) } });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <SummaryCard
            total={total}
            budget={totalBudget || undefined}
            month={month}
          />
        }
        renderItem={({ item }) => (
          <ExpenseItem expense={item} onEdit={handleEdit} onDelete={remove} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No expenses this month{'\n'}Tap + to add one</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/add')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1117' },
  empty: {
    color: '#8892a4',
    textAlign: 'center',
    marginTop: 48,
    fontSize: 14,
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: { color: 'white', fontSize: 28, lineHeight: 32 },
});
