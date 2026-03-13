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

  switch (data.type) {
    case TRANSACTION_TYPE.TILL_NUMBER:
      return `BG|${tillNumber}${data.hideAmount ? `` : `|${amount}`}`
    case TRANSACTION_TYPE.PAYBILL:
      return `PB|${paybillNumber}${amount !=undefined && amount?.length > 0 ? `|${amount}` : ''}${accountNumber!=undefined &&accountNumber?.length > 0 ? `|${accountNumber}` : ''}`
    case TRANSACTION_TYPE.AGENT:
      return `WA|${agentNumber}|${amount}|${storeNumber}`
    case TRANSACTION_TYPE.SEND_MONEY:
      return `SM|${phoneNumber}|${amount}`
    default:
      return null
  }
}
