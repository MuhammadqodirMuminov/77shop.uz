import { useState, useEffect } from 'react'

import { Button, CodeInput } from 'ui'

import * as S from './WeSentCode.styled'

interface WeSentCodeProps {
  phone: string
  loading: boolean
  onResend: () => void
  onCodeSubmit: (code: number) => void
}

export const WeSentCode = ({ phone, loading, onCodeSubmit, onResend }: WeSentCodeProps) => {
  const resendTime = 60

  const [resendTimer, setResendTimer] = useState(resendTime)

  // countdown
  useEffect(() => {
    let countdown: ReturnType<typeof setInterval> | null = null

    if (resendTimer !== 0) {
      countdown = setInterval(() => {
        setResendTimer(resendTimer - 1)
      }, 1000)
    }

    return () => {
      if (countdown) {
        return clearInterval(countdown)
      }
    }
  }, [resendTimer, setResendTimer])

  const onResendClick = () => {
    setResendTimer(resendTime)
    onResend()
  }

  return (
    <S.WeSentCode>
     

      <CodeInput
        // loading={loading}
        fields={4}
        autoFocus
        onComplete={onCodeSubmit}
      />

      {resendTimer !== 0 ? (
        ''
      ) : (
        <Button variant="text" onClick={onResendClick}>
          Получить новый код
        </Button>
      )}
    </S.WeSentCode>
  )
}
