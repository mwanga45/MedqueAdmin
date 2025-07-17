"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { apiurl } from "../Apiurl"

interface Booking {
  patient: string
  start_time: string
  end_time: string
  servicename: string
  status: string
}

export default function AnimatedTable() {
  const [data, setData] = useState<Booking[]>([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(apiurl + "admin/getBookingpeople")
        if (res.data.success && Array.isArray(res.data.data)) {
          setData(res.data.data)
        } else {
          setData([])
        }
      } catch (err) {
        setData([])
      }
    }
    fetchBookings()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Start Time</th>
              <th className="px-4 py-3">End Time</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {data.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  className="hover:bg-gray-50 text-gray-700"
                  whileHover={{
                    backgroundColor: "rgba(243, 244, 246, 0.5)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">{row.patient}</td>
                  <td className="px-4 py-3 text-sm">{row.servicename}</td>
                  <td className="px-4 py-3 text-sm">{row.start_time}</td>
                  <td className="px-4 py-3 text-sm">{row.end_time}</td>
                  <td className="px-4 py-3 text-sm">
                    <motion.span
                      className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(row.status)}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      layout
                    >
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}

