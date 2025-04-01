"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Sample data type
type TableData = {
  id: number
  sn: number
  name: string
  phone: string
  department: string
  time: string
  status: "active" | "inactive" | "pending"
}

// Sample data
const initialData: TableData[] = [
  {
    id: 1,
    sn: 1,
    name: "John Doe",
    phone: "(123) 456-7890",
    department: "Engineering",
    time: "09:30 AM",
    status: "active",
  },
  {
    id: 2,
    sn: 2,
    name: "Jane Smith",
    phone: "(234) 567-8901",
    department: "Marketing",
    time: "10:15 AM",
    status: "inactive",
  },
  {
    id: 3,
    sn: 3,
    name: "Robert Johnson",
    phone: "(345) 678-9012",
    department: "Finance",
    time: "11:45 AM",
    status: "pending",
  },
  {
    id: 4,
    sn: 4,
    name: "Emily Davis",
    phone: "(456) 789-0123",
    department: "Human Resources",
    time: "01:30 PM",
    status: "active",
  },
  {
    id: 5,
    sn: 5,
    name: "Michael Wilson",
    phone: "(567) 890-1234",
    department: "Operations",
    time: "02:45 PM",
    status: "inactive",
  },
]

export default function AnimatedTable() {
  const [data, setData] = useState<TableData[]>([])

  // Simulate data loading with staggered effect
  useEffect(() => {
    const loadData = async () => {
      setData([])

      // Load data with delay for animation effect
      for (let i = 0; i < initialData.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setData((prev) => [...prev, initialData[i]])
      }
    }

    loadData()
  }, [])

  // Get status badge styling based on status
  const getStatusBadge = (status: TableData["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
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
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {data.map((row, index) => (
                <motion.tr
                  key={row.id}
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
                  <td className="px-4 py-3 text-sm">{row.sn}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-sm font-semibold">{row.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{row.phone}</td>
                  <td className="px-4 py-3 text-sm">{row.department}</td>
                  <td className="px-4 py-3 text-sm">{row.time}</td>
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

