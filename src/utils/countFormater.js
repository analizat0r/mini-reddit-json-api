export default function numFormater(numToFormat) {
    const nf = new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1
    });

    return nf.format(numToFormat);
}