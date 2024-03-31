import colors from "@/src/constants/colors";
import { ElementType } from "react";

interface ButtonIconProps {
  icon: ElementType;
  name: string;
  size: number;
  color?: string;
}

export default function ButtonIcon({
  icon: IconElement,
  name,
  size,
  color,
}: ButtonIconProps) {
  return <IconElement name={name} size={size} color={color || colors.textPrimary} />;
}
