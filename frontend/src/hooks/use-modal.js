import { useState } from 'react'

const useModal = (initialOpen = false) => {
  const [isOpen, setOpen] = useState(initialOpen)

  const onRequestClose = () => setOpen(false)
  const openModal = () => setOpen(true)

  return {
    isOpen,
    onRequestClose,
    openModal,
  }
}

export default useModal
