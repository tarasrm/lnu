// Timetable data for group ЕКПМ-11с
export const timetableData = {
  groupName: "ЕКПМ-11с",
  timeSlots: [
    { number: 6, start: "16:40", end: "18:00" },
    { number: 7, start: "18:10", end: "19:30" },
    { number: 8, start: "19:40", end: "21:00" },
  ],
  schedule: {
    monday: [
      {
        lectureNumber: 6,
        weekType: 1,
        title: "Прийняття управлінських рішень",
        teacher: "доц. Демко І.І.",
        type: "сем.",
        room: "ауд.113",
      },
      {
        lectureNumber: 6,
        weekType: 2,
        title: "Методологія наукових досліджень та академічна доброчесність",
        teacher: "проф. Урба С. І.",
        type: "сем.",
        room: "ауд.113",
      },
      {
        lectureNumber: 7,
        weekType: "every",
        title: "Прийняття управлінських рішень",
        teacher: "доц. Демко І.І.",
        type: "лек.",
        room: "ауд.113",
      },
    ],
    tuesday: [
      {
        lectureNumber: 7,
        weekType: 1,
        title: "Економічне управління у бізнес-структурах",
        teacher: "доц. Сухай О. Є.",
        type: "сем.",
        room: "ауд.115",
      },
      {
        lectureNumber: 7,
        weekType: 2,
        title: "Стратегічне управління бізнесом",
        teacher: "доц. Залога З. М.",
        type: "сем.",
        room: "ауд.115",
      },
      {
        lectureNumber: 8,
        weekType: "every",
        title: "Методологія наукових досліджень та академічна доброчесність",
        teacher: "проф. Урба С. І.",
        type: "лек.",
        room: "ауд.115",
      },
    ],
    wednesday: [
      {
        lectureNumber: 7,
        weekType: "every",
        title: "Стратегічне управління бізнесом",
        teacher: "доц. Залога З. М.",
        type: "лек.",
        room: "ауд.115",
      },
      {
        lectureNumber: 8,
        weekType: "every",
        title: "Економічне управління у бізнес-структурах",
        teacher: "доц. Сухай О. Є.",
        type: "лек.",
        room: "ауд.115",
      },
    ],
    thursday: [],
    friday: [
      {
        lectureNumber: 6,
        weekType: "every",
        title: "Управлінський облік",
        teacher: "доц. Пилипенко С. А.",
        type: "лек.",
        room: "ауд.115",
      },
      {
        lectureNumber: 7,
        weekType: 1,
        title: "Управлінський облік",
        teacher: "доц. Пилипенко С. А.",
        type: "сем.",
        room: "ауд.115",
      },
      {
        lectureNumber: 7,
        weekType: 2,
        title: "Інноваційний розвиток бізнесу",
        teacher: "доц. Косович Б. І.",
        type: "сем.",
        room: "ауд.115",
      },
      {
        lectureNumber: 8,
        weekType: "every",
        title: "Інноваційний розвиток бізнесу",
        teacher: "доц. Косович Б. І.",
        type: "лек.",
        room: "ауд.115",
      },
    ],
  },
};

export const dayNames = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"];
export const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday"];
