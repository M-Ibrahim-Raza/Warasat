"use client"

// Mock data - replace with API call in the future
const mockUlemas = [
  {
    id: "u1",
    name: "Sheikh Abdullah Ahmad",
    specialty: "Hanafi Fiqh",
    avatarUrl: "https://via.placeholder.com/80",
    status: "online",
    rating: 4.9,
  },
  {
    id: "u2",
    name: "Dr. Aisha Rahman",
    specialty: "Inheritance Law",
    avatarUrl: "https://via.placeholder.com/80",
    status: "online",
    rating: 4.8,
  },
  {
    id: "u3",
    name: "Mufti Ibrahim Khan",
    specialty: "Shafi'i Fiqh",
    avatarUrl: "https://via.placeholder.com/80",
    status: "offline",
    rating: 4.7,
  },
  {
    id: "u4",
    name: "Sheikh Yusuf Ali",
    specialty: "Maliki Fiqh",
    avatarUrl: "https://via.placeholder.com/80",
    status: "busy",
    rating: 4.6,
  },
]

const UlemaList = ({ onSelectUlema }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {mockUlemas.map((ulema) => (
        <div key={ulema.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 pb-2 border-b">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src={ulema.avatarUrl || "https://via.placeholder.com/80"}
                alt={ulema.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">{ulema.name}</h3>
              <p className="text-sm text-gray-600">{ulema.specialty}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center">
              <div
                className={`h-2.5 w-2.5 rounded-full mr-2 ${
                  ulema.status === "online" ? "bg-green-500" : ulema.status === "busy" ? "bg-yellow-500" : "bg-gray-400"
                }`}
              ></div>
              <span className="text-sm text-gray-600 capitalize">{ulema.status}</span>
              <span className="mx-2">•</span>
              <span className="text-sm text-gray-600">★ {ulema.rating}</span>
            </div>
            <button
              onClick={() => onSelectUlema(ulema)}
              disabled={ulema.status === "offline"}
              className={`px-4 py-1 rounded text-white ${
                ulema.status === "offline" ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Start Chat
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UlemaList
