import { forwardRef } from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { Button } from "@mui/base/Button";
import { Popper } from "@mui/base/Popper";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import clsx from "clsx";
import { LuChevronDown, LuX } from "react-icons/lu";

export const Autocomplete = forwardRef((props, ref) => {
  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    options,
    getOptionLabel,
    setValue,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getListboxProps,
    getOptionProps,
    setAnchorEl,

    dirty,
    id,
    popupOpen,
    focused,
    anchorEl,
    inputValue,
    groupedOptions,
  } = useAutocomplete({
    ...props,
    options,
    onChange: (event, newValue) => setValue(newValue),
  });

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;

  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <div
      className={clsx(
        "p-4 w-[350px] bg-white ",
        focused && " rounded-t-xl shadow ",
        !focused && " rounded-xl shadow  ",
        hasClearIcon && !popupOpen && " rounded-xl shadow  "
      )}
    >
      <div
        {...getRootProps(other)}
        ref={rootRef}
        className={clsx(
          "shadow-md w-full rounded-2xl flex  justify-between bg-slate-100 pr-2",
          focused && "  shadow border-blue-400 border "
        )}
      >
        <input
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          {...getInputProps()}
          className=" rounded-2xl h-10 w-full bg-transparent px-4 outline-none"
        />
        <div className="flex items-center gap-x-2 translate-y-[1px] relative">
          {hasClearIcon && (
            <Button
              {...getClearProps()}
              className="  self-center outline-0 shadow-none border-0 py-0 px-0.5
            rounded-[4px] bg-transparent hover:text-blue-400 hover:cursor-pointer"
            >
              <LuX className="w-4 h-4" />
            </Button>
          )}

          <Button
            {...getPopupIndicatorProps()}
            className="self-center  outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px]
          bg-transparent hover:text-blue-400
          hover:cursor-pointer "
          >
            <LuChevronDown className={popupOpen && "rotate-180"} />
          </Button>
        </div>
      </div>

      {anchorEl && (
        <Popper open={popupOpen} anchorEl={anchorEl}>
          <ul
            {...getListboxProps()}
            className=" max-h-72 w-[350px] mt-3 p-4 shadow rounded-b-xl overflow-y-scroll list  bg-white text-neutral-950 "
          >
            {groupedOptions.map((option, index) => {
              const optionProps = getOptionProps({ option, index });
              const label = getOptionLabel(option);
              return (
                <li
                  key={index}
                  {...optionProps}
                  className={clsx(
                    "list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 border-b border-slate-100 hover:cursor-pointer capitalize",
                    inputValue === label && "bg-blue-50 text-blue-950 "
                  )}
                >
                  {label}
                </li>
              );
            })}

            {groupedOptions.length === 0 && (
              <li className="list-none p-2 cursor-default">No results</li>
            )}
          </ul>
        </Popper>
      )}
    </div>
  );
});
Autocomplete.displayName = "Autocomplete";

Autocomplete.propTypes = {
  disableClearable: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  options: PropTypes.array.isRequired,
  isOptionEqualToValue: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
};
