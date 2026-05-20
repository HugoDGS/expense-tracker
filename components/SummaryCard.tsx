import { View, Text, StyleSheet } from 'react-native';

type Props = {
  total: number;
  budget?: number;
  month: string;
};

export default function SummaryCard({ total, budget, month }: Props) {
  const label = new Date(month + '-01').toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const remaining = budget ? budget - total : null;
  const percent = budget ? Math.min((total / budget) * 100, 100) : null;
  const overBudget = remaining !== null && remaining < 0;

  return (
    <View style={styles.card}>
      <Text style={styles.month}>{label}</Text>
      <Text style={styles.total}>€{total.toFixed(2)}</Text>
      <Text style={styles.label}>spent this month</Text>
      {budget ? (
        <>
          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${percent}%` as any,
                  backgroundColor:
                    percent! > 90 ? '#ef4444' : percent! > 70 ? '#f59e0b' : '#6366f1',
                },
              ]}
            />
          </View>
          <Text style={[styles.remaining, overBudget && { color: '#ef4444' }]}>
            {overBudget
              ? `€${Math.abs(remaining!).toFixed(2)} over budget`
              : `€${remaining!.toFixed(2)} remaining of €${budget.toFixed(2)}`}
          </Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1d2e',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    borderWidth: 1,
    borderColor: '#2e3150',
    borderTopWidth: 3,
    borderTopColor: '#6366f1',
  },
  month: { color: '#8892a4', fontSize: 13, marginBottom: 4 },
  total: { color: '#e2e8f0', fontSize: 38, fontWeight: '700' },
  label: { color: '#8892a4', fontSize: 13, marginBottom: 14 },
  progressBg: {
    height: 6,
    backgroundColor: '#2e3150',
    borderRadius: 99,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: { height: 6, borderRadius: 99 },
  remaining: { color: '#8892a4', fontSize: 12 },
});
