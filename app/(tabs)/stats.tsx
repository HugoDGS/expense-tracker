import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useExpenses } from '../../hooks/useExpenses';
import { getCategoryById } from '../../constants/categories';

const { width } = Dimensions.get('window');
const SIZE = width * 0.55;
const R = SIZE / 2;

function polarToXY(radius: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: R + radius * Math.cos(rad), y: R + radius * Math.sin(rad) };
}

function arcPath(startDeg: number, endDeg: number, radius: number): string {
  const s = polarToXY(radius, startDeg);
  const e = polarToXY(radius, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${R} ${R} L ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y} Z`;
}

type Slice = { category: string; total: number };

function PieChart({ data, totalAmount }: { data: Slice[]; totalAmount: number }) {
  if (totalAmount === 0) return null;
  let angle = 0;

  return (
    <View style={{ alignItems: 'center', marginVertical: 8 }}>
      <Svg width={SIZE} height={SIZE}>
        {data.map((d) => {
          const cat = getCategoryById(d.category);
          const sweep = (d.total / totalAmount) * 360;
          const path = arcPath(angle, angle + sweep, R - 6);
          angle += sweep;
          return <Path key={d.category} d={path} fill={cat.color} />;
        })}
        <Circle cx={R} cy={R} r={R * 0.42} fill="#0f1117" />
      </Svg>
      <Text style={styles.centerLabel}>€{totalAmount.toFixed(0)}</Text>
    </View>
  );
}

export default function StatsScreen() {
  const { stats, total } = useExpenses();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={styles.title}>Spending breakdown</Text>

      {stats.length === 0 ? (
        <Text style={styles.empty}>No data for this month</Text>
      ) : (
        <>
          <PieChart data={stats} totalAmount={total} />
          {stats.map((s) => {
            const cat = getCategoryById(s.category);
            const pct = total > 0 ? ((s.total / total) * 100).toFixed(0) : '0';
            return (
              <View key={s.category} style={styles.row}>
                <View style={styles.rowLeft}>
                  <View style={[styles.dot, { backgroundColor: cat.color }]} />
                  <Text style={styles.rowIcon}>{cat.icon}</Text>
                  <Text style={styles.rowLabel}>{cat.label}</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.rowAmount}>€{s.total.toFixed(2)}</Text>
                  <Text style={styles.rowPct}>{pct}%</Text>
                </View>
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1117' },
  title: { color: '#e2e8f0', fontSize: 18, fontWeight: '700', marginBottom: 12 },
  empty: { color: '#8892a4', textAlign: 'center', marginTop: 48, fontSize: 14 },
  centerLabel: {
    position: 'absolute',
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: '700',
    top: SIZE / 2 - 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1d2e',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2e3150',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  rowIcon: { fontSize: 18 },
  rowLabel: { color: '#e2e8f0', fontSize: 14 },
  rowRight: { alignItems: 'flex-end' },
  rowAmount: { color: '#e2e8f0', fontSize: 14, fontWeight: '600' },
  rowPct: { color: '#8892a4', fontSize: 12 },
});
