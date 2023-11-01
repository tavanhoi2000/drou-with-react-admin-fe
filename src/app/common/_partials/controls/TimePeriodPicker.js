import { secondsToMinuteString } from "app/common/_helpers/TimeHelper";
import { TimePickerField } from "app/common/_partials/controls";
import { cloneDeep } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useIntl } from "react-intl";

function TimePeriodPicker({
  disabled,
  periodsForEdit,
  onChange,
  setFieldValue,
  formValues,
  predefinedPeriods,
  startLabel,
  endLabel,
  periodLabel,
}) {
  const countMountClickRef = useRef(0);
  const pointRef = useRef();

  const emptyPredefinedPeriods = {
    startTime: null,
    endTime: null,
    periods: [],
  };

  const [periodsSelected, setPeriodsSelected] = useState(
    emptyPredefinedPeriods
  );

  useEffect(() => {
    if (!periodsForEdit) return;

    setPeriodsSelected(periodsForEdit);
  }, [periodsForEdit]);

  const [periodIds, setPeriodIds] = useState([]);

  useEffect(() => {
    const deepPeriods = cloneDeep(periodsSelected);

    const newPeriodIds = deepPeriods.periods.map(
      (period) => period?.index
    );

    setPeriodIds(newPeriodIds);
  }, [periodsSelected]);

  const handleSelectPeriod = (periodIndex) => {
    let newSelectedPeriods = cloneDeep(periodsSelected);

    setPeriodIds([JSON.stringify(periodIndex)]);
    newSelectedPeriods["periods"] = [predefinedPeriods[periodIndex - 1]];

    const periodSelected = predefinedPeriods[periodIndex - 1];

    countMountClickRef.current++;

    if (countMountClickRef.current === 1) {
      newSelectedPeriods["startPeriod"] = periodIndex;

      newSelectedPeriods["startTime"] =
        JSON.parse(periodSelected.start_time) * 60;
      setFieldValue("startTime", JSON.parse(periodSelected.start_time) * 60);

      newSelectedPeriods["endTime"] =
        JSON.parse(periodSelected.end_time) * 60;
      setFieldValue("endTime", JSON.parse(periodSelected.end_time) * 60);

      pointRef.current = periodIndex;
    }

    if (countMountClickRef.current === 2) {
      countMountClickRef.current = 0;

      newSelectedPeriods["endPeriod"] = periodIndex;

      newSelectedPeriods["endTime"] =
        JSON.parse(periodSelected.end_time) * 60;
      setFieldValue("endTime", JSON.parse(periodSelected.end_time) * 60);

      let periodFilters = [];

      if (pointRef.current > periodIndex) {
        periodFilters = predefinedPeriods.slice(periodIndex - 1, pointRef.current);

        newSelectedPeriods["startPeriod"] =
          newSelectedPeriods["endPeriod"];
        newSelectedPeriods["endPeriod"] = pointRef.current;

        //start time
        const startTime =
          JSON.parse(predefinedPeriods[periodIndex - 1].start_time) * 60;

        newSelectedPeriods["startTime"] = startTime;
        setFieldValue("startTime", startTime);

        //end time
        const endTime =
          JSON.parse(predefinedPeriods[pointRef.current - 1].end_time) * 60;
        newSelectedPeriods["endTime"] = endTime;
        setFieldValue("endTime", endTime);
      } else {
        periodFilters = predefinedPeriods.slice(
          newSelectedPeriods["startPeriod"] - 1,
          periodIndex
        );
      }
      newSelectedPeriods["periods"] = periodFilters;

      setPeriodIds(periodFilters.map((period) => period?.index));
    }
    onChange(newSelectedPeriods);
    setPeriodsSelected(newSelectedPeriods);
  };

  const formatLabel = () => {
    return (
      <div className="d-flex align-items-center">
        {periodsSelected.periods.length > 0 && (
          <div className="d-flex align-items-center">
            <p className="mb-0 mr-1">
              {periodsSelected.periods[0] &&
                periodsSelected.periods[0].name}
            </p>
            <p className="mb-0 mr-3">
              {periodsSelected.periods[
                periodsSelected.periods.length - 1
              ] &&
                ` - ${
                  periodsSelected.periods[
                    periodsSelected.periods.length - 1
                  ].name
                }`}
            </p>
          </div>
        )}
        <div className="d-flex align-items-center">
          <p className="mb-0 mr-1">
            {secondsToMinuteString(formValues.startTime)}
          </p>

          <p className="mb-0">
            {` - ${secondsToMinuteString(formValues.endTime)}`}
          </p>
        </div>
      </div>
    );
  };

  const handleSelectTime = (name, value) => {
    setPeriodsSelected(emptyPredefinedPeriods);
    onChange(emptyPredefinedPeriods);
    setPeriodIds([]);
    setFieldValue(name, value);
  };

  return (
    <Dropdown className="dt-range">
      <Dropdown.Toggle className="btn btn-light font-weight-bold w-100">
        <div
          className="font-weight-bold mr-2"
          id="kt_dashboard_daterangepicker_title"
        >
          <div className="d-flex justify-content-between align-items-center">
            {formatLabel()}
            <i className="fas fa-clock text-muted ml-5 right"></i>
          </div>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100 p-5">
        <div className="row form-group">
          <div className="col-lg-6">
            <TimePickerField
              name="startTime"
              style={{ innerWidth: "100%" }}
              label={startLabel}
              onChange={(val) => {
                handleSelectTime("startTime", val);
              }}
              disabled={disabled}
              step={5}
            />
          </div>
          <div className="col-lg-6">
            <TimePickerField
              name="endTime"
              style={{ innerWidth: "100%" }}
              label={endLabel}
              onChange={(val) => {
                handleSelectTime("endTime", val);
              }}
              disabled={disabled}
              step={5}
            />
          </div>
        </div>
        <div className="separator separator-dashed my-4"></div>
        <div className="row form-group">
          <div className="col-lg-12">
            <p className="mb-3">{periodLabel}</p>
            {predefinedPeriods.map((period, periodIndex) => (
              <Button
                key={period.index}
                variant={`${
                  periodIds.includes(period.index) ? "primary" : "secondary"
                }`}
                className="mr-3 mb-3 cursor-pointer"
                onClick={() => handleSelectPeriod(periodIndex + 1)}
                disabled={disabled}
              >
                {period.name}
              </Button>
            ))}
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TimePeriodPicker;
