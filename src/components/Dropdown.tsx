import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react'

interface DropdownProps {
  dropdownTrigger: React.ReactNode
  dropdownItems: { label: string; value: string }[]
  onItemSelect?: (item: string) => void
}

export function CustomDropdown(props: DropdownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>{props.dropdownTrigger}</DropdownTrigger>
      <DropdownMenu>
        {props.dropdownItems.map(item => (
          <DropdownItem key={item.value} onPress={() => props.onItemSelect?.(item.value)}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
