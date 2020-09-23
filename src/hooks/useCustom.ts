import { useState } from 'react'

export default function useCustom() {
  const [status, setStatus] = useState(true)

  return {
    status, 
    setStatus
  }
}