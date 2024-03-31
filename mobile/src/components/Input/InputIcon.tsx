import { ElementType } from "react";

interface InputIconProps {
  icon: ElementType;
  name: string;
  size: number;
  color?: string;
}

export default function InputIcon({
  icon: IconElement,
  name,
  size,
  color,
}: InputIconProps) {
  return <IconElement name={name} size={size} color={color || "#404040"} />;
}
