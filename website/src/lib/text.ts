// Adds invisible break points to long German compounds, so a headline on a
// narrow phone breaks as "Treppenhaus-reinigung" and never in the middle of a
// word part. Search engines and screen readers ignore the soft hyphen.
const SHY = '­';
const compounds = /(Treppenhaus|Gebäude|Sonder|Büro|Unterhalts|Grund|Haushalts|Keller|Umzugs|Firmen|Privat)(reinigung|auflösung|entrümpelung|service|umzüge|umzug)/g;

export const shy = (text: string) => text.replaceAll(SHY, '').replace(compounds, `$1${SHY}$2`);
