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
