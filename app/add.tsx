import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { CATEGORIES } from '../constants/categories';
import { getExpenses } from '../lib/database';

export default function AddExpenseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { add, update } = useExpenses();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (id) {
      const expenses = getExpenses();
      const expense = expenses.find((e) => e.id === Number(id));
      if (expense) {
        setAmount(String(expense.amount));
        setCategory(expense.category);
        setDescription(expense.description);
        setDate(expense.date);
      }
    }
  }, [id]);

  const handleSave = () => {
    const parsed = parseFloat(amount.replace(',', '.'));
    if (!amount || isNaN(parsed) || parsed <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid positive amount.');
      return;
    }
    if (id) {
      update(Number(id), parsed, category, description, date);
    } else {
      add(parsed, category, description, date);
    }
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.sectionLabel}>Amount (€)</Text>
      <TextInput
        style={styles.amountInput}
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        placeholderTextColor="#8892a4"
        keyboardType="decimal-pad"
        autoFocus
      />

      <Text style={styles.sectionLabel}>Category</Text>
      <View style={styles.categories}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.catBtn,
              category === cat.id && {
                backgroundColor: cat.color + '22',
                borderColor: cat.color,
              },
            ]}
            onPress={() => setCategory(cat.id)}
          >
            <Text style={styles.catIcon}>{cat.icon}</Text>
            <Text
              style={[
                styles.catLabel,
                category === cat.id && { color: cat.color },
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Optional note..."
        placeholderTextColor="#8892a4"
      />

      <Text style={styles.sectionLabel}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#8892a4"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>
          {id ? 'Save changes' : 'Add expense'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1117' },
  sectionLabel: {
    color: '#8892a4',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 20,
  },
  amountInput: {
    backgroundColor: '#1a1d2e',
    borderWidth: 1,
    borderColor: '#2e3150',
    borderRadius: 12,
    padding: 16,
    color: '#e2e8f0',
    fontSize: 28,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1a1d2e',
    borderWidth: 1,
    borderColor: '#2e3150',
    borderRadius: 12,
    padding: 14,
    color: '#e2e8f0',
    fontSize: 15,
  },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2e3150',
    backgroundColor: '#1a1d2e',
  },
  catIcon: { fontSize: 16 },
  catLabel: { color: '#8892a4', fontSize: 13 },
  saveBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
