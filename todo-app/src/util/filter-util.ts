import { formatDate } from '@angular/common';

/**
 * This functions receives an "generic object" as parameter, and compare if any of its properties has a value
 * similar to "term", The comparison is case insensitive.
 * When a "dateFormat" is provided, properties of Date type is gonna be formated before the comparison.[
 * See https://angular.io/api/common/DatePipe for possible date formats
 */
export function objectHasPropertyWithValue<TObject>(object: TObject, term: string, dateFormat?: string): boolean {
    return Object.values(object)
        .some(propertyValue => {
            const valueToCompare = propertyValue instanceof Date && dateFormat
                ? formatDate(propertyValue, dateFormat, 'en-US')
                : propertyValue;

            return valueToCompare.toString().toLocaleLowerCase().includes(term.toLocaleLowerCase());
        });
};

/**
 * This function receives an array of generic value, and sort ordering by true values first.
 * The second parameter is a function that extracts a boolean from an array's item.
 * 
 * Examples of utilization:
 * const arrSample = [false, true, false, true];
 * sortArrayByFalsyValuesFirst(arrSample, val => val);
 * // result: [false, false, true, true]
 * 
 * const arrSample2 = [{ id: 1, completed: true }, { id: 2, completed: false}, { id: 3, completed: true }];
 * sortArrayByFalsyValuesFirst(arrSample, val => val.completed);
 * // result: [{ id: 2, completed: false}, { id: 1, completed: true }, { id: 3, completed: true }];
 * 
 * @see https://bobbyhadz.com/blog/javascript-sort-array-of-objects-by-boolean-property
 */
export function sortArrayByFalsyValuesFirst<TValue>(arr: TValue[], valueSelector: (val: TValue) => boolean): void {
    arr.sort((valueA, valueB) => Number(valueSelector(valueA)) - Number(valueSelector(valueB)));
}
