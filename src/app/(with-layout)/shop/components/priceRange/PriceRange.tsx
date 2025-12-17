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
const MIN = 0;
const MAX = 10000;
const DEFAULT_MAX = 10000;

type PriceRangeSliderProps = {
  initialState: number[];
  setInitialState: Dispatch<SetStateAction<number[]>>;
};

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  initialState,
  setInitialState,
}) => {
  const [inputValues, setInputValues] = useState<(number | string)[]>([
    initialState[0],
    initialState[1] ?? DEFAULT_MAX,
  ]);

  useEffect(() => {
    if (initialState[0] < 1 || initialState[1] === undefined) {
      setInitialState([1, DEFAULT_MAX]);
    }
    setInputValues(initialState);
  }, [initialState, setInitialState]);

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
      inputValues[0] === "" ? MIN : Number(inputValues[0]),
      inputValues[1] === "" ? MAX : Number(inputValues[1]),
    ];
    setInitialState(updatedValues);
    setInputValues(updatedValues);
  };

  return (
    <div>
      <Range
        values={[
          inputValues[0] === "" ? MIN : Number(inputValues[0]),
          inputValues[1] === "" ? MAX : Number(inputValues[1]),
        ]}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "80%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: [
                    inputValues[0] === "" ? MIN : Number(inputValues[0]),
                    inputValues[1] === "" ? MAX : Number(inputValues[1]),
                  ],
                  colors: [
                    "hsl(var(--muted))",
                    "hsl(var(--primary))",
                    "hsl(var(--muted))",
                  ],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => {
          const { key, ...restProps } = props; // Extract the key prop

          return (
            <div
              key={key} // Pass the key prop directly
              {...restProps} // Spread the rest of the props
              style={{
                ...restProps.style,
                height: "24px",
                width: "24px",
                borderRadius: "50%",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
              className="border-[3px] border-primary"
            />
          );
        }}
      />
      <div className="flex gap-2">
        <div>
          <Input
            type="number"
            value={inputValues[0] === "" ? "" : inputValues[0]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(0, e.target.value)
            }
            onBlur={handleBlur}
          />
        </div>

        <div>
          <Input
            type="number"
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
