import React, { useState } from 'react';
import moment from 'moment-hijri';
import { Moment } from 'moment';
import { StyleSheet, View } from 'react-native';
import { Button, Heading, Paragraph } from '../../components/base';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const IslamicCalendar = () => {
  const [baseHijriMonth, setBaseHijriMonth] = useState<Moment>(moment());

  // Get today's Hijri date for highlighting
  const todayHijri = moment();
  const isToday = (date: Moment) => {
    // @ts-ignore: moment-hijri extends Moment with iYear, iMonth, iDate
    return (
      (todayHijri as any).iYear() === (date as any).iYear() &&
      (todayHijri as any).iMonth() === (date as any).iMonth() &&
      (todayHijri as any).iDate() === (date as any).iDate()
    );
  };

  const goToNextMonth = () => {
    setBaseHijriMonth(prev => moment(prev).add(1, 'iMonth'));
  };

  const goToPrevMonth = () => {
    setBaseHijriMonth(prev => moment(prev).subtract(1, 'iMonth'));
  };

  // Helper to render a single month's calendar
  const renderMonth = (monthMoment: Moment) => {
    const startOfMonth = moment(monthMoment).startOf('iMonth');
    const endOfMonth = moment(monthMoment).endOf('iMonth');
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

    return (
      <View style={styles.monthContainer}>
        <Heading level={2} style={styles.monthTitle}>
          {monthMoment.format('iMMMM iYYYY')}
        </Heading>
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
          {weeks.map((week, wIdx) => (
            <View key={wIdx} style={styles.gridRow}>
              {week.map((item, idx) => {
                const cellDate = !item.empty
                  ? moment(monthMoment).startOf('iMonth').add(Number(item.label) - 1, 'days')
                  : null;
                return (
                  <View
                    key={item.key}
                    style={[
                      styles.dayCell,
                      item.empty && styles.emptyCell,
                      !item.empty && cellDate && isToday(cellDate) && styles.todayCell,
                    ]}
                  >
                    <Paragraph
                      style={[
                        item.empty ? styles.emptyDay : styles.dayText,
                        !item.empty && cellDate && isToday(cellDate) && styles.todayText,
                      ]}
                    >
                      {item.label}
                    </Paragraph>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Calculate the two months to display
  const firstMonth = moment(baseHijriMonth);
  const secondMonth = moment(baseHijriMonth).add(1, 'iMonth');

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.headerRow}>
        <Button onPress={goToPrevMonth} style={styles.navBtn}>
          <Paragraph>{'◀'}</Paragraph>
        </Button>
        <View style={styles.monthTitleWrapper}>
          <Heading level={3} style={styles.calTitle}>Islamic Calendar</Heading>
        </View>
        <Button onPress={goToNextMonth} style={styles.navBtn}>
          <Paragraph>{'▶'}</Paragraph>
        </Button>
      </View>
      {/* First Month */}
      {renderMonth(firstMonth)}
      {/* Second Month */}
      {renderMonth(secondMonth)}
      {/* Bottom Navigation */}
      <View style={styles.headerRow}>
        <Button onPress={goToPrevMonth} style={styles.navBtn}>
          <Paragraph>{'◀'}</Paragraph>
        </Button>
        <View style={styles.monthTitleWrapper} />
        <Button onPress={goToNextMonth} style={styles.navBtn}>
          <Paragraph>{'▶'}</Paragraph>
        </Button>
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
    marginBottom: 8,
    marginTop: 8,
  },
  calTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
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
  monthContainer: {
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 4,
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
