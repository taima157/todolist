import { ReactNode } from "react";
import { View } from "react-native";

interface FormRootProps {
  children: ReactNode;
}

export default function FormRoot({ children }: FormRootProps) {
  return <View style={{ gap: 30 }}>{children}</View>;
}
