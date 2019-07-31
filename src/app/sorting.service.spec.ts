import { TestBed } from '@angular/core/testing';

import { SortingService } from './sorting.service';
import { stringify } from '@angular/compiler/src/util';

// Declarations
let sortingService: SortingService;

describe('SortingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});

    // To Access Service
    sortingService = TestBed.get(SortingService);
  });

  it('should be created', () => {
    const service: SortingService = TestBed.get(SortingService);
    expect(service).toBeTruthy();
  });

  // ----------- sortListOfStringsAlphabetically() Unit Tests -----------

  it('should return ["Beaver", "Cow", Elephant", "lion"] when passing the list: ["Cow", "Elephant", "lion", "Beaver"] when sorting alphabetically', () => {

    const listToSort: string[] = ["Cow", "Elephant", "lion", "Beaver"];
    const sortedVersionOfList: string[] = ["Beaver", "Cow", "Elephant", "lion"];

    expect(sortingService.sortListOfStringsAlphabetically(listToSort)).toEqual(sortedVersionOfList);
  });

  it('should return empty list when passing an empty list to sort alphabetically', () => {

    expect(sortingService.sortListOfStringsAlphabetically([])).toEqual([]);
  });


  // ----------- sortListAlphabeticallyBasedOnProperty() Unit Tests -----------

  it('should return [{name:"Jay"}, {name:"James"}, {name:"Rami"}, {name:"Zain"}] when passing the list: [{name:"Zain"}, {name:"James"}, {name:"Rami"}, {name:"Jay"}] and the property "name"', () => {

    const listToSort: { name: string }[] = [{ name: "Zain" }, { name: "James" }, { name: "Rami" }, { name: "Jay" }];
    const sortedVersionOfList: { name: string }[] = [{ name: "James" }, { name: "Jay" }, { name: "Rami" }, { name: "Zain" }];

    expect(sortingService.sortListAlphabeticallyBasedOnProperty(listToSort, 'name')).toEqual(sortedVersionOfList);
  });

  it('should return empty list when passing an empty list to sort alphabetically regardless of the passed property', () => {

    expect(sortingService.sortListAlphabeticallyBasedOnProperty([], "")).toEqual([]);
  });

  it('should throw an error when passed propery is whitespace only when calling sortListAlphabeticallyBasedOnProperty', () => {
    expect(() => { sortingService.sortListAlphabeticallyBasedOnProperty([{ name: "Zain" }, { name: "James" }], ""); })
      .toThrow(new Error("Cannot sort list when passed property is whitespace only"));
  });

  it('should throw an error when passed propery doesn\'t exist on passed list when calling sortListAlphabeticallyBasedOnProperty', () => {
    const property = "profession";
    expect(() => { sortingService.sortListAlphabeticallyBasedOnProperty([{ name: "Zain" }, { name: "James" }], property); })
      .toThrow(new Error("Property '" + property + "' does not exist on list entries passed to the 'sortAlphabetically' function"));
  });

  // ----------- sortListOfDates() Unit Tests -----------

  it('it should sort a list of dates, that is in descending order, ascendingly', () => {

    const newestToOldest: Date[] = [
      new Date(2018, 0, 8, 10, 3, 0, 0),
      new Date(2018, 0, 8, 8, 3, 0, 0),
      new Date(2018, 0, 8, 8, 1, 0, 0)
    ];
    const oldestToNewest: Date[] = [
      new Date(2018, 0, 8, 8, 1, 0, 0),
      new Date(2018, 0, 8, 8, 3, 0, 0),
      new Date(2018, 0, 8, 10, 3, 0, 0)
    ];

    expect(sortingService.sortListOfDates(newestToOldest, true)).toEqual(oldestToNewest);
  });

  it('it should sort a list of dates, that is in acsending order, descendingly', () => {
    const newestToOldest: Date[] = [
      new Date(2018, 0, 8, 10, 3, 0, 0),
      new Date(2018, 0, 8, 8, 3, 0, 0),
      new Date(2018, 0, 8, 8, 1, 0, 0)
    ];
    const oldestToNewest: Date[] = [
      new Date(2018, 0, 8, 8, 1, 0, 0),
      new Date(2018, 0, 8, 8, 3, 0, 0),
      new Date(2018, 0, 8, 10, 3, 0, 0)
    ];

    expect(sortingService.sortListOfDates(oldestToNewest, false)).toEqual(newestToOldest);
  });

  it('should return empty list when passing an empty list to sort a list of dates', () => {

    expect(sortingService.sortListOfDates([], true)).toEqual([]);
    expect(sortingService.sortListOfDates([], false)).toEqual([]);
  });

  // ----------- sortListBasedOnDateProperty() Unit Tests -----------

  it('it should sort a list of objects, that is in descending order with respect to property birthday, acsendingly', () => {

    const listOfHumansFromYoungestToOldest: { name: string, birthday: Date }[] = [ // newest to oldest
      { name: "Jake", birthday: new Date(2018, 0, 8, 10, 3, 0, 0) },
      { name: "Steph", birthday: new Date(2018, 0, 8, 8, 3, 0, 0) },
      { name: "Goerge", birthday: new Date(2018, 0, 8, 8, 1, 0, 0) }
    ];

    const listOfHumansFromOldestToYoungest: { name: string, birthday: Date }[] = [ // newest to oldest
      { name: "Goerge", birthday: new Date(2018, 0, 8, 8, 1, 0, 0) },
      { name: "Steph", birthday: new Date(2018, 0, 8, 8, 3, 0, 0) },
      { name: "Jake", birthday: new Date(2018, 0, 8, 10, 3, 0, 0) }
    ];

    expect(sortingService.sortListBasedOnDateProperty(listOfHumansFromYoungestToOldest, 'birthday', true))
      .toEqual(listOfHumansFromOldestToYoungest);
  });

  it('it should sort a list of objects, that is in ascending order with respect to property birthday, descendingly', () => {

    const listOfHumansFromYoungestToOldest: { name: string, birthday: Date }[] = [ // newest to oldest
      { name: "Jake", birthday: new Date(2018, 0, 8, 10, 3, 0, 0) },
      { name: "Steph", birthday: new Date(2018, 0, 8, 8, 3, 0, 0) },
      { name: "Goerge", birthday: new Date(2018, 0, 8, 8, 1, 0, 0) }
    ];

    const listOfHumansFromOldestToYoungest: { name: string, birthday: Date }[] = [ // newest to oldest
      { name: "Goerge", birthday: new Date(2018, 0, 8, 8, 1, 0, 0) },
      { name: "Steph", birthday: new Date(2018, 0, 8, 8, 3, 0, 0) },
      { name: "Jake", birthday: new Date(2018, 0, 8, 10, 3, 0, 0) }
    ];

    expect(sortingService.sortListBasedOnDateProperty(listOfHumansFromOldestToYoungest, 'birthday', false)).toEqual(listOfHumansFromYoungestToOldest);
  });

  it('should throw an error when passed propery is whitespace only when calling sortListAlphabeticallyBasedOnProperty', () => {
    expect(() => { sortingService.sortListBasedOnDateProperty([{ name: "Zain" }, { name: "James" }], "", true); })
      .toThrow(new Error("Cannot sort list when passed property is whitespace only"));
  });

  it('should throw an error when passed propery doesn\'t exist on passed list when calling sortListAlphabeticallyBasedOnProperty', () => {
    const property = "birthDay";
    expect(() => { sortingService.sortListBasedOnDateProperty([{ name: "Zain" }, { name: "James" }], property, true); })
      .toThrow(new Error("Property '" + property + "' does not exist on list entries passed to the 'sortAlphabetically' function"));
  });

  it('should return empty list when passing an empty object list to sort based on a date property', () => {

    expect(sortingService.sortListBasedOnDateProperty([], "whatever", true)).toEqual([]);
    expect(sortingService.sortListBasedOnDateProperty([], "whatever", false)).toEqual([]);
  });
});
