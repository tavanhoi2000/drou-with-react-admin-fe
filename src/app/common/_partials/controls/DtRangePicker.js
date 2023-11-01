import React, { useState, useEffect } from "react";

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { parse, format, startOfQuarter, endOfQuarter, startOfYear } from "date-fns";
import { Dropdown } from "react-bootstrap";
import './DtRangePicker.css';
import * as rdrLocales from 'react-date-range/dist/locale';

import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  endOfYear,
  isSameDay,
  differenceInCalendarDays,
} from 'date-fns';

export function DtRangePicker({ selectionChange, initRange, ...props }) {


  const [show, setShow] = useState(false);
  const [rangeLabel, setRangeLabel] = useState('');

  const [focusedRange, setFocusedRange] = useState([0, 0]);
  const [selectionRange, setSelectionRange] = useState([{
    startDate: initRange.startDate,
    endDate: initRange.endDate,
    key: "selection"
  }]);


  
  useEffect(() => {
    // server call by queryParams
    //formatLabel(initRange.startDate, initRange.endDate)
    setRangeLabel(formatLabel(initRange.startDate, initRange.endDate));
  }, []);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges?.selection || {};

    const newValue = [{
      startDate,
      endDate,
      key: "selection"
    }];
    setSelectionRange(newValue);
    if (focusedRange[1] == 1 || ranges.selection.startDate !== ranges.selection.endDate) {
      setTimeout(
        () => setShow(false),
        200
      );
      setRangeLabel(formatLabel(ranges.selection.startDate, ranges.selection.endDate));

      selectionChange(ranges.selection);
    } 
  };

  function formatLabel(start, end) {
    return format(start, 'dd/MM/yyyy') + ' - ' + format(end, 'dd/MM/yyyy');
  }

  const onToggle = () => {
    if (!show) {
      setFocusedRange([0, 0]);
    }

    setShow(!show);

  };
  
  return (
    <>
      <Dropdown className="dt-range " show={show} onToggle={onToggle}>
        <Dropdown.Toggle className="btn btn-light font-weight-bold w-100" >
          <span className="text-muted font-weight-bold mr-2" id="kt_dashboard_daterangepicker_title">{rangeLabel}
            <i className="fa fa-calendar-alt text-muted ml-5 right"></i>
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <DateRangePicker
            locale={rdrLocales.vi}
            onChange={handleSelect}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={selectionRange}
            direction="horizontal"
            focusedRange={focusedRange}
            onRangeFocusChange={setFocusedRange}
            showDateDisplay={false}
            staticRanges={defaultStaticRanges}
            inputRanges={[]}
          />
        </Dropdown.Menu>
      </Dropdown>


    </>
  );
}




const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfQuarter: startOfQuarter(new Date()),
  endOfQuarter: endOfQuarter(new Date()),
  startOfLastQuarter: startOfQuarter(addMonths(new Date(), -3)),
  endOfLastQuarter: endOfQuarter(addMonths(new Date(), -3)),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  },
};

export function createStaticRanges(ranges) {
  return ranges.map(range => ({ ...staticRangeHandler, ...range }));
}

export const defaultStaticRanges = createStaticRanges([
  {
    label: 'Hôm nay',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: 'Hôm qua',
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday,
    }),
  },

  {
    label: 'Tuần này',
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
    }),
  },
  {
    label: 'Tuần trước',
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
    }),
  },
  {
    label: 'Tháng này',
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
  },
  {
    label: 'Tháng trước',
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
    }),
  },
  {
    label: 'Quý này',
    range: () => ({
      startDate: defineds.startOfQuarter,
      endDate: defineds.endOfQuarter,
    }),
  },
  {
    label: 'Quý trước',
    range: () => ({
      startDate: defineds.startOfLastQuarter,
      endDate: defineds.endOfLastQuarter,
    }),
  },
  {
    label: 'Năm này',
    range: () => ({
      startDate: defineds.startOfYear,
      endDate: defineds.endOfYear,
    }),
  },
]);

export const defaultInputRanges = [
  {
    label: 'days up to today',
    range(value) {
      return {
        startDate: addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
        endDate: defineds.endOfToday,
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.endDate, defineds.endOfToday)) return '-';
      if (!range.startDate) return '∞';
      return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
    },
  },
  {
    label: 'days starting today',
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.endDate) return '∞';
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];