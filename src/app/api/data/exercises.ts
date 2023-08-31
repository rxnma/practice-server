import { ExerciseListType } from "@/app/types/types";

const exercises: ExerciseListType = [
  {
    id: 10000,
    category: "Select",
    level: "Einfach",
    question: "Alle Informationen über Animes abrufen.",
    solution: "\n\t\tSELECT * FROM animes;\n\t  ",
    result: [
      {
        id: 1,
        title: "One Piece",
        year_of_broadcast: 1999,
        languages: ["Japanese", "English"],
      },
      {
        id: 2,
        title: "Naruto",
        year_of_broadcast: 2002,
        languages: ["Japanese", "English"],
      },
      {
        id: 3,
        title: "Dragon Ball Z",
        year_of_broadcast: 1989,
        languages: ["Japanese", "English"],
      },
      {
        id: 4,
        title: "Attack on Titan",
        year_of_broadcast: 2013,
        languages: ["Japanese", "English"],
      },
      {
        id: 5,
        title: "Death Note",
        year_of_broadcast: 2006,
        languages: ["Japanese", "English"],
      },
      {
        id: 6,
        title: "My Hero Academia",
        year_of_broadcast: 2016,
        languages: ["Japanese", "English"],
      },
      {
        id: 7,
        title: "Fullmetal Alchemist: Brotherhood",
        year_of_broadcast: 2009,
        languages: ["Japanese", "English"],
      },
      {
        id: 8,
        title: "Demon Slayer",
        year_of_broadcast: 2019,
        languages: ["Japanese", "English"],
      },
      {
        id: 9,
        title: "One Punch Man",
        year_of_broadcast: 2015,
        languages: ["Japanese", "English"],
      },
      {
        id: 10,
        title: "Tokyo Ghoul",
        year_of_broadcast: 2014,
        languages: ["Japanese", "English"],
      },
      {
        id: 11,
        title: "Sword Art Online",
        year_of_broadcast: 2012,
        languages: ["Japanese", "English"],
      },
      {
        id: 12,
        title: "Hunter x Hunter",
        year_of_broadcast: 2011,
        languages: ["Japanese", "English"],
      },
      {
        id: 13,
        title: "Black Clover",
        year_of_broadcast: 2017,
        languages: ["Japanese", "English"],
      },
      {
        id: 14,
        title: "Fairy Tail",
        year_of_broadcast: 2009,
        languages: ["Japanese", "English"],
      },
      {
        id: 15,
        title: "JoJo's Bizarre Adventure",
        year_of_broadcast: 2012,
        languages: ["Japanese", "English"],
      },
    ],
  },
  {
    id: 10001,
    category: "Select",
    level: "Einfach",
    question:
      "Liste die Titel und Ausstrahlungsjahre von Animes, die nach 2010 veröffentlicht wurden.",
    solution:
      "\n\t\tSELECT title, year_of_broadcast\n\t\tFROM animes\n\t\tWHERE year_of_broadcast > 2010;\n\t  ",
    result: [
      {
        title: "Attack on Titan",
        year_of_broadcast: 2013,
      },
      {
        title: "My Hero Academia",
        year_of_broadcast: 2016,
      },
      {
        title: "Demon Slayer",
        year_of_broadcast: 2019,
      },
      {
        title: "One Punch Man",
        year_of_broadcast: 2015,
      },
      {
        title: "Tokyo Ghoul",
        year_of_broadcast: 2014,
      },
      {
        title: "Sword Art Online",
        year_of_broadcast: 2012,
      },
      {
        title: "Hunter x Hunter",
        year_of_broadcast: 2011,
      },
      {
        title: "Black Clover",
        year_of_broadcast: 2017,
      },
      {
        title: "JoJo's Bizarre Adventure",
        year_of_broadcast: 2012,
      },
    ],
  },
  {
    id: 10002,
    category: "Select",
    level: "Mittel",
    question:
      "Die Namen und Geburtsdaten von Anime-Charakteren abrufen, die die Rolle des 'Protagonisten' haben.",
    solution:
      "\n\t\tSELECT name, birth_date\n\t\tFROM anime_characters\n\t\tWHERE role = 'Protagonist';\n\t  ",
    result: [
      {
        name: "Monkey D. Luffy",
        birth_date: "1994-05-04T22:00:00.000Z",
      },
      {
        name: "Naruto Uzumaki",
        birth_date: "1997-10-09T22:00:00.000Z",
      },
      {
        name: "Goku",
        birth_date: "1973-04-15T23:00:00.000Z",
      },
      {
        name: "Eren Yeager",
        birth_date: "1995-03-29T22:00:00.000Z",
      },
      {
        name: "Deku",
        birth_date: "2000-07-14T22:00:00.000Z",
      },
      {
        name: "Edward Elric",
        birth_date: "1899-10-10T23:00:00.000Z",
      },
      {
        name: "Tanjiro Kamado",
        birth_date: "2001-07-13T22:00:00.000Z",
      },
      {
        name: "Saitama",
        birth_date: "1985-12-11T23:00:00.000Z",
      },
      {
        name: "Ken Kaneki",
        birth_date: "1994-12-19T23:00:00.000Z",
      },
      {
        name: "Kirito",
        birth_date: "2008-10-06T22:00:00.000Z",
      },
      {
        name: "Gon Freecss",
        birth_date: "1999-05-04T22:00:00.000Z",
      },
      {
        name: "Asta",
        birth_date: "2001-08-07T22:00:00.000Z",
      },
      {
        name: "Natsu Dragneel",
        birth_date: "2000-11-22T23:00:00.000Z",
      },
      {
        name: "Jotaro Kujo",
        birth_date: "1969-12-31T23:00:00.000Z",
      },
    ],
  },
  {
    id: 10003,
    category: "Aggregation",
    level: "Einfach",
    question:
      "Zähle die Anzahl der Animes, die sowohl in 'Japanisch' als auch in 'Englisch' ausgestrahlt wurden.",
    solution:
      "\n\t\tSELECT COUNT(*) AS num_animes\n\t\tFROM animes\n\t\tWHERE 'Japanese' = ANY(languages) AND 'English' = ANY(languages);\n\t  ",
    result: [
      {
        num_animes: "15",
      },
    ],
  },
  {
    id: 10004,
    category: "Select",
    level: "Mittel",
    question:
      "Finde die Namen von Anime-Charakteren, die die Fähigkeit 'Super Saiyan Transformationen' haben.",
    solution:
      "\n\t\tSELECT name\n\t\tFROM anime_characters\n\t\tWHERE 'Super Saiyan Transformationen' = ANY(skills);\n\t  ",
    result: [],
  },
  {
    id: 10005,
    category: "Join",
    level: "Mittel",
    question:
      "Liste die Anime-Titel zusammen mit der Anzahl der Charaktere für jeden Anime auf.",
    solution:
      "\n\t\tSELECT a.title, COUNT(c.id) AS num_characters\n\t\tFROM animes a\n\t\tLEFT JOIN anime_characters c ON a.id = c.anime_id\n\t\tGROUP BY a.title;\n\t  ",
    result: [],
  },
  {
    id: 10006,
    category: "Select",
    level: "Einfach",
    question:
      "Die Namen und Geburtsdaten von Charakteren abrufen, die vor dem Jahr 2000 geboren wurden, sortiert nach Geburtsdatum.",
    solution:
      "\n\t\tSELECT name, birth_date\n\t\tFROM anime_characters\n\t\tWHERE EXTRACT(YEAR FROM birth_date) < 2000\n\t\tORDER BY birth_date;\n\t  ",
    result: [
      {
        name: "Edward Elric",
        birth_date: "1899-10-10T23:00:00.000Z",
      },
      {
        name: "Jotaro Kujo",
        birth_date: "1969-12-31T23:00:00.000Z",
      },
      {
        name: "Goku",
        birth_date: "1973-04-15T23:00:00.000Z",
      },
      {
        name: "Saitama",
        birth_date: "1985-12-11T23:00:00.000Z",
      },
      {
        name: "Light Yagami",
        birth_date: "1986-02-27T23:00:00.000Z",
      },
      {
        name: "Monkey D. Luffy",
        birth_date: "1994-05-04T22:00:00.000Z",
      },
      {
        name: "Ken Kaneki",
        birth_date: "1994-12-19T23:00:00.000Z",
      },
      {
        name: "Eren Yeager",
        birth_date: "1995-03-29T22:00:00.000Z",
      },
      {
        name: "Naruto Uzumaki",
        birth_date: "1997-10-09T22:00:00.000Z",
      },
      {
        name: "Gon Freecss",
        birth_date: "1999-05-04T22:00:00.000Z",
      },
    ],
  },
  {
    id: 10007,
    category: "Aggregation",
    level: "Mittel",
    question:
      "Zähle die Gesamtzahl der Charaktere für jede Rolle (Protagonist, Antagonist, etc.).",
    solution:
      "\n\t\tSELECT role, COUNT(*) AS num_characters\n\t\tFROM anime_characters\n\t\tGROUP BY role;\n\t  ",
    result: [
      {
        role: "Antagonist",
        num_characters: "1",
      },
      {
        role: "Protagonist",
        num_characters: "14",
      },
    ],
  },
  {
    id: 10008,
    category: "Select",
    level: "Mittel",
    question:
      "Finde die Anime-Titel, die Charaktere mit Fähigkeiten im Zusammenhang mit 'Magie' haben.",
    solution:
      "\n\t\tSELECT DISTINCT a.title\n\t\tFROM animes a\n\t\tINNER JOIN anime_characters c ON a.id = c.anime_id\n\t\tWHERE 'Magie' = ANY(c.skills);\n\t  ",
    result: [],
  },
  {
    id: 10009,
    category: "Select",
    level: "Mittel",
    question:
      "Die Anime-Titel abrufen, die keine Charaktere mit Fähigkeiten 'Titan Shifter' haben.",
    solution:
      "\n\t\tSELECT a.title\n\t\tFROM animes a\n\t\tLEFT JOIN anime_characters c ON a.id = c.anime_id\n\t\tWHERE c.id IS NULL OR 'Titan Shifter' != ANY(c.skills);\n\t  ",
    result: [],
  },
];

export default exercises;
