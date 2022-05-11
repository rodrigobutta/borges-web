//#region Grid

const GridColumnFilterTypeEnum = {
  Text: 'Text',
  Number: 'Number',
  NumberRange: 'NumberRange',
  Date: 'Date',
  DateRange: 'DateRange',
  Select: 'Select',
  SelectServerSide: 'SelectServerSide',
};

const GridColumnSortDirection = {
  Ascending: 'ASC',
  Descending: 'DESC',
};

const GridColumnFilterConfigOptionDataType = {
  Text: 'Text',
  Number: 'Number',
};

export const GridConstants = {
  Column: {
    FilterType: GridColumnFilterTypeEnum,
    SortDirection: GridColumnSortDirection,
    FilterConfig: {
      OptionDataType: GridColumnFilterConfigOptionDataType,
    },
  },
};

//#endregion

export const SCR_DOCUMENT_ID = 1;
