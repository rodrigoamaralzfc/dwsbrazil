import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import styles from './DropdownButton.module.scss';

export type MultiSelectOption = {
  id: string
  label: string
}

type DropdownButtonProps = {
  options: MultiSelectOption[]
  placeholder?: string
}

export function DropdownButton({ options, placeholder = "Category" }: DropdownButtonProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  const toggleOpen = () => {
    setOpen(open => !open)
  }

  return (
    <div ref={ref}>
      <Button variant="secondary" onClick={toggleOpen}>
        {placeholder}
      </Button>

      {open && (
        <div className={styles.list}>
          {options.map(({ id, label }) => (
            <label key={id} className={styles.item}>
              <input
                type="checkbox"
                className={styles.item}
                checked={selected.includes(id)}
                onChange={() => toggle(id)}
              />
              {label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
