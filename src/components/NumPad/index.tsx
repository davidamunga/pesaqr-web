import React from 'react'
import { Button } from '../ui/button'
import { useAppStore } from '@/store/useAppStore'
import { NumericFormat } from 'react-number-format'
import { Input } from '../ui/input'
import { FiDelete } from 'react-icons/fi'
import { TRANSACTION_TYPE } from '@/@types/TransactionType'

const NumPad = () => {
  const { data, updateData } = useAppStore()
  const handleClick = (value: number) => {
    updateData({ amount: `${data.amount}${value}` })
  }

  const handleClear = () => {
    updateData({ amount: undefined })
  }
  const handleDeleteLast = () => {
    const amount =
      data.amount && data.amount.length > 0
        ? data.amount.substring(0, data.amount.length - 1)
        : ''
    updateData({ amount })
  }

  return (
    <div className="flex flex-col space-y-2 bg-zinc-800 p-2 rounded-md border border-zinc-700">
      <NumericFormat
        onValueChange={(value) => {
          if (
            value.floatValue != undefined &&
            value.floatValue.toString().length <= 5
          ) {
            updateData({ amount: value.value })
          }
        }}
        inputMode="numeric"
        value={data.amount ?? ''}
        customInput={Input}
        thousandSeparator=","
        prefix="KES "
        allowNegative={false}
        placeholder={`Enter Amount ${
          data.type === TRANSACTION_TYPE.AGENT
            ? 'to withdraw'
            : data.type === TRANSACTION_TYPE.SEND_MONEY
              ? 'to send'
              : 'to pay'
        } `}
        style={{ borderColor: data.color }}
        className="font-display font-extrabold py-7 md:py-7 border-4   shadow-inner placeholder:text-xl  placeholder:md:text-3xl bg-white  placeholder:text-zinc-600 text-zinc-900 text-xl md:text-4xl text-center w-full"
      />
      <div className="w-full grid grid-cols-3 gap-1">
        <Button
          onClick={() => handleClick(1)}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          1
        </Button>
        <Button
          onClick={() => handleClick(2)}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          2
        </Button>
        <Button
          onClick={() => handleClick(3)}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          3
        </Button>
        <Button
          onClick={() => handleClick(4)}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          4
        </Button>
        <Button
          onClick={() => handleClick(5)}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          5
        </Button>
        <Button
          onClick={() => handleClick(6)}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          6
        </Button>
        <Button
          onClick={() => handleClick(7)}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          7
        </Button>
        <Button
          onClick={() => handleClick(8)}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          8
        </Button>
        <Button
          onClick={() => handleClick(9)}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          9
        </Button>

        <Button
          onClick={() => handleClear()}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          CLR
        </Button>
        <Button
          onClick={() => handleClick(0)}
          className="text-zinc-800 py-8 text-4xl font-bold bg-white hover:bg-zinc-200 border border-zinc-800 border-y"
        >
          0
        </Button>

        <Button
          onClick={() => handleDeleteLast()}
          className="text-zinc-800 font-bold py-8 text-4xl bg-white border border-zinc-800 hover:bg-zinc-200 border-y"
        >
          <FiDelete />
        </Button>
      </div>
    </div>
  )
}

export default NumPad
