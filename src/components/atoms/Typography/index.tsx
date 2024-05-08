type Props = {
  variants: "h1" | "h2" | "p";
  color?: "primary" | "secondary" | "tertiary";
  fontSize?: string;
  lineHeight?: string;
  children: React.ReactNode;
};

export default function Typography({
  variants,
  color,
  fontSize,
  lineHeight,
  children,
}: Props) {
  const colorVariants = {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
    tertiary: "text-text-tertiary",
  };

  switch (variants) {
    case "h1":
      return (
        <h1
          className={`text-3xl text-text-primary font-medium ${
            color && colorVariants[color]
          }`}
          style={{ fontSize: fontSize || "", lineHeight: lineHeight || "" }}
        >
          {children}
        </h1>
      );

    case "h2":
      return (
        <h2
          className={`text-xl text-text-primary font-medium ${
            color && colorVariants[color]
          }`}
          style={{ fontSize: fontSize || "", lineHeight: lineHeight || "" }}
        >
          {children}
        </h2>
      );

    case "p":
      return (
        <p
          className={`font-normal ${color && colorVariants[color]}`}
          style={{ fontSize: fontSize || "", lineHeight: lineHeight || "" }}
        >
          {children}
        </p>
      );
  }
}
