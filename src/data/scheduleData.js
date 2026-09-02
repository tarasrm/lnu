export const scheduleData = {
  groupName: "ЕКПМ-21с",
  timeSlots: [
    { number: 5, start: "15:05", end: "16:25" },
    { number: 6, start: "16:40", end: "18:00" },
    { number: 7, start: "18:10", end: "19:30" },
    { number: 8, start: "19:40", end: "21:00" },
  ],
  schedule: {
    monday: [
      {
        lectureNumber: 6,
        weekType: "every",
        title: "Ризик-менеджмент",
        teacher: "доц. Косович Б.І.",
        type: "лек.",
        room: "ауд.Ч336",
      },
      {
        lectureNumber: 7,
        weekType: "every",
        title: "Ризик-менеджмент",
        teacher: "доц. Косович Б.І.",
        type: "сем.",
        room: "ауд.Ч336",
      },
      {
        lectureNumber: 8,
        weekType: "every",
        title: "Корпоративне управління",
        teacher: "доц. Демко І.І.",
        type: "лек.",
        room: "ауд.Ч336",
      },
    ],
    tuesday: [
      {
        lectureNumber: 7,
        weekType: "every",
        title: "Мотивація та стимулювання персоналу",
        teacher: "доц. Червона О.Ю.",
        type: "лек.",
        room: "ауд.Ч208",
      },
      {
        lectureNumber: 8,
        weekType: "every",
        title: "Мотивація та стимулювання персоналу",
        teacher: "доц. Червона О.Ю.",
        type: "сем.",
        room: "ауд.Ч208",
      },
    ],
    wednesday: [
      {
        lectureNumber: 7,
        weekType: 1,
        title: "Мотивація та стимулювання персоналу",
        teacher: "доц. Червона О.Ю.",
        type: "лек.",
        room: "ауд.105",
      },
      {
        lectureNumber: 7,
        weekType: 2,
        title: "Ризик-менеджмент",
        teacher: "доц. Косович Б.І.",
        type: "лек.",
        room: "ауд.105",
      },
      {
        lectureNumber: 8,
        weekType: "every",
        title: "Корпоративне управління",
        teacher: "доц. Демко І.І.",
        type: "сем.",
        room: "ауд.Ч336",
      },
    ],
    thursday: [],
    friday: [
      {
        lectureNumber: 7,
        weekType: "every",
        title: "Бізнес-консалтинг",
        teacher: "доц. Шевчук В.Р.",
        type: "лек.",
        room: "ауд.Ч316",
      },
      {
        lectureNumber: 8,
        weekType: "every",
        title: "Бізнес-консалтинг",
        teacher: "доц. Шевчук В.Р.",
        type: "сем.",
        room: "ауд.Ч316",
      },
    ],
  },
};

export const dayNames = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"];
export const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday"];