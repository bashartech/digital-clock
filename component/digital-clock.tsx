"use client"

import {useState, useEffect, useMemo} from "react"
import {Card} from "@/component/ui/card"
import {Button} from "@/component/ui/button"

export default function DigitalClock() {

    const [time, setTime] = useState<Date>(new Date());
    const [is24Hour, setIs24Hour] = useState<boolean>(true)
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(()=>{
        setMounted(true)
        const interval = setInterval (()=>{
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const formattedTime = useMemo<string>(()=>{
        if(!mounted) return ""
        const hours = is24Hour ? time.getHours().toString().padStart(2, "0") : (time.getHours() % 12 || 12).toString().padStart(2, "0")
        const minutes = time.getMinutes().toString().padStart(2, "0")
        const seconds = time.getSeconds().toString().padStart(2, "0")
        return `${hours}:${minutes}:${seconds} `
    },[time, is24Hour,  mounted])

  return (
    <div className=" clock-container flex items-center justify-center h-screen">
      {/* Center the digital clock within the screen */}
      <Card className=" clock-card p-8 shadow-lg rounded-2xl">
        <div className="clock-content flex flex-col items-center justify-center">
          {/* Header with title */}
          <div className="clock-title text-2xl font-bold tracking-tight">Digital Clock</div>
          {/* Description */}
          <div className="clock-description text-sm text-gray-500 dark:text-gray-400 mb-4">
            Display current time in hours, minutes, and seconds.
          </div>
          {/* Display the formatted time */}
          <div className="clock-time text-6xl font-bold tracking-tight">
            {formattedTime}
          </div>
          {/* Buttons to switch between 24-hour and 12-hour formats */}
          <div className="clock-buttons mt-4 flex items-center">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="btn mr-2 font-bold"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className="btn mr-2 font-bold"
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
