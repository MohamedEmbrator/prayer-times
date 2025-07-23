import { useEffect, useState } from "react";
import Row from "./components/row";

const cities: { name: string; value: string }[] = [
  { name: "القاهرة", value: "cairo" },
  { name: "الإسكندرية", value: "alexandrea" },
  { name: "المنيا", value: "minya" },
  { name: "الجيزة", value: "giza" },
  { name: "المنصورة", value: "mansoura" },
  { name: "أسوان", value: "aswan" },
  { name: "الأقصر", value: "luxor" }
];

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}
interface HijriDate {
  month: {ar: string};
  year: string;
  day: string;
}

function App() {
  const emptyObject: PrayerTimes = { Fajr: "", Dhuhr: "", Asr: "", Maghrib: "", Isha: "" };
  const emptyObject2: HijriDate = { month: { ar: "" }, year: "", day: "" };
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(emptyObject);
  const [date, setDate] = useState<HijriDate>(emptyObject2);
  const [city, setCity] = useState("cairo");
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/23-07-2025?city=${city}&country=egypt&method=8`);
        const response_data = await response.json();
        setPrayerTimes(response_data.data.timings);
        setDate(response_data.data.date.hijri)
      } catch (error) { 
        console.error(error);
      }
    } 
    fetchPrayerTimes()
  }, [city])
  function formatTime(time: string) {
    if (!time) {
      return "00:00";
    } else {
      // eslint-disable-next-line prefer-const
      let [hours, minutes] = time.split(":").map(Number);
      const amAndPM = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}  ${amAndPM}`
    }
  }
  return (
    <section>
      <div className="container">
        <div className="top-section">
          <div className="city">
            <h3>المدينة : </h3>
            <select onChange={(e) => setCity(e.target.value)}>
              {cities.map((city, index) => (<option key={index} value={city.value}>{city.name}</option>))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ بالتقويم الهجري</h3>
            <h4>{`${date.day}  ${date.month.ar}  ${date.year}`}</h4>
          </div>
        </div>
        <Row name={"الـفـجـر : "} time={formatTime(prayerTimes.Fajr)} />
        <Row name={"الـظـهـر : "} time={formatTime(prayerTimes.Dhuhr)} />
        <Row name={"العـصـر : "} time={formatTime(prayerTimes.Asr)}/>
        <Row name={"الـمـغـرب : "} time={formatTime(prayerTimes.Maghrib)} />
        <Row name={"الـعـشـاء : "} time={formatTime(prayerTimes.Isha)} />
      </div>
    </section>
  );
}

export default App;
