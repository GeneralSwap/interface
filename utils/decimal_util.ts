import {BigNumber} from "@ethersproject/bignumber";
import {formatUnits} from "@ethersproject/units";


export const formatUnitsWithPrecision = (value: BigNumber, precision: number) => {
    let units = formatUnits(value, 'ether')
    const dotIndex = units.indexOf('.')
    if (dotIndex != -1 && dotIndex < (units.length - precision - 1)) {
        units = units.substring(0, dotIndex + precision + 1)
        // if (units.endsWith('0')) {
        //     units = units.substring(0, units.length - 1) + '1'
        // }
        return units
    }
    return units
}

export const formatUnitsWithPrecisAndDecimal = (value: BigNumber, precision: number, decimal : number) => {
    let units = formatUnits(value, decimal)
    const dotIndex = units.indexOf('.')
    if (dotIndex != -1 && dotIndex < (units.length - precision - 1)) {
        units = units.substring(0, dotIndex + precision + 1)
        // if (units.endsWith('0')) {
        //     units = units.substring(0, units.length - 1) + '1'
        // }
        return units
    }
    return units
}