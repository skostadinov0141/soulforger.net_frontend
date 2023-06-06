export interface ITalent{
    id: string,
    category: string,
    fw: number,
    atts:string[],
    level_factor: string,
}

export class CTalent{
    talents:any[] = [
        {
        id: 'Fliegen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'GE',
        level_factor: 'B'
        },
        {
        id: 'Gaukeleien',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'CH',
        att_3: 'FF',
        level_factor: 'A'
        },
        {
        id: 'Klettern',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'GE',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        id: 'Körperbeherrschung',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'GE',
        att_2: 'GE',
        att_3: 'KO',
        level_factor: 'D'
        },
        {
        id: 'Kraftakt',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'KO',
        att_2: 'KK',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        id: 'Reiten',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'CH',
        att_2: 'GE',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        id: 'Schwimmen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'GE',
        att_2: 'KO',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        id: 'Selbstbeherrschung',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'MU',
        att_3: 'KO',
        level_factor: 'D'
        },
        {
        id: 'Singen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'CH',
        att_3: 'KO',
        level_factor: 'A'
        },
        {
        id: 'Sinnesschärfe',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'IN',
        level_factor: 'D'
        },
        {
        id: 'Tanzen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'CH',
        att_3: 'GE',
        level_factor: 'A'
        },
        {
        id: 'Taschendiebstahl',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'FF',
        att_3: 'GE',
        level_factor: 'B'
        },
        {
        id: 'Verbergen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'GE',
        level_factor: 'C'
        },
        {
        id: 'Zechen',
        category: 'Körpertalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KO',
        att_3: 'KK',
        level_factor: 'A'
        },
        {
        id: 'Bekehren & Überzeugen',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'KL',
        att_3: 'CH',
        level_factor: 'B'
        },
        {
        id: 'Betören',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'CH',
        att_3: 'CH',
        level_factor: 'B'
        },
        {
        id: 'Einschüchtern',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'B'
        },
        {
        id: 'Etikette',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'B'
        },
        {
        id: 'Gassenwissen',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'C'
        },
        {
        id: 'Menschenkenntnis',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'C'
        },
        {
        id: 'Überreden',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'C'
        },
        {
        id: 'Verkleiden',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'IN',
        att_2: 'CH',
        att_3: 'GE',
        level_factor: 'B'
        },
        {
        id: 'Willenskraft',
        category: 'Gesellschaftstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'D'
        },
        {
        id: 'Fährtensuchen',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'GE',
        level_factor: 'C'
        },
        {
        id: 'Fesseln',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'FF',
        att_3: 'KK',
        level_factor: 'A'
        },
        {
        id: 'Fischen & Angeln',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'GE',
        att_3: 'KO',
        level_factor: 'A'
        },
        {
        id: 'Orientierung',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        id: 'Pflanzenkunde',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'FF',
        att_3: 'KO',
        level_factor: 'C'
        },
        {
        id: 'Tierkunde',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'MU',
        att_3: 'CH',
        level_factor: 'C'
        },
        {
        id: 'Wildnisleben',
        category: 'Naturtalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'GE',
        att_3: 'KO',
        level_factor: 'C'
        },
        {
        id: 'Brett- & Glücksspiel ',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'A'
        },
        {
        id: 'Geographie',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        id: 'Geschichtswissen',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        id: 'Götter & Kulte',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        id: 'Kriegskunst',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        id: 'Magiekunde',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'C'
        },
        {
        id: 'Mechanik',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'FF',
        level_factor: 'B'
        },
        {
        id: 'Rechnen',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'A'
        },
        {
        id: 'Rechtskunde',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'A'
        },
        {
        id: 'Sagen & Legenden',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        id: 'Sphärenkunde',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        id: 'Sternkunde',
        category: 'Wissenstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'A'
        },
        {
        id: 'Alchimie',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'KL',
        att_3: 'FF',
        level_factor: 'C'
        },
        {
        id: 'Boote & Schiffe',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'GE',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        id: 'Fahrzeuge',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'CH',
        att_2: 'FF',
        att_3: 'KO',
        level_factor: 'A'
        },
        {
        id: 'Handel',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'IN',
        att_3: 'CH',
        level_factor: 'B'
        },
        {
        id: 'Heilkunde Gift',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'KL',
        att_3: 'IN',
        level_factor: 'B'
        },
        {
        id: 'Heilkunde Krankheiten',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'MU',
        att_2: 'IN',
        att_3: 'KO',
        level_factor: 'B'
        },
        {
        id: 'Heilkunde Seele',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'IN',
        att_2: 'CH',
        att_3: 'KO',
        level_factor: 'B'
        },
        {
        id: 'Heilkunde Wunden',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'FF',
        att_3: 'FF',
        level_factor: 'D'
        },
        {
        id: 'Holzbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'GE',
        att_3: 'KK',
        level_factor: 'B'
        },
        {
        id: 'Lebensmittelbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'IN',
        att_2: 'FF',
        att_3: 'FF',
        level_factor: 'A'
        },
        {
        id: 'Lederbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'GE',
        att_3: 'KO',
        level_factor: 'B'
        },
        {
        id: 'Malen & Zeichnen',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'IN',
        att_2: 'FF',
        att_3: 'FF',
        level_factor: 'A'
        },
        {
        id: 'Metallbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'KO',
        att_3: 'KK',
        level_factor: 'C'
        },
        {
        id: 'Musizieren',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'CH',
        att_2: 'FF',
        att_3: 'KO',
        level_factor: 'A'
        },
        {
        id: 'Schlösserknacken',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'IN',
        att_2: 'FF',
        att_3: 'FF',
        level_factor: 'C'
        },
        {
        id: 'Steinbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'FF',
        att_2: 'FF',
        att_3: 'KK',
        level_factor: 'A'
        },
        {
        id: 'Stoffbearbeitung',
        category: 'Handwerkstalente',
        fw: 0,
        att_1: 'KL',
        att_2: 'FF',
        att_3: 'FF',
        level_factor: 'A'
        }
    ]

    public getTalents(): ITalent[]{
        let result: ITalent[] = [];
        this.talents.forEach(element=>{
            result.push({
                id:element.id,
                category:element.category,
                fw:element.fw,
                atts:[element.att_1,element.att_2,element.att_3,],
                level_factor:element.level_factor
            });
        });
        return result;
    }

}