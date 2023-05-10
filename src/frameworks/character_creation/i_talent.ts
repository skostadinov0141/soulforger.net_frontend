export interface ITalent{
    name: string,
    category: string,
    fw: number,
    att_1:string,
    att_2:string,
    att_3:string,
    level_factor: string,
}

export class CTalent{
    talents:ITalent[] = [
        {
        name: 'Fliegen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'GE',
        level_factor: 'B'
        },
        {
        name: 'Gaukeleien',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'CH',
        att_3: 'FF',
        level_factor: 'A'
        },
        {
        name: 'Klettern',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'GE',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        name: 'Körperbeherrschung',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'GE',
        att_2: 'GE',
        att_3: 'KO',
        level_factor: 'D'
        },
        {
        name: 'Kraftakt',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'KO',
        att_2: 'KK',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        name: 'Reiten',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'CH',
        att_2: 'GE',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        name: 'Schwimmen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'GE',
        att_2: 'KO',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        name: 'Selbstbeherrschung',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'MU',
        att_3: 'KO',
        level_factor: 'D'
        },
        {
        name: 'Singen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'CH',
        att_3: 'KO',
        level_factor: 'A'
        },
        {
        name: 'Sinnesschärfe',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'IN',
        level_factor: 'D'
        },
        {
        name: 'Tanzen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'CH',
        att_3: 'GE',
        level_factor: 'A'
        },
        {
        name: 'Taschendiebstahl',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'FF',
        att_3: 'GE',
        level_factor: 'B'
        },
        {
        name: 'Verbergen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'GE',
        level_factor: 'C'
        },
        {
        name: 'Zechen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KO',
        att_3: 'KK',
        level_factor: 'A'
        },
        {
        name: 'Bekehren & Überzeugen',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'KL',
        att_3: 'CH',
        level_factor: 'B'
        },
        {
        name: 'Betören',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'CH',
        att_3: 'CH',
        level_factor: 'B'
        },
        {
        name: 'Einschüchtern',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'B'
        },
        {
        name: 'Etikette',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'B'
        },
        {
        name: 'Gassenwissen',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'C'
        },
        {
        name: 'Menschenkenntnis',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'C'
        },
        {
        name: 'Überreden',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'C'
        },
        {
        name: 'Verkleiden',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'IN',
        att_2: 'CH',
        att_3: 'GE',
        level_factor: 'B'
        },
        {
        name: 'Willenskraft',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'D'
        },
        {
        name: 'Fährtensuchen',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'GE',
        level_factor: 'C'
        },
        {
        name: 'Fesseln',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'FF',
        att_3: 'KK',
        level_factor: 'A'
        },
        {
        name: 'Fischen & Angeln',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'GE',
        att_3: 'KO',
        level_factor: 'A'
        },
        {
        name: 'Orientierung',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        name: 'Pflanzenkunde',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'FF',
        att_3: 'KO',
        level_factor: 'C'
        },
        {
        name: 'Tierkunde',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'MU',
        att_3: 'CH',
        level_factor: 'C'
        },
        {
        name: 'Wildnisleben',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'GE',
        att_3: 'KO',
        level_factor: 'C'
        },
        {
        name: 'Brett- & Glücksspiel ',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'A'
        },
        {
        name: 'Geographie',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        name: 'Geschichtswissen',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        name: 'Götter & Kulte',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        name: 'Kriegskunst',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        name: 'Magiekunde',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'C'
        },
        {
        name: 'Mechanik',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'FF',
        level_factor: 'B'
        },
        {
        name: 'Rechnen',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'A'
        },
        {
        name: 'Rechtskunde',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'A'
        },
        {
        name: 'Sagen & Legenden',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        name: 'Sphärenkunde',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        name: 'Sternkunde',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'A'
        },
        {
        name: 'Alchimie',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'KL',
        att_3: 'FF',
        level_factor: 'C'
        },
        {
        name: 'Boote & Schiffe',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'GE',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        name: 'Fahrzeuge',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'CH',
        att_2: 'FF',
        att_3: 'KO',
        level_factor: 'A'
        },
        {
        name: 'Handel',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'B'
        },
        {
        name: 'Heilkunde Gift',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        name: 'Heilkunde Krankheiten',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'KO',
        level_factor: 'B'
        },
        {
        name: 'Heilkunde Seele',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'IN',
        att_2: 'CH',
        att_3: 'KO',
        level_factor: 'B'
        },
        {
        name: 'Heilkunde Wunden',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'FF',
        att_3: 'FF',
        level_factor: 'D'
        },
        {
        name: 'Holzbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'GE',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        name: 'Lebensmittelbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'IN',
        att_2: 'FF',
        att_3: 'FF',
        level_factor: 'A'
        },
        {
        name: 'Lederbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'GE',
        att_3: 'KO',
        level_factor: 'B'
        },
        {
        name: 'Malen & Zeichnen',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'IN',
        att_2: 'FF',
        att_3: 'FF',
        level_factor: 'A'
        },
        {
        name: 'Metallbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'KO',
        att_3: 'KK',
        level_factor: 'C'
        },
        {
        name: 'Musizieren',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'CH',
        att_2: 'FF',
        att_3: 'KO',
        level_factor: 'A'
        },
        {
        name: 'Schlösserknacken',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'IN',
        att_2: 'FF',
        att_3: 'FF',
        level_factor: 'C'
        },
        {
        name: 'Steinbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'FF',
        att_3: 'KK',
        level_factor: 'A'
        },
        {
        name: 'Stoffbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'FF',
        att_3: 'FF',
        level_factor: 'A'
        }
    ]
}