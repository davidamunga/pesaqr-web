import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/lib/utils'
import { Paintbrush } from 'lucide-react'
import { useMemo, useState } from 'react'

const colors = {
  green: { 600: 'oklch(62.7% 0.194 149.214)' },
  amber: { 600: 'oklch(0.60 0.16 65)' },
  yellow: { 400: 'oklch(0.83 0.17 90)' },
  emerald: { 600: 'oklch(0.53 0.15 166)' },
  blue: { 600: 'oklch(0.53 0.24 264)' },
  indigo: { 600: 'oklch(0.51 0.24 279)' },
  cyan: { 400: 'oklch(0.78 0.14 202)' },
  fuchsia: { 400: 'oklch(0.71 0.25 316)' },
  lime: { 400: 'oklch(0.82 0.21 123)' },
  orange: { 500: 'oklch(0.68 0.20 44)' },
  pink: { 500: 'oklch(0.63 0.25 348)' },
  sky: { 400: 'oklch(0.73 0.14 233)' },
  violet: { 600: 'oklch(0.51 0.28 293)' },
  teal: { 400: 'oklch(0.77 0.13 186)' },
  rose: { 600: 'oklch(0.55 0.23 12)' },
}

export function ColorPicker() {
  const { data, updateData } = useAppStore()

  return (
    <GradientPicker
      background={data.color ?? colors.green[600]}
      setBackground={(color) => {
        updateData({ color })
      }}
    />
  )
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string
  setBackground: (background: string) => void
  className?: string
}) {
  const solids = [
    'oklch(62.7% 0.194 149.214)', // green-600
    'oklch(0.60 0.16 65)', // amber-600
    'oklch(0.83 0.17 90)', // yellow-400
    'oklch(0.53 0.15 166)', // emerald-600 (same as green)
    'oklch(0.53 0.24 264)', // blue-600
    'oklch(0.51 0.24 279)', // indigo-600
    'oklch(0.78 0.14 202)', // cyan-400
    'oklch(0.71 0.25 316)', // fuchsia-400
    'oklch(0.82 0.21 123)', // lime-400
    'oklch(0.68 0.20 44)', // orange-500
    'oklch(0.63 0.25 348)', // pink-500
    'oklch(0.73 0.14 233)', // sky-400
    'oklch(0.51 0.28 293)', // violet-600
    'oklch(0.77 0.13 186)', // teal-400
    'oklch(0.55 0.23 12)', // rose-600
    'oklch(0.90 0.00 0)', // light gray (#E2E2E2)
    'oklch(0.70 0.20 336)', // bright pink (#ff75c3)
    'oklch(0.75 0.15 65)', // light orange (#ffa647)
    'oklch(0.93 0.15 95)', // bright yellow (#ffe83f)
    'oklch(0.90 0.20 125)', // bright lime (#9fff5b)
    'oklch(0.85 0.12 205)', // light cyan (#70e2ff)
    'oklch(0.72 0.21 300)', // light purple (#cd93ff)
    'oklch(0.18 0.04 245)', // dark navy (#09203f)
  ]

  const gradients = [
    'linear-gradient(to top left, oklch(0.80 0.04 240), oklch(0.93 0.02 240))', // soft blue
    'linear-gradient(to top left, oklch(0.85 0.01 85), oklch(0.85 0.01 85), oklch(0.93 0.01 85))', // gray tones
    'linear-gradient(to top left, oklch(0.00 0.00 0), oklch(0.30 0.00 0))', // black to gray
    'linear-gradient(to top left, oklch(0.18 0.04 245), oklch(0.45 0.06 230))', // navy to slate
    'linear-gradient(to top left, oklch(0.55 0.28 295), oklch(0.50 0.29 285), oklch(0.45 0.30 275))', // purple gradient
    'linear-gradient(to top left, oklch(0.68 0.27 340), oklch(0.52 0.24 350))', // pink gradient
    'linear-gradient(to top left, oklch(0.62 0.27 25), oklch(0.70 0.24 55))', // red to orange
    'linear-gradient(to top left, oklch(0.55 0.30 25), oklch(0.58 0.28 25))', // red tones
    'linear-gradient(to top left, oklch(0.72 0.15 215), oklch(0.55 0.23 265))', // cyan to blue
    'linear-gradient(to top left, oklch(0.70 0.17 225), oklch(0.82 0.12 200))', // sky blue
    'linear-gradient(to top left, oklch(0.52 0.16 165), oklch(0.62 0.13 170))', // green gradient
    'linear-gradient(to top left, oklch(0.92 0.18 105), oklch(0.82 0.26 135))', // yellow to lime
    'linear-gradient(to top left, oklch(0.52 0.29 290), oklch(0.32 0.29 275), oklch(0.50 0.18 145), oklch(0.90 0.20 105))', // rainbow
    'linear-gradient(to top left, oklch(0.75 0.15 195), oklch(0.72 0.24 65), oklch(0.60 0.30 345))', // turquoise orange pink
    'linear-gradient(to top left, oklch(0.83 0.15 340), oklch(0.75 0.18 55), oklch(0.70 0.23 15), oklch(0.60 0.20 330), oklch(0.50 0.23 290), oklch(0.28 0.18 270), oklch(0.20 0.15 270))', // full spectrum
    'linear-gradient(to top left, oklch(0.70 0.20 336), oklch(0.75 0.15 65), oklch(0.93 0.15 95), oklch(0.90 0.20 125), oklch(0.85 0.12 205), oklch(0.72 0.21 300))', // vibrant rainbow
  ]

  const defaultTab = useMemo(() => {
    if (background.includes('url')) return 'image'
    if (background.includes('gradient')) return 'gradient'
    return 'solid'
  }, [background])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={
            'bg-zinc-900 px-2 md:px-4  hover:bg-zinc-700 border-zinc-600 w-fit justify-start text-left font-normal'
          }
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-zinc-900 border-zinc-400">
        <Tabs defaultValue={defaultTab} className="w-full bg-zinc-900">
          <TabsList className="w-full mb-4 bg-zinc-800">
            <TabsTrigger
              className="flex-1 cursor-pointer data-[state=inactive]:text-white"
              value="solid"
            >
              Solid
            </TabsTrigger>
            <TabsTrigger
              className="flex-1 cursor-pointer data-[state=inactive]:text-white"
              value="gradient"
            >
              Gradient
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="flex flex-wrap gap-1 mb-2">
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 text-white bg-zinc-900 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  )
}

const GradientButton = ({
  background,
  children,
}: {
  background: string
  children: React.ReactNode
}) => {
  return (
    <div
      className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <div className="bg-popover/80 rounded-md p-1 text-xs text-center">
        {children}
      </div>
    </div>
  )
}
