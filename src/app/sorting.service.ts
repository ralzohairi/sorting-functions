import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  /** Creates a new list of the passed list with its elements sorted alphabetically
   * @param {Array} list - the string list to sort
   * @returns {Array} the alphabetically sorted list
   */
  sortListOfStringsAlphabetically<T>(list: string[]): string[] {
    // Clone list to return a new list
    const listClone = list.slice();

    // Otherwise, sort the list alphabetically based on the passed property
    listClone.sort((item1: string, item2: string) => {
      if (item1.toLowerCase().trim() < item2.toLowerCase().trim()) {
        return -1; /*negative value means item1 comes first*/
      }
      if (item1.toLowerCase().trim() > item2.toLowerCase().trim()) {
        return 1; /*positive value means item2 comes first*/
      }

      return 0; // item1 and item2 are equal, change nothing
    });

    return listClone;
  }

  /** Creates a new list of the passed list with its object elements sorted alphabetically
   *  based on the passed string property
   * @param {Array} list - the list to sort
   * @param {String} property - object property to sort based on that has a string value
   * @returns {Array} the alphabetically sorted list
   */
  sortListAlphabeticallyBasedOnProperty<T>(list: T[], property: string): T[] {

    // If list doesn't have property throw an error
    this.throwErrorIfPropertyDoesntExistOnListElements(list, property);

    // Clone list to return a new list
    const listClone = list.slice();

    // Otherwise, sort the list alphabetically based on the passed string property
    listClone.sort((item1: T, item2: T) => {
      if (item1[property].toLowerCase().trim() < item2[property].toLowerCase().trim()) {
        return -1; /*negative value means item1 comes first*/
      }
      if (item1[property].toLowerCase().trim() > item2[property].toLowerCase().trim()) {
        return 1; /*positive value means item2 comes first*/
      }

      return 0; // item1 and item2 are equal, change nothing
    });

    return listClone;
  }

  /** Creates a new list of the passed list with its elements sorted alphabetically
   * @param {Array} list - the list to sort
   * @param {Boolean} sortAscendingly - determines whether the list should be sorted ascendingly
   * or descendingly
   * @returns {Array} the sorted list
   */
  sortListOfDates(list: Date[], sortAscendingly: boolean): Date[] {
    // Clone list to return a new list
    const listClone = list.slice();

    // Otherwise, sort the list in ascending order based on the passed date property
    listClone.sort((item1: Date, item2: Date) => {
      /*to order elements from newest to oldest based on timestamp,
       item2 comes first only if passed function returns postive,
       in which case if item2 is larger than item1 */
      if (sortAscendingly) { // sort ascendingly (oldest to newest)
        return item1.getTime() - item2.getTime(); /* getTime on date returns the number
        of milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date*/
      } else { // sort descendingly (newest to oldest)
        return item2.getTime() - item1.getTime(); /* getTime on date returns the number
         of milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date*/
      }

    });

    return listClone;
  }

  /** Creates a new list of the passed list with its object elements sorted in either
   * ascending order (oldest to newest) or descending order (newest to oldest) based on
   *  the passed date property
   * @param {Array} list - the list to sort
   * @param {String} property - object property to sort based on that has a date value
   * @param {Boolean} sortAscendingly - determines whether the list should be sorted ascendingly
   * or descendingly
   * @returns {Array} the sorted list
   */
  sortListBasedOnDateProperty<T>(list: T[], property: string, sortAscendingly: boolean): T[] {

    // If list doesn't have property throw an error
    this.throwErrorIfPropertyDoesntExistOnListElements(list, property);

    // Clone list to return a new list
    const listClone = list.slice();

    // Otherwise, sort the list in ascending order based on the passed date property
    listClone.sort((item1: T, item2: T) => {
      /*to order elements from newest to oldest based on timestamp,
       item2 comes first only if passed function returns postive,
       in which case if item2 is larger than item1 */
      if (sortAscendingly) { // sort ascendingly (oldest to newest)
        return item1[property].getTime() - item2[property].getTime(); /* getTime on date returns the number
         of milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date*/
      } else { // sort descendingly (newest to oldest)
        return item2[property].getTime() - item1[property].getTime(); /* getTime on date returns the number
         of milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date*/
      }

    });

    return listClone;
  }

  /** Throws an error if the property doesn't exist on the past list elements
   * @param {Array} list - the list to check
   * @param {String} property - the property to search for on the list
   */
  throwErrorIfPropertyDoesntExistOnListElements<T>(list: T[], property: string) {
    // If property is non-existent on the list's items, throw an error back
    const listIsNotEmpty = list.length !== 0;

    if (listIsNotEmpty) {
      // 1. If passed property is an empty string
      if (this.isWhiteSpaceOnly(property)) {
        throw new Error("Cannot sort list when passed property is whitespace only");
      }

      // 2. If the passed property is non-existent on the list elements
      if (typeof list[0][property] === "undefined") {
        throw new Error("Property '" + property + "' does not exist on list entries passed to the 'sortAlphabetically' function");
      }

      // 3. If property doesn't have the proper type
      // No need to handle it as applying a date/string function on it
      // will result in an error
    }

  }

  /** Returns true if passed string contains white space only, returns false otherwise
   * @param {String} text - string to test
   * @returns {Boolean} test result
   */
  isWhiteSpaceOnly(text: string): boolean {

    const noWhiteSpaceInput = text.replace(/\s/g, ""); // replace white space with empty string

    if (noWhiteSpaceInput === "") {
      return true;
    } else {
      return false;
    }
  }
}
