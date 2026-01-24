"use client";
import { Input } from "@/components/ui/input";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;

type PriceRangeSliderProps = {
  initialState: number[];
  setInitialState: Dispatch<SetStateAction<number[]>>;
  min: number;
  max: number;
};

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  initialState,
  setInitialState,
  min,
  max,
}) => {
  const [inputValues, setInputValues] = useState<(number | string)[]>([
    initialState[0],
    initialState[1] ?? max,
  ]);

  useEffect(() => {
    if (initialState[0] < min || initialState[1] === undefined) {
      setInitialState([min, max]);
    }
    setInputValues(initialState);
  }, [initialState, setInitialState, min, max]);

  const handleChange = (newValues: number[]) => {
    setInputValues(newValues);
    setInitialState(newValues);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value === "" ? "" : value;
    setInputValues(updatedValues);
    // Update state if the inputs are not empty
    if (updatedValues[0] !== "" && updatedValues[1] !== "") {
      setInitialState([Number(updatedValues[0]), Number(updatedValues[1])]);
    }
  };

  // Handle resetting input to min/max if empty
  const handleBlur = () => {
    const updatedValues = [
      inputValues[0] === "" ? min : Number(inputValues[0]),
      inputValues[1] === "" ? max : Number(inputValues[1]),
    ];
    setInputValues(updatedValues);
    setInitialState(updatedValues);
  };

  return (
    <div className="px-2 pt-4 pb-2">
      <div className="mb-6 flex justify-center">
        <Range
          values={[
            inputValues[0] === "" ? min : Number(inputValues[0]),
            inputValues[1] === "" ? max : Number(inputValues[1]),
          ]}
          step={STEP}
          min={min}
          max={max}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "4px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: [
                      inputValues[0] === "" ? min : Number(inputValues[0]),
                      inputValues[1] === "" ? max : Number(inputValues[1]),
                    ],
                    colors: ["#e5e7eb", "hsl(var(--primary))", "#e5e7eb"],
                    min: min,
                    max: max,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => {
            const { key, ...restProps } = props;
            return (
              <div
                key={key}
                {...restProps}
                style={{
                  ...restProps.style,
                  height: "24px",
                  width: "24px",
                  borderRadius: "50%",
                  backgroundColor: "hsl(var(--primary))",
                  border: "4px solid white",
                  boxShadow: "0 0 0 1px #e5e7eb",
                }}
              />
            );
          }}
        />
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            &#2547;
          </span>
          <Input
            type="number"
            className="pl-6 h-9 text-sm"
            value={inputValues[0] === "" ? "" : inputValues[0]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(0, e.target.value)
            }
            onBlur={handleBlur}
          />
        </div>
        <span className="text-muted-foreground">-</span>
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            &#2547;
          </span>
          <Input
            type="number"
            className="pl-6 h-9 text-sm"
            value={inputValues[1] === "" ? "" : inputValues[1]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(1, e.target.value)
            }
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
