import type { TextColor } from "./textColors";
import type { TextWeight } from "./textWeights";
import type { TextSize } from "./textSizes";
import type { TextAlign } from "./textAlign";

export interface ITextProps {
    as?: string;
    size?: TextSize;
    weight?: TextWeight;
    color?: TextColor;
    align?: TextAlign;
    italic?: boolean;
    underline?: boolean;
    truncate?: boolean;
    class?: string;
    style?: string;
}

export const textDefaultProps = {
    as: "p" as string,
    size: "md" as TextSize,
    weight: "normal" as TextWeight,
    color: "default" as TextColor,
    align: "left" as TextAlign,
    italic: false as boolean,
    underline: false as boolean,
    truncate: false as boolean,
    class: "" as string,
    style: "" as string,
};