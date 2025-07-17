import React, { useState } from 'react';
import moment from 'moment-hijri';
import { Moment } from 'moment';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Heading, Paragraph } from '../../components/base';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const IslamicCalendar = () => {
  const [currentHijriMonth, setCurrentHijriMonth] = useState<Moment>(moment());

  // Get today's Hijri date for highlighting
  const todayHijri = moment();
  const isToday = (day: number) => {
    // @ts-ignore: moment-hijri extends Moment with iYear, iMonth, iDate
    return (
      (todayHijri as any).iYear() === (currentHijriMonth as any).iYear() &&
      (todayHijri as any).iMonth() === (currentHijriMonth as any).iMonth() &&
      (todayHijri as any).iDate() === day
    );
  };

  const goToNextMonth = () => {
    setCurrentHijriMonth((prev: Moment) => moment(prev).add(1, 'iMonth'));
  };

  const goToPrevMonth = () => {
    setCurrentHijriMonth((prev: Moment) => moment(prev).subtract(1, 'iMonth'));
  };

  const renderWeeks = () => {
    const startOfMonth = moment(currentHijriMonth).startOf('iMonth');
    const endOfMonth = moment(currentHijriMonth).endOf('iMonth');
    const daysInMonth = endOfMonth.iDate();
    const startDay = startOfMonth.day();

    const daysArray = [];
    for (let i = 0; i < startDay; i++) {
      daysArray.push({ key: `empty-${i}`, label: '', empty: true });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({ key: `${i}`, label: i.toString(), empty: false });
    }
    while (daysArray.length % 7 !== 0) {
      daysArray.push({
        key: `empty-end-${daysArray.length}`,
        label: '',
        empty: true,
      });
    }
    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7));
    }
    return weeks;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Button onPress={goToPrevMonth} style={styles.navBtn}>
          <Paragraph>{'◀'}</Paragraph>
        </Button>
        <View style={styles.monthTitleWrapper}>
          <Heading level={2} style={styles.monthTitle}>
            {currentHijriMonth.format('iMMMM iYYYY')}
          </Heading>
        </View>
        <Button onPress={goToNextMonth} style={styles.navBtn}>
          <Paragraph>{'▶'}</Paragraph>
        </Button>
      </View>

      {/* Weekday Header */}
      <View style={styles.weekRow}>
        {weekDays.map((d, idx) => (
          <Paragraph key={idx} style={styles.dayHeader}>
            {d}
          </Paragraph>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.gridContainer}>
        {renderWeeks().map((week, wIdx) => (
          <View key={wIdx} style={styles.gridRow}>
            {week.map(item => (
              <View
                key={item.key}
                style={[
                  styles.dayCell,
                  item.empty && styles.emptyCell,
                  !item.empty &&
                    isToday(Number(item.label)) &&
                    styles.todayCell,
                ]}
              >
                <Paragraph
                  style={[
                    item.empty ? styles.emptyDay : styles.dayText,
                    !item.empty &&
                      isToday(Number(item.label)) &&
                      styles.todayText,
                  ]}
                >
                  {item.label}
                </Paragraph>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fafbfc',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  monthTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    width: 50,
    backgroundColor: 'transparent',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 4,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  gridContainer: {
    flexDirection: 'column',
    backgroundColor: '#f4f6fa',
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 8,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  dayCell: {
    flex: 1,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 1,
    marginVertical: 1,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
  emptyCell: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  dayText: {
    fontSize: 15,
    color: '#222',
  },
  emptyDay: {
    color: 'transparent',
  },
  todayCell: {
    backgroundColor: '#2563eb', // blue-600
    borderColor: '#2563eb',
  },
  todayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default IslamicCalendar;
