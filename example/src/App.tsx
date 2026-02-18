import { Text, View, StyleSheet } from 'react-native';
import {
  today,
  toHijri,
  toGregorian,
  getDaysInMonth,
  fromTimestamp,
} from 'hijri-native';

const hijriToday = today('Asia/Riyadh');
const hijriFromGreg = toHijri(2026, 2, 18);
const backToGreg = toGregorian(
  hijriFromGreg.year,
  hijriFromGreg.month,
  hijriFromGreg.day
);
const daysInMonth = getDaysInMonth(hijriToday.month, hijriToday.year);
const fromTs = fromTimestamp(Math.floor(Date.now() / 1000), 'Asia/Riyadh');

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>hijri-native</Text>

      <Text style={styles.label}>today (Mecca):</Text>
      <Text>
        {hijriToday.day}/{hijriToday.month}/{hijriToday.year}
      </Text>

      <Text style={styles.label}>toHijri(2026, 2, 18):</Text>
      <Text>
        {hijriFromGreg.day}/{hijriFromGreg.month}/{hijriFromGreg.year}
      </Text>

      <Text style={styles.label}>back to Gregorian:</Text>
      <Text>
        {backToGreg.day}/{backToGreg.month}/{backToGreg.year}
      </Text>

      <Text style={styles.label}>days in current month:</Text>
      <Text>{daysInMonth}</Text>

      <Text style={styles.label}>fromTimestamp (Mecca):</Text>
      <Text>
        {fromTs.day}/{fromTs.month}/{fromTs.year}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
    color: '#666',
  },
});
