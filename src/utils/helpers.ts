import type { FormData } from '@/@types/Data'
import { TRANSACTION_TYPE } from '@/@types/TransactionType'

export const generateQRCode = (data: FormData): string | null => {
  const {
    tillNumber,
    agentNumber,
    storeNumber,
    amount,
    accountNumber,
    paybillNumber,
    phoneNumber,
  } = data

  // check if amount is undefined or empty or 0
  const isAmountValid = amount !=undefined && amount?.length > 0 && amount !== '0'
  const isAccountNumberValid = accountNumber!=undefined &&accountNumber?.length > 0

  switch (data.type) {
    case TRANSACTION_TYPE.TILL_NUMBER:
      return `BG|${tillNumber}${data.hideAmount ? `` : `|${amount}`}`
    case TRANSACTION_TYPE.PAYBILL:
      return `PB|${paybillNumber}${isAmountValid ? `|${amount}` : ''}${isAccountNumberValid ? `|${accountNumber}` : ''}`
    case TRANSACTION_TYPE.AGENT:
      return `WA|${agentNumber}|${isAmountValid ? `|${amount}` : ''}|${storeNumber}`
    case TRANSACTION_TYPE.SEND_MONEY:
      return `SM|${phoneNumber}|${isAmountValid ? `|${amount}` : ''}`
    default:
      return null
  }
}
