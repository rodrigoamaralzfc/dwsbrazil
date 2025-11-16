import clsx from "clsx"
import styles from "./Text.module.scss"

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "bodyLarge"
  | "bodySmall"
  | "caption"

type Tag =
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"

interface Props {
  text: string
  as?: Tag
  variant?: Variant
  className?: string
}

export function Text({
  text,
  as: Tag = "span",
  variant = "bodyLarge",
  className
}: Props) {
  // const cls = [styles.root, styles[variant], className]
  // .filter(Boolean)
  // .join(" ")

  return <Tag className={clsx(styles.root, styles[variant], className)}>{text}</Tag>
}

///

export const TitleHome = ({ text }: { text: string }) => <Text text={text} as="h2" variant="h1" className={styles.titleHome} />

export const TitleHome = ({ text }: { text: string }) => <Text text={text} as="h2" variant="h1" className={styles.titleHome} />
export const TitleHome = ({ text }: { text: string }) => <Text text={text} as="h2" variant="h1" className={styles.titleHome} />
export const TitleHome = ({ text }: { text: string }) => <Text text={text} as="h2" variant="h1" className={styles.titleHome} />
export const TitleHome = ({ text }: { text: string }) => <Text text={text} as="h2" variant="h1" className={styles.titleHome} />
export const TitleHome = ({ text }: { text: string }) => <Text text={text} as="h2" variant="h1" className={styles.titleHome} />
export const TitleHome = ({ text }: { text: string }) => <Text text={text} as="h2" variant="h1" className={styles.titleHome} />
