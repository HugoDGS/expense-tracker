import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import { CATEGORIES } from '../../constants/categories';
import { getBudgets, setBudget } from '../../lib/database';

export default function SettingsScreen() {
  const [budgets, setBudgets] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = getBudgets();
    setBudgets(
      Object.fromEntries(Object.entries(saved).map(([k, v]) => [k, String(v)]))
    );
  }, []);

  const handleSave = () => {
    let valid = true;
    Object.entries(budgets).forEach(([category, value]) => {
      if (!value) return;
      const num = parseFloat(value.replace(',', '.'));
      if (isNaN(num) || num < 0) {
        valid = false;
        return;
      }
      setBudget(category, num);
    });

    if (!valid) {
      Alert.alert('Invalid value', 'Please enter valid positive amounts.');
      return;
    }
    Alert.alert('Saved', 'Monthly budgets updated.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.subtitle}>
        Set monthly spending limits per category
      </Text>

      {CATEGORIES.map((cat) => (
        <View key={cat.id} style={styles.row}>
          <View style={styles.rowLeft}>
            <View style={[styles.dot, { backgroundColor: cat.color }]} />
            <Text style={styles.icon}>{cat.icon}</Text>
            <Text style={styles.label}>{cat.label}</Text>
          </View>
          <View style={styles.inputWrap}>
            <Text style={styles.euro}>€</Text>
            <TextInput
              style={styles.input}
              value={budgets[cat.id] ?? ''}
              onChangeText={(v) => setBudgets((b) => ({ ...b, [cat.id]: v }))}
              placeholder="—"
              placeholderTextColor="#8892a4"
              keyboardType="decimal-pad"
            />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save budgets</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1117' },
  subtitle: { color: '#8892a4', fontSize: 13, marginBottom: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1d2e',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2e3150',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  icon: { fontSize: 20 },
  label: { color: '#e2e8f0', fontSize: 14 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  euro: { color: '#8892a4', fontSize: 14 },
  input: {
    backgroundColor: '#242740',
    borderWidth: 1,
    borderColor: '#2e3150',
    borderRadius: 8,
    padding: 8,
    color: '#e2e8f0',
    fontSize: 14,
    width: 90,
    textAlign: 'right',
  },
  saveBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
