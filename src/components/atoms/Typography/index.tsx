interface Props extends React.AllHTMLAttributes<HTMLHeadingElement> {
  variants: 'h1' | 'h2' | 'h3' | 'p'
  color?: 'primary' | 'secondary' | 'tertiary'
  children: React.ReactNode
}

export default function Typography({ variants, color, children, ...rest }: Props) {
  const colorVariants = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    tertiary: 'text-text-tertiary',
  }

  switch (variants) {
    case 'h1':
      return (
        <h1 className={`text-3xl text-text-primary font-medium ${color && colorVariants[color]}`} {...rest}>
          {children}
        </h1>
      )

    case 'h2':
      return (
        <h2 className={`text-2xl text-text-primary font-medium ${color && colorVariants[color]}`} {...rest}>
          {children}
        </h2>
      )

    case 'h3':
      return (
        <h2 className={`text-xl text-text-primary font-medium ${color && colorVariants[color]}`} {...rest}>
          {children}
        </h2>
      )

    case 'p':
      return (
        <p className={`font-normal ${color && colorVariants[color]}`} {...rest}>
          {children}
        </p>
      )
  }
}
