import axios from 'axios';

const ALADHAN_BASE_URL = 'https://api.aladhan.com/v1';

export interface PrayerTime {
  name: string;
  time: string;
}

export interface PrayerTimesData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface TimingsResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimesData;
    date: {
      readable: string;
      timestamp: string;
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
        };
        month: {
          number: number;
          en: string;
        };
        year: string;
      };
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
        };
        year: string;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
      };
    };
  };
}

/**
 * Fetch prayer times by coordinates
 * @param latitude - Latitude of the location
 * @param longitude - Longitude of the location
 * @param method - Calculation method (default: 2 for ISNA)
 * Methods: 1-MWL, 2-ISNA, 3-Egypt, 4-Makkah, 5-Karachi, 7-Tehran, 8-Jafari, etc.
 */
export const getPrayerTimesByCoordinates = async (
  latitude: number,
  longitude: number,
  method: number = 2,
): Promise<TimingsResponse> => {
  try {
    const response = await axios.get<TimingsResponse>(
      `${ALADHAN_BASE_URL}/timings`,
      {
        params: {
          latitude,
          longitude,
          method,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching prayer times by coordinates:', error);
    throw error;
  }
};

/**
 * Fetch prayer times by city
 * @param city - City name
 * @param country - Country name
 * @param method - Calculation method (default: 2 for ISNA)
 */
export const getPrayerTimesByCity = async (
  city: string,
  country: string,
  method: number = 2,
): Promise<TimingsResponse> => {
  try {
    const response = await axios.get<TimingsResponse>(
      `${ALADHAN_BASE_URL}/timingsByCity`,
      {
        params: {
          city,
          country,
          method,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching prayer times by city:', error);
    throw error;
  }
};

/**
 * Fetch prayer times by address
 * @param address - Full address string
 * @param method - Calculation method (default: 2 for ISNA)
 */
export const getPrayerTimesByAddress = async (
  address: string,
  method: number = 2,
): Promise<TimingsResponse> => {
  try {
    const response = await axios.get<TimingsResponse>(
      `${ALADHAN_BASE_URL}/timingsByAddress`,
      {
        params: {
          address,
          method,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching prayer times by address:', error);
    throw error;
  }
};

/**
 * Format prayer times for display
 * @param timings - Prayer times data from API
 * @returns Array of formatted prayer times
 */
export const formatPrayerTimes = (
  timings: PrayerTimesData,
): PrayerTime[] => {
  return [
    { name: 'Fajr', time: timings.Fajr },
    { name: 'Dhuhr', time: timings.Dhuhr },
    { name: 'Asr', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isha', time: timings.Isha },
  ];
};

/**
 * Get the next upcoming prayer
 * @param timings - Prayer times data from API
 * @returns Next prayer name and time
 */
export const getNextPrayer = (
  timings: PrayerTimesData,
): { name: string; time: string } | null => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Fajr', time: timings.Fajr },
    { name: 'Dhuhr', time: timings.Dhuhr },
    { name: 'Asr', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isha', time: timings.Isha },
  ];

  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerTime = hours * 60 + minutes;

    if (prayerTime > currentTime) {
      return prayer;
    }
  }

  // If no prayer is left today, return Fajr as next prayer
  return prayers[0];
};

/**
 * Calculate countdown to next prayer
 * @param nextPrayerTime - Time string in HH:MM format
 * @returns Object with hours, minutes, and seconds
 */
export const calculateCountdown = (
  nextPrayerTime: string,
): { hours: string; minutes: string; seconds: string } => {
  const now = new Date();
  const [hours, minutes] = nextPrayerTime.split(':').map(Number);

  const prayerDate = new Date();
  prayerDate.setHours(hours, minutes, 0, 0);

  // If prayer time has passed today, set it for tomorrow
  if (prayerDate < now) {
    prayerDate.setDate(prayerDate.getDate() + 1);
  }

  const diff = prayerDate.getTime() - now.getTime();
  const totalSeconds = Math.floor(diff / 1000);

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return {
    hours: h.toString().padStart(2, '0'),
    minutes: m.toString().padStart(2, '0'),
    seconds: s.toString().padStart(2, '0'),
  };
};

export interface QuranVerse {
  number: number;
  text: string;
  edition: {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
  };
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    numberOfAyahs: number;
  };
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface QuranVerseResponse {
  code: number;
  status: string;
  data: QuranVerse;
}

/**
 * Fetch a random Quranic verse
 * @param edition - Translation edition (default: 'en.asad' for English)
 * @returns Random Quranic verse with translation
 */
export const getRandomQuranVerse = async (
  edition: string = 'en.asad',
): Promise<QuranVerseResponse> => {
  try {
    // Use a random ayah number from the entire Quran (1-6236 total ayahs)
    const randomAyahNumber = Math.floor(Math.random() * 6236) + 1;
    
    // Use AlQuran Cloud API instead
    const response = await axios.get<QuranVerseResponse>(
      `https://api.alquran.cloud/v1/ayah/${randomAyahNumber}/${edition}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching random Quran verse:', error);
    throw error;
  }
};
